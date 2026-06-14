import { motion } from 'framer-motion';
import { BookOpen, Map, FlaskConical, ClipboardList, Settings, Zap, Flame } from 'lucide-react';
import { Page } from '../../types';
import { useStore } from '../../store/useStore';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: typeof BookOpen }[] = [
  { page: 'roadmap', label: 'Roadmap', icon: Map },
  { page: 'study', label: 'Study Units', icon: BookOpen },
  { page: 'quiz', label: 'Quick Quiz', icon: FlaskConical },
  { page: 'mockexam', label: 'Mock Exam', icon: ClipboardList },
  { page: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { progress } = useStore();
  const xpToNextLevel = 100 - (progress.xp % 100);
  const xpProgress = progress.xp % 100;

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex flex-col w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-4"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30">
          C
        </div>
        <div>
          <p className="font-bold text-white text-sm">CMPG213</p>
          <p className="text-xs text-slate-400">Exam Prep</p>
        </div>
      </div>

      {/* XP Widget */}
      <div className="bg-slate-800 rounded-xl p-3 mb-6 border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400">Level {progress.level}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-orange-400 font-bold">{progress.streak}</span>
          </div>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1">{progress.xp} XP · {xpToNextLevel} to next level</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ page, label, icon: Icon }) => {
          const active = currentPage === page;
          return (
            <motion.button
              key={page}
              onClick={() => onNavigate(page)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left
                ${active
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {active && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Stats */}
      <div className="mt-auto pt-4 border-t border-slate-800">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">{progress.completedTopics.length}</p>
            <p className="text-xs text-slate-400">Topics</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">{progress.completedQuizzes.length}</p>
            <p className="text-xs text-slate-400">Quizzes</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
