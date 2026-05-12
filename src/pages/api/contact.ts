import type { APIRoute } from 'astro';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const prerender = false;

// Schéma serveur (miroir du schéma client + champ honeypot)
const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().or(z.literal('')),
  profile: z.enum(['citadin', 'investisseur', 'les_deux']),
  budget: z.enum(['100k-150k', '150k-200k', '200k+', 'undecided']),
  region: z.enum(['dordogne', 'ardeche', 'lac-annecy', 'undecided']),
  message: z.string().min(10).max(5000),
  // Honeypot : doit rester vide. Si rempli → bot.
  website: z.string().max(0).optional().or(z.literal('')),
});

const profileLabels: Record<string, string> = {
  citadin: 'Citadin (cocon week-end)',
  investisseur: 'Investisseur (rendement)',
  les_deux: 'Les deux',
};

const budgetLabels: Record<string, string> = {
  '100k-150k': '100 - 150 k€',
  '150k-200k': '150 - 200 k€',
  '200k+': '200 k€ et +',
  undecided: 'À définir',
};

const regionLabels: Record<string, string> = {
  dordogne: 'Dordogne',
  ardeche: 'Ardèche',
  'lac-annecy': "Lac d'Annecy",
  undecided: 'À définir',
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const POST: APIRoute = async ({ request }) => {
  // 1. Rate limit : 5 requêtes / 10 min par IP
  const ip = getClientIp(request);
  const rl = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  // 2. Parse JSON
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON invalide.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. Validation Zod
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Données invalides.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = parsed.data;

  // 4. Honeypot : si le champ caché est rempli, on simule un succès silencieux
  // (le bot pense que c'est passé, on ne lui dit pas qu'il a été détecté)
  if (data.website && data.website.length > 0) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 5. Config SMTP LWS
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    LEADS_TO_EMAIL,
    LEADS_FROM_EMAIL,
    LEADS_FROM_NAME,
  } = import.meta.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('[contact] SMTP env vars missing');
    return new Response(
      JSON.stringify({ error: 'Configuration serveur incomplète.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const toEmail = LEADS_TO_EMAIL || 'shelter@moodl.fr';
  const fromEmail = LEADS_FROM_EMAIL || SMTP_USER;
  const fromName = LEADS_FROM_NAME || 'Moodl Site';

  // 6. Transporteur SMTP LWS
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: String(SMTP_SECURE ?? 'true').toLowerCase() === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // 7. Corps HTML lisible
  const subject = `Nouveau lead Moodl — ${data.name} (${profileLabels[data.profile]})`;

  const htmlRows = [
    ['Nom', data.name],
    ['E-mail', data.email],
    ['Téléphone', data.phone || '—'],
    ['Profil', profileLabels[data.profile]],
    ['Budget', budgetLabels[data.budget]],
    ['Région', regionLabels[data.region]],
    ['IP', ip],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#666;font-size:13px;border-bottom:1px solid #eee">${escapeHtml(
          String(k),
        )}</td><td style="padding:6px 12px;font-size:14px;border-bottom:1px solid #eee">${escapeHtml(
          String(v),
        )}</td></tr>`,
    )
    .join('');

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fafafa">
      <h1 style="font-size:22px;margin:0 0 16px;color:#090F15">Nouveau lead Moodl</h1>
      <p style="color:#666;margin:0 0 24px;font-size:14px">Reçu via le formulaire de contact moodl.fr</p>
      <table style="width:100%;background:#fff;border:1px solid #eee;border-collapse:collapse;border-radius:8px;overflow:hidden">
        ${htmlRows}
      </table>
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.1em;color:#666;margin:24px 0 8px">Message</h2>
      <div style="background:#fff;border:1px solid #eee;border-radius:8px;padding:16px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(
        data.message,
      )}</div>
      <p style="color:#999;font-size:12px;margin-top:24px">Répondez directement à cet e-mail pour contacter le prospect (Reply-To configuré).</p>
    </div>
  `;

  const text = [
    `Nom : ${data.name}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone || '—'}`,
    `Profil : ${profileLabels[data.profile]}`,
    `Budget : ${budgetLabels[data.budget]}`,
    `Région : ${regionLabels[data.region]}`,
    `IP : ${ip}`,
    '',
    'Message :',
    data.message,
  ].join('\n');

  // 8. Envoi
  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: `"${data.name}" <${data.email}>`,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error('[contact] sendMail failed', err);
    return new Response(
      JSON.stringify({ error: "Échec de l'envoi. Réessayez ou écrivez à shelter@moodl.fr." }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
