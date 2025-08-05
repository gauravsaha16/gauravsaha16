export interface ExamCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  totalQuestions: number;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  completedQuestions: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  studyMaterial?: StudyMaterial;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  subject: string;
  topic: string;
  year?: number;
  source?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'pdf' | 'video' | 'image';
  url?: string;
  downloadUrl?: string;
}

export interface UserProgress {
  userId: string;
  examCategory: string;
  subject: string;
  topic: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpent: number; // in minutes
  lastStudied: Date;
}

export interface MockTest {
  id: string;
  name: string;
  description: string;
  examCategory: string;
  duration: number; // in minutes
  totalQuestions: number;
  questions: Question[];
  negativeMarking: boolean;
  negativeMarkingRatio: number;
}

export interface TestResult {
  id: string;
  mockTestId: string;
  userId: string;
  score: number;
  totalMarks: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  timeSpent: number;
  completedAt: Date;
  answers: UserAnswer[];
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface CurrentAffairs {
  id: string;
  title: string;
  content: string;
  category: string;
  date: Date;
  importance: 'high' | 'medium' | 'low';
  tags: string[];
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  targetExam: string[];
  joinedDate: Date;
  premium: boolean;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  dailyGoal: number; // questions per day
  studyReminder: boolean;
  reminderTime: string;
  language: 'english' | 'hindi';
  theme: 'light' | 'dark';
}