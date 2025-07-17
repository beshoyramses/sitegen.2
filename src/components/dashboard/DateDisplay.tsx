import { format } from 'date-fns';

interface DateDisplayProps {
  date: string;
  prefix?: string;
  className?: string;
}

export const DateDisplay = ({ date, prefix, className }: DateDisplayProps) => {
  return (
    <span className={`text-xs text-muted-foreground ${className}`}>
      {prefix && `${prefix}: `}
      {format(new Date(date), 'MMM dd, yyyy')}
    </span>
  );
};