import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { studyUnits, studyOrder } from '../data/studyUnits';
import { useStore } from '../store/useStore';
import { Page } from '../types';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

interface StudyUnitsPageProps {
  onNavigate: (page: Page, unitId?: string) => void;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function StudyUnitsPage({ onNavigate }: StudyUnitsPageProps) {
  const { progress } = useStore();

  const orderedUnits = studyOrder.map(id => studyUnits.find(u => u.id === id)!).filter(Boolean);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-8 pb-24 md:pb-8 max-w-4xl mx-auto space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Study Units</h1>
        <p className="text-slate-400 mt-1">Ordered by exam importance. Critical units first.</p>
      </motion.div>

      <div className="space-y-4">
        {orderedUnits.map((unit, idx) => {
          const doneTopics = unit.topics.filter(t => progress.completedTopics.includes(t.id)).length;
          const unitPct = Math.round((doneTopics / unit.topics.length) * 100);
          const unitComplete = doneTopics === unit.topics.length;

          return (
            <motion.div key={unit.id} variants={item}>
              {/* Unit Header */}
              <div
                className={`bg-gradient-to-br ${unit.color} rounded-2xl p-5 mb-2 relative overflow-hidden cursor-pointer`}
                onClick={() => onNavigate('learn', unit.id)}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl">{unit.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-white/70">Chapter {unit.chapter} · #{idx + 1} Priority</p>
                        <h2 className="text-lg font-bold text-white">{unit.title}</h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={unit.priority}>{unit.priority.toUpperCase()}</Badge>
                      <span className="text-xs text-white/70">~{unit.estimatedMarks} marks</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {unitComplete ? (
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-white/70" />
                    )}
                  </div>
                </div>
                <div className="relative mt-3">
                  <ProgressBar value={unitPct} max={100} color="bg-white/40" height="h-1.5" animated={false} />
                  <p className="text-xs text-white/70 mt-1">{doneTopics}/{unit.topics.length} topics complete</p>
                </div>
              </div>

              {/* Exam Tip */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 mb-2">
                <p className="text-xs text-amber-300">
                  <span className="font-semibold">Exam Tip: </span>{unit.examTip}
                </p>
              </div>

              {/* Topics */}
              <div className="space-y-2 pl-2">
                {unit.topics.map((topic, tIdx) => {
                  const done = progress.completedTopics.includes(topic.id);
                  return (
                    <motion.button
                      key={topic.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate('learn', unit.id)}
                      className="w-full flex items-center gap-3 bg-slate-800/60 border border-slate-700 hover:border-slate-600 rounded-xl p-3 text-left transition-all cursor-pointer group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
                        ${done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}
                      >
                        {done ? <CheckCircle2 className="w-4 h-4" /> : tIdx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${done ? 'text-emerald-400' : 'text-white'}`}>
                          {topic.title}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{topic.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-slate-500">{topic.flashcards.length} cards</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
