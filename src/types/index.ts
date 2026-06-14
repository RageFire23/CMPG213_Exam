export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'true-false' | 'short';
  options?: string[];
  answer: string | number;
  explanation: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  content: string;
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
}

export interface StudyUnit {
  id: string;
  chapter: number;
  title: string;
  priority: 'critical' | 'high' | 'medium';
  estimatedMarks: number;
  color: string;
  icon: string;
  topics: Topic[];
  examTip: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastStudied: string | null;
  completedTopics: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  hearts: number;
}

export interface XPEvent {
  id: string;
  amount: number;
  label: string;
}

export interface MockExamQuestion {
  id: string;
  unitId: string;
  question: string;
  marks: number;
  type: 'theory' | 'practical' | 'calculation';
  modelAnswer?: string;
  userAnswer?: string;
  score?: number;
  feedback?: string;
}

export interface ExamSession {
  id: string;
  createdAt: string;
  questions: MockExamQuestion[];
  totalMarks: number;
  earnedMarks?: number;
  status: 'pending' | 'submitted' | 'graded';
}

export type Page = 'roadmap' | 'study' | 'learn' | 'quiz' | 'mockexam' | 'settings';
