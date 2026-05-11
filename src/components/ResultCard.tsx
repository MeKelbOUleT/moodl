import { Card } from './ui/card';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

const ResultCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  variant = 'default',
  className,
}: ResultCardProps) => {
  const variants = {
    default: 'bg-card border-border/60',
    success: 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30',
    warning: 'bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30',
    info: 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30',
  };

  const iconColors = {
    default: 'text-muted-foreground',
    success: 'text-primary',
    warning: 'text-secondary',
    info: 'text-primary',
  };

  const iconBg = {
    default: 'bg-muted',
    success: 'bg-primary/15',
    warning: 'bg-secondary/15',
    info: 'bg-primary/15',
  };

  return (
    <Card
      className={cn(
        'p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        variants[variant],
        className
      )}
    >
      <div className="flex items-start justify-between mb-5">
        <div className={cn('p-3 rounded-xl', iconBg[variant])}>
          <Icon className={cn('h-5 w-5', iconColors[variant])} />
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="font-display text-3xl font-bold tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground italic mt-2">{subtitle}</p>
        )}
      </div>
    </Card>
  );
};

export default ResultCard;
