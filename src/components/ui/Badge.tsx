import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'critical' | 'high' | 'medium' | 'success' | 'info' | 'warning';
}

const variants = {
  critical: 'bg-rose-500/20 text-rose-300 border border-rose-500/40',
  high: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
  medium: 'bg-sky-500/20 text-sky-300 border border-sky-500/40',
  success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
  info: 'bg-blue-500/20 text-blue-300 border border-blue-500/40',
  warning: 'bg-orange-500/20 text-orange-300 border border-orange-500/40',
};

export default function Badge({ children, variant = 'info' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
