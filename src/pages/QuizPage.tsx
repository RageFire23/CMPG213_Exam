import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, ChevronRight, Trophy, RotateCcw,
  Zap, BookOpen, Heart, AlertTriangle
} from 'lucide-react';
import { studyUnits, studyOrder } from '../data/studyUnits';
import { useStore, MAX_HEARTS } from '../store/useStore';
import { Page, QuizQuestion } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface QuizPageProps {
  onNavigate: (page: Page, unitId?: string) => void;
}

type QuizState = 'select' | 'active' | 'results' | 'no-hearts';

export default function QuizPage({ onNavigate }: QuizPageProps) {
  const { progress, completeQuizById, loseHeart, refillHearts } = useStore();
  const [state, setState] = useState<QuizState>('select');
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongThisSession, setWrongThisSession] = useState(0);

  const orderedUnits = studyOrder.map(id => studyUnits.find(u => u.id === id)!).filter(Boolean);

  const startQuiz = (unitId: string) => {
    if (progress.hearts <= 0) { setState('no-hearts'); return; }
    const unit = studyUnits.find(u => u.id === unitId);
    if (!unit) return;
    const allQ: QuizQuestion[] = unit.topics.flatMap(t => t.quizQuestions);
    const shuffled = [...allQ].sort(() => Math.random() - 0.5).slice(0, Math.min(10, allQ.length));
    setQuestions(shuffled);
    setSelectedUnitId(unitId);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setCorrectCount(0);
    setWrongThisSession(0);
    setState('active');
  };

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    const q = questions[currentQ];
    const correctIdx = typeof q.answer === 'number' ? q.answer : parseInt(q.answer as string);
    if (idx === correctIdx) {
      setCorrectCount(c => c + 1);
    } else {
      loseHeart();
      setWrongThisSession(w => w + 1);
    }
  };

  const handleNext = () => {
    if (progress.hearts <= 0 && answered) {
      setState('no-hearts');
      return;
    }
    if (currentQ + 1 >= questions.length) {
      const score = Math.round((correctCount / questions.length) * 100);
      if (selectedUnitId) completeQuizById(selectedUnitId, score);
      setState('results');
    } else {
      setCurrentQ(q => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  // ── No hearts screen ───────────────────────────────────
  if (state === 'no-hearts') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 pb-24 md:pb-8 max-w-sm mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-5"
      >
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-7xl"
        >
          💔
        </motion.div>
        <h2 className="text-2xl font-black text-white text-center">Out of Hearts!</h2>
        <p className="text-slate-400 text-center text-sm">
          You've used all your hearts. Study a topic to refill or refill now to keep going.
        </p>
        <div className="flex gap-1">
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Heart key={i} className="w-7 h-7 text-slate-700" />
          ))}
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button onClick={() => { refillHearts(); setState('select'); }} fullWidth>
            <Heart className="w-4 h-4 mr-2" />
            Refill Hearts
          </Button>
          <Button variant="secondary" onClick={() => onNavigate('roadmap')} fullWidth>
            <BookOpen className="w-4 h-4 mr-2" />
            Go Study First
          </Button>
        </div>
      </motion.div>
    );
  }

  // ── Results screen ─────────────────────────────────────
  if (state === 'results') {
    const score = Math.round((correctCount / questions.length) * 100);
    const unit = studyUnits.find(u => u.id === selectedUnitId);
    const xpEarned = Math.round((score / 100) * 50);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 md:p-8 pb-24 md:pb-8 max-w-2xl mx-auto"
      >
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
            className={`w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl
              ${score >= 70 ? 'bg-emerald-500/20 border-4 border-emerald-500' :
                score >= 50 ? 'bg-amber-500/20 border-4 border-amber-500' :
                'bg-rose-500/20 border-4 border-rose-500'}`}
          >
            {score >= 70 ? '🎉' : score >= 50 ? '💪' : '📚'}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-4xl font-black text-white mb-1">{score}%</h2>
            <p className="text-slate-400 mb-2">{correctCount}/{questions.length} correct</p>
            {unit && <Badge variant={unit.priority}>{unit.title}</Badge>}
          </motion.div>

          {/* Hearts lost + XP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 justify-center mt-5 mb-5"
          >
            {xpEarned > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-400">+{xpEarned} XP</span>
              </div>
            )}
            {wrongThisSession > 0 && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="font-bold text-rose-400">-{wrongThisSession} hearts</span>
              </div>
            )}
          </motion.div>

          <p className="text-slate-300 text-sm mb-6">
            {score >= 80 ? 'Excellent! You know this unit well.' :
             score >= 60 ? 'Good work! Review your mistakes and try again.' :
             'Keep studying! Review the flashcards and try again.'}
          </p>

          {/* Hearts display */}
          <div className="flex justify-center gap-1 mb-5">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart key={i} className={`w-5 h-5 ${i < progress.hearts ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => startQuiz(selectedUnitId!)} fullWidth disabled={progress.hearts <= 0}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry
            </Button>
            <Button onClick={() => setState('select')} fullWidth>
              New Quiz
            </Button>
          </div>
          <Button variant="ghost" onClick={() => onNavigate('learn', selectedUnitId!)} fullWidth className="mt-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Study flashcards
          </Button>
        </div>
      </motion.div>
    );
  }

  // ── Active quiz ────────────────────────────────────────
  if (state === 'active' && questions.length > 0) {
    const q = questions[currentQ];
    const options = q.type === 'true-false' ? ['True', 'False'] : (q.options ?? []);
    const correctIdx = typeof q.answer === 'number' ? q.answer : parseInt(q.answer as string);
    const progressPct = (currentQ / questions.length) * 100;
    const isWrong = answered && selectedAnswer !== null && selectedAnswer !== correctIdx;

    return (
      <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <Button variant="ghost" size="sm" onClick={() => setState('select')}>✕</Button>
          <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              animate={{ width: `${progressPct}%` }}
            />
          </div>
          {/* Hearts */}
          <div className="flex gap-0.5">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart key={i} className={`w-4 h-4 ${i < progress.hearts ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`} />
            ))}
          </div>
        </div>

        {/* Wrong answer shake */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={isWrong ? { x: [-8, 8, -5, 5, 0], opacity: 1 } : { x: 0, opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 mb-4"
          >
            <p className="text-xs text-slate-400 mb-2">Question {currentQ + 1} of {questions.length}</p>
            <p className="text-lg font-semibold text-white leading-relaxed">{q.question}</p>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="space-y-3 mb-4">
          {options.map((opt, idx) => {
            let borderClass = 'border-slate-700 hover:border-slate-500 bg-slate-800/60';
            if (answered) {
              if (idx === correctIdx) borderClass = 'border-emerald-500 bg-emerald-500/20';
              else if (idx === selectedAnswer) borderClass = 'border-rose-500 bg-rose-500/20';
              else borderClass = 'border-slate-700/50 bg-slate-800/30 opacity-60';
            }

            return (
              <motion.button
                key={idx}
                whileHover={answered ? {} : { scale: 1.01 }}
                whileTap={answered ? {} : { scale: 0.98 }}
                onClick={() => handleAnswer(idx)}
                className={`w-full flex items-center gap-3 border rounded-xl p-4 text-left transition-all cursor-pointer ${borderClass} ${answered ? 'cursor-default' : ''}`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors
                  ${answered && idx === correctIdx ? 'bg-emerald-500 text-white' :
                    answered && idx === selectedAnswer ? 'bg-rose-500 text-white' :
                    'bg-slate-700 text-slate-300'}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm text-slate-200 flex-1">{opt}</span>
                {answered && idx === correctIdx && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                {answered && idx === selectedAnswer && idx !== correctIdx && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`rounded-xl p-4 mb-4 border ${isWrong ? 'bg-rose-500/10 border-rose-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}
            >
              <p className={`text-sm font-semibold mb-1 ${isWrong ? 'text-rose-300' : 'text-emerald-300'}`}>
                {isWrong ? '❌ Incorrect' : '✓ Correct!'}
              </p>
              <p className="text-sm text-slate-300">{q.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {answered && (
          <Button onClick={handleNext} fullWidth size="lg">
            {currentQ + 1 >= questions.length ? 'See Results' : 'Continue'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    );
  }

  // ── Unit selection ─────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 pb-24 md:pb-8 max-w-3xl mx-auto"
    >
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Quick Quiz</h1>
        <p className="text-slate-400 mt-1">Pick a unit to test your knowledge.</p>
        {/* Hearts warning */}
        {progress.hearts <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <p className="text-xs text-rose-300">
              {progress.hearts === 0 ? 'No hearts left! Refill to continue.' : `Only ${progress.hearts} heart${progress.hearts === 1 ? '' : 's'} remaining.`}
            </p>
            {progress.hearts === 0 && (
              <button onClick={refillHearts} className="ml-auto text-xs font-bold text-rose-300 hover:text-rose-200 underline cursor-pointer">
                Refill
              </button>
            )}
          </motion.div>
        )}
      </div>

      <div className="space-y-3">
        {orderedUnits.map((unit, idx) => {
          const bestScore = progress.quizScores[unit.id];
          const totalQ = unit.topics.reduce((a, t) => a + t.quizQuestions.length, 0);
          const isLocked = progress.hearts <= 0;

          return (
            <motion.button
              key={unit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={isLocked ? {} : { scale: 1.01 }}
              whileTap={isLocked ? {} : { scale: 0.98 }}
              onClick={() => startQuiz(unit.id)}
              disabled={isLocked}
              className={`w-full flex items-center gap-4 border rounded-2xl p-4 text-left transition-all cursor-pointer
                ${isLocked ? 'opacity-50 cursor-not-allowed bg-slate-800/30 border-slate-800' :
                  'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                {unit.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="font-semibold text-white text-sm">Ch{unit.chapter}: {unit.title}</p>
                  <Badge variant={unit.priority}>{unit.priority}</Badge>
                </div>
                <p className="text-xs text-slate-400">{totalQ} questions available</p>
              </div>
              <div className="text-right flex-shrink-0">
                {bestScore != null ? (
                  <p className={`text-sm font-bold ${bestScore >= 70 ? 'text-emerald-400' : bestScore >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {bestScore}%
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">Not taken</p>
                )}
                <Trophy className={`w-4 h-4 mt-0.5 mx-auto ${bestScore != null ? 'text-amber-400' : 'text-slate-600'}`} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
