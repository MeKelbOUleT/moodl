import {useEffect, useState} from 'react';
import {Calendar, AlertCircle} from 'lucide-react';
import {track} from '@/lib/analytics';

interface Props {
  url?: string | null;
}

export default function CalendlyEmbed({url}: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!url) return;
    track('calendly_open', {url});
  }, [url]);

  if (!url) {
    return (
      <div className="bg-card border border-border/60 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <p className="text-xs uppercase tracking-widest text-primary font-medium">Sur rendez-vous</p>
        </div>
        <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">Planifier un appel</h3>
        <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
          Créneau de 30 minutes avec un expert Moodl. Sélection de l'adresse, visite virtuelle, projection chiffrée personnalisée.
        </p>
        <p className="text-sm text-muted-foreground italic flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>Le calendrier de réservation est en cours d'activation. En attendant, le formulaire est lu sous 24 heures ouvrées.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/60 rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-medium">Sur rendez-vous</p>
          <h3 className="font-display text-lg font-bold tracking-tight">Planifier un appel</h3>
        </div>
      </div>
      {!loaded && (
        <div className="space-y-3 animate-pulse mb-4" aria-hidden="true">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-32 bg-muted rounded" />
        </div>
      )}
      <iframe
        src={url}
        title="Calendrier de réservation Moodl"
        loading="lazy"
        width="100%"
        height="700"
        className="w-full rounded-lg border border-border/40"
        onLoad={() => setLoaded(true)}
        data-analytics-cta="calendly_embed"
      />
      <p className="text-xs text-muted-foreground italic mt-3 text-center">
        Sélectionnez un créneau, vous recevez la confirmation immédiatement.
      </p>
    </div>
  );
}
