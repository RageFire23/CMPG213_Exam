import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  color = 'bg-blue-500',
  height = 'h-2',
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);

  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-slate-700/60 rounded-full overflow-hidden`}>
        <motion.div
          className={`${height} ${color} rounded-full`}
          initial={animated ? { width: 0 } : { width: `${pct}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-slate-400 mt-1 text-right">{Math.round(pct)}%</p>
      )}
    </div>
  );
}
