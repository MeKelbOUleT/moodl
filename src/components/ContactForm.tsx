import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Send, Loader2, Check} from 'lucide-react';
import {cn} from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.string().email('E-mail invalide'),
  phone: z.string().optional(),
  profile: z.enum(['citadin', 'investisseur', 'les_deux']),
  budget: z.enum(['100k-150k', '150k-200k', '200k+', 'undecided']),
  region: z.enum(['dordogne', 'ardeche', 'lac-annecy', 'undecided']),
  message: z.string().min(10, 'Message trop court'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormData>({resolver: zodResolver(schema)});

  async function onSubmit(_data: FormData) {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border/60 rounded-2xl p-10 lg:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-7 h-7 text-primary" />
        </div>
        <h2 className="font-display text-3xl font-bold mb-3">Message envoyé.</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Notre équipe vous recontacte sous 24 ouvrées. Si c'est urgent, utilisez le calendrier à droite.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card border border-border/60 rounded-2xl p-8 lg:p-10 space-y-5"
    >
      <div className="mb-2">
        <h2 className="font-display text-2xl font-bold tracking-tight">Formulaire de contact</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tous les champs marqués d'un astérisque sont obligatoires.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nom *" error={errors.name?.message}>
          <input
            {...register('name')}
            placeholder="Olivier Bertrand"
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label="E-mail *" error={errors.email?.message}>
          <input
            type="email"
            {...register('email')}
            placeholder="vous@exemple.fr"
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      <Field label="Téléphone">
        <input {...register('phone')} placeholder="+33 6 …" className={inputCls()} />
      </Field>

      <Field label="Vous êtes plutôt… *">
        <select {...register('profile')} className={inputCls()}>
          <option value="citadin">Citadin qui cherche un cocon week-end</option>
          <option value="investisseur">Investisseur qui cherche du rendement</option>
          <option value="les_deux">Les deux</option>
        </select>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Budget envisagé *">
          <select {...register('budget')} className={inputCls()}>
            <option value="100k-150k">100 - 150 k€</option>
            <option value="150k-200k">150 - 200 k€</option>
            <option value="200k+">200 k€ et +</option>
            <option value="undecided">À définir</option>
          </select>
        </Field>
        <Field label="Région d'intérêt *">
          <select {...register('region')} className={inputCls()}>
            <option value="dordogne">Dordogne</option>
            <option value="ardeche">Ardèche</option>
            <option value="lac-annecy">Lac d'Annecy</option>
            <option value="undecided">À définir</option>
          </select>
        </Field>
      </div>

      <Field label="Message *" error={errors.message?.message}>
        <textarea
          rows={5}
          {...register('message')}
          placeholder="Présentez brièvement votre projet, votre horizon, vos questions…"
          className={cn(inputCls(!!errors.message), 'resize-y')}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium shadow-md hover:shadow-[0_0_30px_rgba(0,255,128,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Envoi…
          </>
        ) : (
          <>
            Envoyer le message
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      {children}
      {error && <p className="text-xs text-destructive mt-1.5">{error}</p>}
    </label>
  );
}

function inputCls(hasError = false) {
  return cn(
    'w-full bg-background border rounded-lg px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow',
    hasError ? 'border-destructive' : 'border-border',
  );
}
