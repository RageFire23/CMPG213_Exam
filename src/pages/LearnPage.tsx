import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronLeft, ChevronRight,
  RotateCcw, CheckCircle2, Lightbulb, List, CreditCard
} from 'lucide-react';
import { studyUnits } from '../data/studyUnits';
import { useStore } from '../store/useStore';
import { Page, Topic } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface LearnPageProps {
  unitId: string | null;
  onNavigate: (page: Page, unitId?: string) => void;
}

type ViewMode = 'topics' | 'content' | 'flashcards';

export default function LearnPage({ unitId, onNavigate }: LearnPageProps) {
  const { progress, completeTopicById } = useStore();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('topics');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const unit = studyUnits.find(u => u.id === unitId);

  if (!unit) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400">Unit not found.</p>
        <Button onClick={() => onNavigate('study')} className="mt-4">Back to Study Units</Button>
      </div>
    );
  }

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setViewMode('content');
    setCardIndex(0);
    setFlipped(false);
  };

  const handleMarkDone = () => {
    if (selectedTopic) {
      completeTopicById(selectedTopic.id);
    }
  };

  const handleFlipCard = () => setFlipped(f => !f);
  const handleNextCard = () => { setCardIndex(i => (i + 1) % (selectedTopic?.flashcards.length ?? 1)); setFlipped(false); };
  const handlePrevCard = () => { setCardIndex(i => (i - 1 + (selectedTopic?.flashcards.length ?? 1)) % (selectedTopic?.flashcards.length ?? 1)); setFlipped(false); };

  if (viewMode === 'flashcards' && selectedTopic) {
    const card = selectedTopic.flashcards[cardIndex];
    const total = selectedTopic.flashcards.length;

    return (
      <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setViewMode('content')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <p className="text-xs text-slate-400">{unit.title}</p>
            <h2 className="font-bold text-white">{selectedTopic.title} — Flashcards</h2>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-6 justify-center flex-wrap">
          {selectedTopic.flashcards.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === cardIndex ? 'w-6 bg-blue-400' : 'w-1.5 bg-slate-600'}`}
            />
          ))}
        </div>

        {/* Flashcard */}
        <motion.div
          className="relative h-64 md:h-72 cursor-pointer select-none"
          onClick={handleFlipCard}
          style={{ perspective: 1000 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? 'back' : 'front'}
              initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center border
                ${flipped
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-400/30'
                  : 'bg-slate-800 border-slate-700'
                }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-slate-400">
                {flipped ? 'Answer' : `Card ${cardIndex + 1} of ${total}`}
              </p>
              <p className={`text-lg md:text-xl font-semibold whitespace-pre-line ${flipped ? 'text-white' : 'text-white'}`}>
                {flipped ? card.back : card.front}
              </p>
              <p className="text-xs mt-6 text-slate-400">{flipped ? 'Click to see question' : 'Click to reveal answer'}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center justify-between mt-6">
          <Button variant="secondary" onClick={handlePrevCard} disabled={total <= 1}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" onClick={() => { setCardIndex(0); setFlipped(false); }}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
          <Button variant="secondary" onClick={handleNextCard} disabled={total <= 1}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button fullWidth className="mt-4" onClick={handleMarkDone}>
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Mark Topic Complete (+25 XP)
        </Button>
      </div>
    );
  }

  if (viewMode === 'content' && selectedTopic) {
    const done = progress.completedTopics.includes(selectedTopic.id);

    return (
      <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setViewMode('topics')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <p className="text-xs text-slate-400">{unit.title}</p>
            <h2 className="font-bold text-white text-lg">{selectedTopic.title}</h2>
          </div>
          {done && <Badge variant="success">Done</Badge>}
        </div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <p className="font-semibold text-amber-300 text-sm">Key Points</p>
          </div>
          <ul className="space-y-2">
            {selectedTopic.keyPoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5"
        >
          <div className="prose prose-sm prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed">
              {selectedTopic.content}
            </pre>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={() => setViewMode('flashcards')}
            fullWidth
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Study Flashcards ({selectedTopic.flashcards.length})
          </Button>
          <Button
            onClick={handleMarkDone}
            disabled={done}
            fullWidth
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {done ? 'Completed!' : 'Mark Complete (+25 XP)'}
          </Button>
        </div>
      </div>
    );
  }

  // Topics list view
  return (
    <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('study')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <p className="text-xs text-slate-400">Chapter {unit.chapter}</p>
          <h2 className="font-bold text-white text-xl">{unit.title}</h2>
        </div>
        <div className="ml-auto"><Badge variant={unit.priority}>{unit.priority.toUpperCase()}</Badge></div>
      </div>

      {/* Exam Tip */}
      <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 mb-5">
        <p className="text-sm text-rose-300">
          <span className="font-semibold">Exam Tip: </span>{unit.examTip}
        </p>
      </div>

      <div className="space-y-3">
        {unit.topics.map((topic, i) => {
          const done = progress.completedTopics.includes(topic.id);
          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTopicSelect(topic)}
              className="w-full flex items-start gap-4 bg-slate-800/60 border border-slate-700 hover:border-slate-500 rounded-2xl p-4 text-left cursor-pointer group transition-all"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0
                bg-gradient-to-br ${unit.color}`}>
                {done ? <CheckCircle2 className="w-5 h-5 text-white" /> : <span className="text-white font-bold text-sm">{i + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white mb-0.5">{topic.title}</p>
                <p className="text-sm text-slate-400 mb-2">{topic.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> {topic.flashcards.length} flashcards
                  </span>
                  <span className="flex items-center gap-1">
                    <List className="w-3 h-3" /> {topic.quizQuestions.length} questions
                  </span>
                  {done && <Badge variant="success">Completed</Badge>}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 mt-2 flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
