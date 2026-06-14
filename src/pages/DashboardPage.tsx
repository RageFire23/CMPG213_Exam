import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, Target, TrendingUp, AlertTriangle, ChevronRight, BookOpen, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { studyUnits, studyOrder } from '../data/studyUnits';
import { Page } from '../types';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';

interface DashboardPageProps {
  onNavigate: (page: Page, unitId?: string) => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { progress } = useStore();
  const xpProgress = progress.xp % 100;

  const totalTopics = studyUnits.reduce((a, u) => a + u.topics.length, 0);
  const completionPct = Math.round((progress.completedTopics.length / totalTopics) * 100);

  const priorityUnits = studyOrder
    .map(id => studyUnits.find(u => u.id === id)!)
    .filter(Boolean);

  const daysLeft = 3;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-8 pb-24 md:pb-8 space-y-6 max-w-5xl mx-auto"
    >
      {/* Top Header */}
      <motion.div variants={item} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Ready to ace CMPG213?
          </h1>
          <p className="text-slate-400 mt-1 text-sm md:text-base">
            {daysLeft} days left — let's make them count.
          </p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl p-3 text-center shadow-lg shadow-rose-500/30"
        >
          <p className="text-2xl font-black text-white">{daysLeft}</p>
          <p className="text-xs font-semibold text-rose-100">DAYS</p>
        </motion.div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Zap, label: 'Total XP', value: progress.xp, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
          { icon: Flame, label: 'Day Streak', value: progress.streak, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
          { icon: BookOpen, label: 'Topics Done', value: `${progress.completedTopics.length}/${totalTopics}`, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
          { icon: Trophy, label: 'Level', value: progress.level, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`rounded-2xl p-4 border ${bg} backdrop-blur-sm`}>
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* XP Progress */}
      <motion.div variants={item} className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-white">Level {progress.level} Progress</span>
          </div>
          <span className="text-sm text-slate-400">{xpProgress}/100 XP</span>
        </div>
        <ProgressBar value={xpProgress} max={100} color="bg-gradient-to-r from-blue-500 to-cyan-400" height="h-3" />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">Overall completion</span>
          <span className="text-xs font-semibold text-white">{completionPct}%</span>
        </div>
        <ProgressBar value={completionPct} max={100} color="bg-gradient-to-r from-emerald-500 to-teal-400" height="h-2" />
      </motion.div>

      {/* High Priority Alert */}
      <motion.div variants={item} className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-rose-300">Focus on these FIRST</p>
          <p className="text-sm text-rose-400/80 mt-0.5">
            Study Units 7, 8 & 9 are marked "Very Important" and likely worth 20+ marks each.
            Master these before moving to theory units.
          </p>
        </div>
      </motion.div>

      {/* Study Units Priority List */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            Study Plan (by priority)
          </h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('study')}>
            See all
          </Button>
        </div>
        <div className="space-y-3">
          {priorityUnits.map((unit, idx) => {
            const doneTopics = unit.topics.filter(t => progress.completedTopics.includes(t.id)).length;
            const unitPct = Math.round((doneTopics / unit.topics.length) * 100);
            const hasQuizScore = progress.quizScores[unit.id] != null;

            return (
              <motion.div
                key={unit.id}
                variants={item}
                whileHover={{ scale: 1.01 }}
                onClick={() => onNavigate('learn', unit.id)}
                className="bg-slate-800/60 border border-slate-700 hover:border-slate-600 rounded-2xl p-4 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
                    {unit.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold text-white truncate">
                        #{idx + 1} Ch{unit.chapter}: {unit.title}
                      </span>
                      <Badge variant={unit.priority}>{unit.priority.toUpperCase()}</Badge>
                      {hasQuizScore && (
                        <Badge variant="success">{progress.quizScores[unit.id]}%</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={unitPct} max={100} color={`bg-gradient-to-r ${unit.color}`} height="h-1.5" animated={false} />
                      <span className="text-xs text-slate-400 whitespace-nowrap">{doneTopics}/{unit.topics.length}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Take a Quick Quiz', desc: 'Test your knowledge', icon: FlaskConical, page: 'quiz' as Page, color: 'from-blue-500 to-indigo-600' },
          { label: 'Generate Mock Exam', desc: 'AI-powered full paper', icon: TrendingUp, page: 'mockexam' as Page, color: 'from-emerald-500 to-teal-600' },
          { label: 'Study Flashcards', desc: 'All units available', icon: BookOpen, page: 'study' as Page, color: 'from-amber-500 to-orange-600' },
        ].map(({ label, desc, icon: Icon, page, color }) => (
          <motion.button
            key={page}
            onClick={() => onNavigate(page)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-left cursor-pointer shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white/80 mb-2" />
            <p className="font-bold text-white">{label}</p>
            <p className="text-xs text-white/70">{desc}</p>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Import missing icon
function FlaskConical(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" />
      <path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" />
    </svg>
  );
}
