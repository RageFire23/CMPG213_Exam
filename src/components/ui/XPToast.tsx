import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function XPToastLayer() {
  const { xpEvents, dismissXPEvent } = useStore();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {xpEvents.map(evt => (
          <XPToast
            key={evt.id}
            label={evt.label}
            onDone={() => dismissXPEvent(evt.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function XPToast({ label, onDone }: { label: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="flex items-center gap-2 bg-amber-400 text-slate-900 font-black text-sm px-4 py-2 rounded-full shadow-xl shadow-amber-400/40 pointer-events-auto"
    >
      <Zap className="w-4 h-4" />
      {label}
    </motion.div>
  );
}
