import { motion } from 'framer-motion';
import { BookOpen, Map, FlaskConical, ClipboardList, Settings } from 'lucide-react';
import { Page } from '../../types';

interface MobileNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: typeof BookOpen }[] = [
  { page: 'roadmap', label: 'Roadmap', icon: Map },
  { page: 'study', label: 'Study', icon: BookOpen },
  { page: 'quiz', label: 'Quiz', icon: FlaskConical },
  { page: 'mockexam', label: 'Exam', icon: ClipboardList },
  { page: 'settings', label: 'Settings', icon: Settings },
];

export default function MobileNav({ currentPage, onNavigate }: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map(({ page, label, icon: Icon }) => {
          const active = currentPage === page;
          return (
            <motion.button
              key={page}
              onClick={() => onNavigate(page)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer
                ${active ? 'text-blue-400' : 'text-slate-500'}`}
            >
              {active && (
                <motion.div
                  layoutId="mobile-indicator"
                  className="absolute top-0 left-0 right-0 mx-auto w-8 h-0.5 rounded-full bg-blue-400"
                />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
