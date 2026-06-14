import { createContext, useContext, useState, useEffect, ReactNode, createElement, useCallback } from 'react';
import { UserProgress, ExamSession, XPEvent } from '../types';

const MAX_HEARTS = 5;

interface StoreState {
  progress: UserProgress;
  examSessions: ExamSession[];
  geminiApiKey: string;
  xpEvents: XPEvent[];
  addXP: (amount: number, label?: string) => void;
  completeTopicById: (topicId: string) => void;
  completeQuizById: (unitId: string, score: number) => void;
  loseHeart: () => void;
  refillHearts: () => void;
  saveExamSession: (session: ExamSession) => void;
  setGeminiApiKey: (key: string) => void;
  resetProgress: () => void;
  dismissXPEvent: (id: string) => void;
}

const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastStudied: null,
  completedTopics: [],
  completedQuizzes: [],
  quizScores: {},
  hearts: MAX_HEARTS,
};

function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const stored = loadFromStorage('cmpg213_progress', defaultProgress);
    // backfill hearts if missing from older saves
    return { ...defaultProgress, ...stored, hearts: stored.hearts ?? MAX_HEARTS };
  });
  const [examSessions, setExamSessions] = useState<ExamSession[]>(() =>
    loadFromStorage('cmpg213_exams', [])
  );
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() =>
    loadFromStorage('cmpg213_gemini_key', '')
  );
  const [xpEvents, setXPEvents] = useState<XPEvent[]>([]);

  useEffect(() => {
    localStorage.setItem('cmpg213_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('cmpg213_exams', JSON.stringify(examSessions));
  }, [examSessions]);

  const addXP = useCallback((amount: number, label = `+${amount} XP`) => {
    const id = `xp_${Date.now()}_${Math.random()}`;
    setXPEvents(prev => [...prev, { id, amount, label }]);
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount,
      level: calculateLevel(prev.xp + amount),
    }));
  }, []);

  const dismissXPEvent = useCallback((id: string) => {
    setXPEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  const completeTopicById = useCallback((topicId: string) => {
    setProgress(prev => {
      if (prev.completedTopics.includes(topicId)) return prev;
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = prev.lastStudied === yesterday
        ? prev.streak + 1
        : prev.lastStudied === today ? prev.streak : 1;
      const newXP = prev.xp + 25;
      return {
        ...prev,
        completedTopics: [...prev.completedTopics, topicId],
        xp: newXP,
        level: calculateLevel(newXP),
        streak: newStreak,
        lastStudied: today,
      };
    });
    const id = `xp_${Date.now()}`;
    setXPEvents(prev => [...prev, { id, amount: 25, label: '+25 XP' }]);
  }, []);

  const completeQuizById = useCallback((unitId: string, score: number) => {
    const xpGained = Math.round((score / 100) * 50);
    setProgress(prev => ({
      ...prev,
      completedQuizzes: prev.completedQuizzes.includes(unitId)
        ? prev.completedQuizzes
        : [...prev.completedQuizzes, unitId],
      quizScores: { ...prev.quizScores, [unitId]: Math.max(prev.quizScores[unitId] ?? 0, score) },
      xp: prev.xp + xpGained,
      level: calculateLevel(prev.xp + xpGained),
    }));
    if (xpGained > 0) {
      const id = `xp_${Date.now()}`;
      setXPEvents(prev => [...prev, { id, amount: xpGained, label: `+${xpGained} XP` }]);
    }
  }, []);

  const loseHeart = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
  }, []);

  const refillHearts = useCallback(() => {
    setProgress(prev => ({ ...prev, hearts: MAX_HEARTS }));
  }, []);

  const saveExamSession = useCallback((session: ExamSession) => {
    setExamSessions(prev => {
      const existing = prev.findIndex(s => s.id === session.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = session;
        return updated;
      }
      return [session, ...prev];
    });
    if (session.status === 'graded' && session.earnedMarks != null) {
      addXP(Math.round(session.earnedMarks), `+${Math.round(session.earnedMarks)} XP`);
    }
  }, [addXP]);

  const setGeminiApiKey = useCallback((key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('cmpg213_gemini_key', JSON.stringify(key));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    setExamSessions([]);
    setXPEvents([]);
  }, []);

  return createElement(
    StoreContext.Provider,
    {
      value: {
        progress,
        examSessions,
        geminiApiKey,
        xpEvents,
        addXP,
        dismissXPEvent,
        completeTopicById,
        completeQuizById,
        loseHeart,
        refillHearts,
        saveExamSession,
        setGeminiApiKey,
        resetProgress,
      },
    },
    children
  );
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export { MAX_HEARTS };
