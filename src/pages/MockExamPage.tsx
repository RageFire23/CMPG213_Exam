import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ChevronDown, ChevronUp, Send, Trophy, AlertCircle,
  Loader2, CheckCircle2, BookOpen, RotateCcw, Settings
} from 'lucide-react';
import { studyUnits } from '../data/studyUnits';
import { useStore } from '../store/useStore';
import { generateMockExam, gradeExamAnswers } from '../lib/gemini';
import { ExamSession, MockExamQuestion, Page } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface MockExamPageProps {
  onNavigate: (page: Page) => void;
}

type PageState = 'setup' | 'exam' | 'grading' | 'results';

export default function MockExamPage({ onNavigate }: MockExamPageProps) {
  const { geminiApiKey, examSessions, saveExamSession } = useStore();
  const [pageState, setPageState] = useState<PageState>('setup');
  const [currentSession, setCurrentSession] = useState<ExamSession | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  const hasKey = geminiApiKey.trim().length > 0;

  const generateExam = async () => {
    if (!hasKey) return;
    setGenerating(true);
    setError(null);
    try {
      const questions = await generateMockExam(studyUnits, geminiApiKey);
      const session: ExamSession = {
        id: `exam_${Date.now()}`,
        createdAt: new Date().toISOString(),
        questions,
        totalMarks: questions.reduce((a, q) => a + q.marks, 0),
        status: 'pending',
      };
      setCurrentSession(session);
      setAnswers({});
      setPageState('exam');
    } catch (e: any) {
      setError(e.message || 'Failed to generate exam. Check your API key.');
    } finally {
      setGenerating(false);
    }
  };

  const submitExam = async () => {
    if (!currentSession) return;
    setPageState('grading');

    const withAnswers: MockExamQuestion[] = currentSession.questions.map(q => ({
      ...q,
      userAnswer: answers[q.id] || '',
    }));

    try {
      const graded = await gradeExamAnswers(withAnswers, geminiApiKey);
      const earnedMarks = graded.reduce((a, q) => a + (q.score ?? 0), 0);
      const gradedSession: ExamSession = {
        ...currentSession,
        questions: graded,
        earnedMarks,
        status: 'graded',
      };
      saveExamSession(gradedSession);
      setCurrentSession(gradedSession);
      setPageState('results');
    } catch (e: any) {
      setError(e.message || 'Grading failed. Please try again.');
      setPageState('exam');
    }
  };

  const getScoreColor = (score: number, max: number) => {
    const pct = (score / max) * 100;
    if (pct >= 70) return 'text-emerald-400';
    if (pct >= 50) return 'text-amber-400';
    return 'text-rose-400';
  };

  // Results view
  if (pageState === 'results' && currentSession) {
    const pct = Math.round(((currentSession.earnedMarks ?? 0) / currentSession.totalMarks) * 100);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 md:p-8 pb-24 md:pb-8 max-w-3xl mx-auto space-y-5"
      >
        {/* Score Summary */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl
              ${pct >= 70 ? 'bg-emerald-500/20 border-4 border-emerald-500' :
                pct >= 50 ? 'bg-amber-500/20 border-4 border-amber-500' :
                'bg-rose-500/20 border-4 border-rose-500'}`}
          >
            {pct >= 70 ? '🏆' : pct >= 50 ? '💪' : '📚'}
          </motion.div>
          <h2 className="text-4xl font-black text-white">{currentSession.earnedMarks}/{currentSession.totalMarks}</h2>
          <p className="text-xl font-bold text-slate-400">{pct}%</p>
          <p className="mt-2 text-slate-300">
            {pct >= 75 ? 'Excellent! You\'re exam ready.' :
             pct >= 60 ? 'Good work! Focus on the questions you missed.' :
             pct >= 50 ? 'Keep practicing — review weak areas.' :
             'Study more before your exam. Use the flashcards!'}
          </p>
          <div className="flex gap-3 mt-4 justify-center">
            <Button variant="secondary" onClick={() => setPageState('setup')}>
              <RotateCcw className="w-4 h-4 mr-2" />
              New Exam
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('study')}>
              <BookOpen className="w-4 h-4 mr-2" />
              Study
            </Button>
          </div>
        </div>

        {/* Question Breakdown */}
        <div>
          <h3 className="font-bold text-white mb-3 text-lg">Question Breakdown</h3>
          <div className="space-y-3">
            {currentSession.questions.map((q, i) => {
              const unit = studyUnits.find(u => u.id === q.unitId);
              const open = expandedQ === q.id;
              const hasScore = q.score != null;

              return (
                <motion.div
                  key={q.id}
                  layout
                  className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedQ(open ? null : q.id)}
                    className="w-full flex items-center gap-3 p-4 text-left cursor-pointer hover:bg-slate-700/30"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0
                      ${!hasScore ? 'bg-slate-700 text-slate-400' :
                        (q.score! / q.marks) >= 0.7 ? 'bg-emerald-500/20 text-emerald-400' :
                        (q.score! / q.marks) >= 0.5 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'}`}
                    >
                      {hasScore ? `${q.score}/${q.marks}` : `Q${i+1}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white line-clamp-1">{q.question}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant={unit?.priority ?? 'info'}>{unit?.title ?? q.unitId}</Badge>
                        <span className="text-xs text-slate-400">{q.marks} marks · {q.type}</span>
                      </div>
                    </div>
                    {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-700"
                      >
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-slate-400 mb-1">Your Answer</p>
                            <p className="text-sm text-slate-300 bg-slate-700/40 rounded-lg p-3">
                              {q.userAnswer || <span className="text-slate-500 italic">No answer provided</span>}
                            </p>
                          </div>
                          {q.modelAnswer && (
                            <div>
                              <p className="text-xs font-semibold text-emerald-400 mb-1">Model Answer</p>
                              <p className="text-sm text-slate-300 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                                {q.modelAnswer}
                              </p>
                            </div>
                          )}
                          {q.feedback && (
                            <div>
                              <p className="text-xs font-semibold text-blue-400 mb-1">AI Feedback</p>
                              <p className="text-sm text-slate-300 bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                                {q.feedback}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  // Grading loading state
  if (pageState === 'grading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        >
          <Loader2 className="w-12 h-12 text-blue-400" />
        </motion.div>
        <h2 className="text-xl font-bold text-white">AI is grading your exam...</h2>
        <p className="text-slate-400 text-center max-w-sm">
          Our AI lecturer is carefully reviewing your answers and preparing detailed feedback.
        </p>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Active exam
  if (pageState === 'exam' && currentSession) {
    const answeredCount = Object.values(answers).filter(a => a.trim().length > 0).length;
    const totalQ = currentSession.questions.length;

    return (
      <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-3xl mx-auto space-y-5">
        {/* Exam header */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-white">CMPG213 Mock Exam</h1>
              <p className="text-sm text-slate-400">Total: {currentSession.totalMarks} marks · {totalQ} questions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-2xl font-black text-white">{answeredCount}/{totalQ}</p>
                <p className="text-xs text-slate-400">Answered</p>
              </div>
            </div>
          </div>
          <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              animate={{ width: `${(answeredCount / totalQ) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-5">
          {currentSession.questions.map((q, i) => {
            const unit = studyUnits.find(u => u.id === q.unitId);
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5) }}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {unit && <Badge variant={unit.priority}>{unit.title}</Badge>}
                      <Badge variant="info">{q.marks} marks</Badge>
                      <Badge variant="medium">{q.type}</Badge>
                    </div>
                    <p className="text-white font-medium leading-relaxed">{q.question}</p>
                  </div>
                </div>
                <textarea
                  value={answers[q.id] || ''}
                  onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                  placeholder={`Type your answer here... (${q.marks} marks)`}
                  rows={4}
                  className="w-full bg-slate-900/60 border border-slate-600 focus:border-blue-500 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 resize-none outline-none transition-colors"
                />
                {answers[q.id]?.trim().length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs text-emerald-400">Answer saved</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <p className="text-sm text-rose-300">{error}</p>
          </div>
        )}

        <Button onClick={submitExam} fullWidth size="lg">
          <Send className="w-5 h-5 mr-2" />
          Submit & Grade with AI ({answeredCount}/{totalQ} answered)
        </Button>
      </div>
    );
  }

  // Setup / landing
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 pb-24 md:pb-8 max-w-3xl mx-auto space-y-5"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">AI Mock Exam</h1>
        <p className="text-slate-400 mt-1">
          Generate a full 100-mark exam paper based on the CMPG213 demarcation. Answer online, get AI grading.
        </p>
      </div>

      {/* API Key Warning */}
      {!hasKey && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-300">Gemini API Key Required</p>
              <p className="text-sm text-amber-400/80 mt-1">
                To use the AI mock exam and grading, you need a free Google Gemini API key. Add it in Settings.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('settings')}
                className="mt-3"
              >
                <Settings className="w-4 h-4 mr-2" />
                Go to Settings
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { icon: '🎯', title: 'Exam-Accurate', desc: 'Questions follow the CMPG213 demarcation with correct mark allocation.' },
          { icon: '♾️', title: 'Infinite Tests', desc: 'Generate as many unique exams as you need — never repeat the same paper.' },
          { icon: '🤖', title: 'AI Grading', desc: 'Submit answers and get instant AI feedback with detailed explanations.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-center">
            <span className="text-3xl">{icon}</span>
            <p className="font-bold text-white mt-2">{title}</p>
            <p className="text-xs text-slate-400 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      {/* Generate button */}
      <Button
        onClick={generateExam}
        disabled={!hasKey || generating}
        fullWidth
        size="lg"
        className="!py-4"
      >
        {generating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating your exam...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate New Mock Exam
          </>
        )}
      </Button>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <p className="text-sm text-rose-300">{error}</p>
        </div>
      )}

      {/* Past Sessions */}
      {examSessions.length > 0 && (
        <div>
          <h2 className="font-bold text-white mb-3">Past Exams</h2>
          <div className="space-y-2">
            {examSessions.slice(0, 5).map(session => {
              const pct = session.earnedMarks != null
                ? Math.round((session.earnedMarks / session.totalMarks) * 100)
                : null;
              return (
                <div
                  key={session.id}
                  className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-xl p-3"
                >
                  <Trophy className={`w-5 h-5 flex-shrink-0 ${pct != null && pct >= 70 ? 'text-amber-400' : 'text-slate-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {new Date(session.createdAt).toLocaleDateString()} — {session.totalMarks} marks
                    </p>
                    <p className="text-xs text-slate-400">
                      {session.status === 'graded' ? `Score: ${session.earnedMarks}/${session.totalMarks} (${pct}%)` : session.status}
                    </p>
                  </div>
                  {pct != null && (
                    <span className={`text-sm font-bold ${getScoreColor(session.earnedMarks!, session.totalMarks)}`}>
                      {pct}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
