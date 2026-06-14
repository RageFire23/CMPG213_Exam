import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Zap, Heart, Crown, CheckCircle2,
  ChevronRight, Star, AlertTriangle
} from 'lucide-react';
import { studyUnits, studyOrder } from '../data/studyUnits';
import { useStore, MAX_HEARTS } from '../store/useStore';
import { Page, StudyUnit, Topic } from '../types';

interface RoadmapPageProps {
  onNavigate: (page: Page, unitId?: string) => void;
}

// Build the flat path: [unit, topic, topic, unit, topic, ...]
type PathUnit = { kind: 'unit'; unit: StudyUnit; sectionLabel?: string };
type PathTopic = { kind: 'topic'; unit: StudyUnit; topic: Topic; side: 'left' | 'right' };
type PathItem = PathUnit | PathTopic;

const SECTION_LABELS: Record<string, string> = {
  su7: 'CRITICAL — Highest Marks',
  su4: 'HIGH PRIORITY',
  su1: 'THEORY UNITS',
};

function buildPath(): PathItem[] {
  const items: PathItem[] = [];
  let topicCount = 0;

  for (const unitId of studyOrder) {
    const unit = studyUnits.find(u => u.id === unitId);
    if (!unit) continue;
    items.push({ kind: 'unit', unit, sectionLabel: SECTION_LABELS[unitId] });
    for (const topic of unit.topics) {
      items.push({
        kind: 'topic',
        unit,
        topic,
        side: topicCount % 2 === 0 ? 'left' : 'right',
      });
      topicCount++;
    }
  }
  return items;
}

const PATH_ITEMS = buildPath();

function unitStars(unit: StudyUnit, completedTopics: string[]): number {
  const done = unit.topics.filter(t => completedTopics.includes(t.id)).length;
  if (done === 0) return 0;
  if (done === unit.topics.length) return 3;
  return done >= Math.ceil(unit.topics.length / 2) ? 2 : 1;
}

// ── Sub-components ─────────────────────────────────────────────

