import * as React from 'react';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Send, Loader2, Check, AlertCircle} from 'lucide-react';
import {cn} from '@/lib/utils';
import {track} from '@/lib/analytics';

const schema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.email('E-mail invalide'),
  phone: z.string().optional(),
  profile: z.enum(['citadin', 'investisseur', 'les_deux']),
  budget: z.enum(['100k-150k', '150k-200k', '200k+', 'undecided']),
  region: z.enum(['dordogne', 'ardeche', 'lac-annecy', 'undecided']),
  message: z.string().min(10, 'Message trop court'),
  // Honeypot, doit rester vide
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting, touchedFields},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  // Prefill profile from ?type= query param (linked from PourQuiSection etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const t = params.get('type');
    if (t === 'citadin' || t === 'investisseur' || t === 'les_deux') {
      setValue('profile', t);
      track('persona_prefill', {type: t});
    }
  }, [setValue]);

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {error?: string};
        throw new Error(body.error || 'Une erreur est survenue.');
      }

      track('form_submit', {form: 'contact', profile: data.profile, budget: data.budget, region: data.region});
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  }

  if (submitted) {
    return (
      <div
        className="bg-card border border-border/60 rounded-2xl p-10 lg:p-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-7 h-7 text-primary" aria-hidden="true" />
        </div>
        <h2 className="font-display text-3xl font-bold mb-3">Message envoyé.</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          L'atelier vous recontacte sous 24 heures ouvrées. Si c'est urgent, écrivez à{' '}
          <a href="mailto:shelter@moodl.fr" className="text-primary underline underline-offset-2 decoration-1 hover:decoration-2">
            shelter@moodl.fr
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card border border-border/60 rounded-2xl p-8 lg:p-10 space-y-5"
      noValidate
      aria-describedby="form-intro"
    >
      <div className="mb-2">
        <h2 className="font-display text-2xl font-bold tracking-tight">Formulaire de contact</h2>
        <p id="form-intro" className="text-sm text-muted-foreground mt-1">
          Tous les champs marqués d'un astérisque sont obligatoires.
        </p>
      </div>

      {/* Honeypot anti-bot, invisible visuellement et masque aux lecteurs d'ecran */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor="website-url" aria-hidden="true">Site web</label>
        <input
          id="website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register('website')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field id="contact-name" label="Nom *" error={errors.name?.message} touched={!!touchedFields.name}>
          <input
            {...register('name')}
            placeholder="Votre nom et prénom"
            autoComplete="name"
            inputMode="text"
          />
        </Field>
        <Field id="contact-email" label="E-mail *" error={errors.email?.message} touched={!!touchedFields.email}>
          <input
            type="email"
            {...register('email')}
            placeholder="vous@exemple.fr"
            autoComplete="email"
            inputMode="email"
          />
        </Field>
      </div>

      <Field id="contact-phone" label="Téléphone">
        <input
          type="tel"
          {...register('phone')}
          placeholder="+33 6 ..."
          autoComplete="tel"
          inputMode="tel"
        />
      </Field>

      <Field id="contact-profile" label="Vous êtes plutôt... *">
        <select {...register('profile')} autoComplete="off">
          <option value="citadin">Citadin qui cherche un cocon week-end</option>
          <option value="investisseur">Investisseur qui cherche du rendement</option>
          <option value="les_deux">Les deux</option>
        </select>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field id="contact-budget" label="Budget envisagé *">
          <select {...register('budget')} autoComplete="off">
            <option value="100k-150k">100 a 150 k EUR</option>
            <option value="150k-200k">150 a 200 k EUR</option>
            <option value="200k+">200 k EUR et plus</option>
            <option value="undecided">À définir</option>
          </select>
        </Field>
        <Field id="contact-region" label="Région d'intérêt *">
          <select {...register('region')} autoComplete="off">
            <option value="dordogne">Dordogne</option>
            <option value="ardeche">Ardèche</option>
            <option value="lac-annecy">Lac d'Annecy</option>
            <option value="undecided">À définir</option>
          </select>
        </Field>
      </div>

      <Field id="contact-message" label="Message *" error={errors.message?.message} touched={!!touchedFields.message}>
        <textarea
          rows={4}
          {...register('message')}
          placeholder="Présentez brièvement votre projet, votre horizon, vos questions..."
          className="resize-y"
        />
      </Field>

      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium shadow-md hover:shadow-[0_0_30px_rgba(106,142,114,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        onClick={() => track('cta_click', {label: 'contact_submit'})}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Envoi...</span>
          </>
        ) : (
          <>
            <span>Parler à l'atelier</span>
            <Send className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Réponse sous 24 heures ouvrées. Aucun engagement, aucun mail commercial automatique.
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  touched?: boolean;
  children: React.ReactElement;
}

function Field({id, label, error, touched, children}: FieldProps) {
  const errorId = `${id}-error`;
  const childWithProps = React.cloneElement(children as React.ReactElement<any>, {
    id,
    'aria-invalid': !!error,
    'aria-describedby': error ? errorId : undefined,
    className: cn(
      inputBaseCls,
      error ? 'border-destructive focus-visible:ring-destructive' : 'border-border',
      touched && !error ? 'border-primary/40' : '',
      (children.props as {className?: string}).className,
    ),
  });
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-widest text-muted-foreground mb-2"
      >
        {label}
      </label>
      {childWithProps}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-destructive mt-1.5"
        >
          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

const inputBaseCls =
  'w-full bg-background border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card transition-shadow';
