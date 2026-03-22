import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  active: 'bg-success/10 text-success',
  present: 'bg-success/10 text-success',
  approved: 'bg-success/10 text-success',
  processed: 'bg-success/10 text-success',
  completed: 'bg-success/10 text-success',
  selected: 'bg-success/10 text-success',
  shortlisted: 'bg-primary/10 text-primary',
  applied: 'bg-primary/10 text-primary',
  open: 'bg-primary/10 text-primary',
  pending: 'bg-warning/10 text-warning',
  'on-leave': 'bg-warning/10 text-warning',
  'half-day': 'bg-warning/10 text-warning',
  late: 'bg-warning/10 text-warning',
  rejected: 'bg-destructive/10 text-destructive',
  absent: 'bg-destructive/10 text-destructive',
  terminated: 'bg-destructive/10 text-destructive',
  inactive: 'bg-destructive/10 text-destructive',
  closed: 'bg-muted text-muted-foreground',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize', statusStyles[status] || 'bg-muted text-muted-foreground')}>
      {status.replace('-', ' ')}
    </span>
  );
}