function StatsBar() {
  const { progress } = useStore();
  const xpPct = progress.xp % 100;

  return (
    <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-sm mx-auto flex items-center justify-between gap-4">
        {/* Streak */}
        <div className="flex items-center gap-1.5">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="font-black text-orange-400">{progress.streak}</span>
        </div>

        {/* XP Bar */}
        <div className="flex-1 flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="font-bold text-amber-400">Lv {progress.level}</span>
            <span>· {progress.xp} XP</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
              animate={{ width: `${xpPct}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Heart
              key={i}
              className={`w-4 h-4 ${i < progress.hearts ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionBanner({ label, priority }: { label: string; priority: string }) {
  const colors = {
    critical: 'from-rose-500/20 to-rose-600/10 border-rose-500/40 text-rose-300',
    high: 'from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-300',
    medium: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 text-blue-300',
  }[priority] ?? 'from-slate-500/20 to-slate-600/10 border-slate-500/40 text-slate-300';

  return (
    <div className="relative z-10 my-4 mx-2">
      <div className={`bg-gradient-to-r ${colors} border rounded-xl px-4 py-2 text-center`}>
        <p className="text-xs font-black tracking-widest uppercase">{label}</p>
      </div>
    </div>
  );
}

function UnitNode({
  unit,
  stars,
  isCurrent,
  onClick,
}: {
  unit: StudyUnit;
  stars: number;
  isCurrent: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center py-3 px-2">
      {/* Glow ring for current unit */}
      {isCurrent && (
        <motion.div
          className={`absolute top-3 w-24 h-24 rounded-3xl bg-gradient-to-br ${unit.color} opacity-30`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        />
      )}

      <motion.button
        whileHover={{ scale: 1.07, y: -2 }}
        whileTap={{ scale: 0.93 }}
        onClick={onClick}
        className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${unit.color} flex items-center justify-center shadow-2xl cursor-pointer`}
      >
        <span className="text-4xl select-none">{unit.icon}</span>
        {stars === 3 && (
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/50">
            <Crown className="w-4 h-4 text-white" />
          </div>
        )}
      </motion.button>

      {/* Stars */}
      <div className="flex gap-0.5 mt-2">
        {[1, 2, 3].map(s => (
          <Star
            key={s}
            className={`w-4 h-4 ${s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
          />
        ))}
      </div>

      {/* Unit info */}
      <p className="mt-1 text-sm font-bold text-white text-center leading-tight max-w-[140px]">
        {unit.title}
      </p>
      <p className="text-xs text-slate-400">Ch{unit.chapter} · ~{unit.estimatedMarks} marks</p>
    </div>
  );
}

function TopicNode({
  topic,
  unit,
  side,
  isComplete,
  isCurrent,
  onClick,
}: {
  topic: Topic;
  unit: StudyUnit;
  side: 'left' | 'right';
  isComplete: boolean;
  isCurrent: boolean;
  onClick: () => void;
}) {
  const isLeft = side === 'left';
  const bgClass = isComplete
    ? 'bg-emerald-500 shadow-emerald-500/40'
    : isCurrent
    ? `bg-gradient-to-br ${unit.color} shadow-blue-500/40`
    : 'bg-slate-800 border-2 border-slate-700';

  return (
    <div className={`relative z-10 h-20 flex items-center ${isLeft ? 'justify-start pl-2' : 'justify-end pr-2'}`}>
      <motion.div
        className={`flex items-center gap-3 max-w-[145px] ${isLeft ? '' : 'flex-row-reverse'}`}
      >
        {/* Pulse ring for current */}
        <div className="relative flex-shrink-0">
          {isCurrent && (
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${unit.color}`}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`relative w-14 h-14 rounded-full ${bgClass} flex items-center justify-center shadow-xl cursor-pointer transition-all`}
          >
            {isComplete ? (
              <CheckCircle2 className="w-7 h-7 text-white" />
            ) : (
              <span className="text-lg font-black text-white">{topic.id.split('-t')[1]}</span>
            )}
          </motion.button>
        </div>

        {/* Label */}
        <div className={`${isLeft ? 'text-left' : 'text-right'} min-w-0`}>
          <p className={`text-xs font-semibold leading-tight line-clamp-2 ${isComplete ? 'text-emerald-400' : isCurrent ? 'text-white' : 'text-slate-400'}`}>
            {topic.title}
          </p>
          <p className="text-xs text-slate-600 mt-0.5">{topic.flashcards.length} cards</p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Roadmap Page ───────────────────────────────────────────────

export default function RoadmapPage({ onNavigate }: RoadmapPageProps) {
  const { progress } = useStore();
  const currentTopicRef = useRef<HTMLDivElement>(null);

  // Find the first incomplete topic globally
  const allTopics = studyOrder.flatMap(uid => {
    const u = studyUnits.find(u => u.id === uid);
    return u ? u.topics.map(t => t.id) : [];
  });
  const firstIncompleteTopicId = allTopics.find(id => !progress.completedTopics.includes(id));

  // Scroll to current topic on mount
  useEffect(() => {
    const t = setTimeout(() => {
      currentTopicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const totalTopics = studyUnits.reduce((a, u) => a + u.topics.length, 0);
  const doneCount = progress.completedTopics.length;
  const overallPct = Math.round((doneCount / totalTopics) * 100);

  return (
    <div className="pb-28 md:pb-8">
      <StatsBar />

      {/* Hero strip */}
      <div className="max-w-sm mx-auto px-4 pt-5 pb-2">
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl px-4 py-3 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-rose-300">3 days to exam!</p>
            <p className="text-xs text-rose-400/70">{doneCount}/{totalTopics} topics · {overallPct}% complete</p>
          </div>
          <div className="ml-auto flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
              <span className="text-lg font-black text-rose-300">{100 - overallPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* THE PATH */}
      <div className="relative max-w-sm mx-auto px-4">
        {/* Vertical spine line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-slate-800 z-0" />

        {PATH_ITEMS.map((item, idx) => {
          if (item.kind === 'unit') {
            const stars = unitStars(item.unit, progress.completedTopics);
            const unitTopicIds = item.unit.topics.map(t => t.id);
            const firstIncompleteInUnit = unitTopicIds.find(id => !progress.completedTopics.includes(id));
            const isCurrent = firstIncompleteInUnit === firstIncompleteTopicId;

            return (
              <div key={`unit-${item.unit.id}`}>
                {item.sectionLabel && (
                  <SectionBanner label={item.sectionLabel} priority={item.unit.priority} />
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: 0.05 * (idx % 6) }}
                >
                  <UnitNode
                    unit={item.unit}
                    stars={stars}
                    isCurrent={isCurrent}
                    onClick={() => onNavigate('learn', item.unit.id)}
                  />
                </motion.div>
              </div>
            );
          }

          // Topic node
          const isComplete = progress.completedTopics.includes(item.topic.id);
          const isCurrent = item.topic.id === firstIncompleteTopicId;

          return (
            <motion.div
              key={`topic-${item.topic.id}`}
              ref={isCurrent ? currentTopicRef : undefined}
              initial={{ opacity: 0, x: item.side === 'left' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.04 * (idx % 8) }}
            >
              <TopicNode
                topic={item.topic}
                unit={item.unit}
                side={item.side}
                isComplete={isComplete}
                isCurrent={isCurrent}
                onClick={() => onNavigate('learn', item.unit.id)}
              />
            </motion.div>
          );
        })}

        {/* Completion trophy at the bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center py-8 mt-4"
        >
          <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center mb-3">
            <Crown className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-sm font-bold text-amber-400">Exam Ready!</p>
          <p className="text-xs text-slate-500 mt-0.5">Complete all topics to unlock</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('mockexam')}
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-black text-sm px-5 py-2.5 rounded-full shadow-lg shadow-amber-400/30 cursor-pointer"
          >
            Take Mock Exam
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating action: Quick Quiz */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('quiz')}
          className="flex items-center gap-2 bg-blue-500 text-white font-bold text-sm px-4 py-3 rounded-full shadow-xl shadow-blue-500/40 cursor-pointer"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Zap className="w-4 h-4" />
          Quick Quiz
        </motion.button>
      </div>
    </div>
  );
}
