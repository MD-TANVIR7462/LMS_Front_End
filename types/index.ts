export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  createdAt: string;
  modules: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  moduleNumber: number;
  lectures: Lecture[];
}

export interface Lecture {
  id: string;
  moduleId: string;
  title: string;
  videoUrl: string;
  pdfNotes: PDFNote[];
  isCompleted?: boolean;
  isUnlocked?: boolean;
}

export interface PDFNote {
  id: string;
  title: string;
  url: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  progress: UserProgress[];
}

export interface UserProgress {
  courseId: string;
  completedLectures: string[];
  currentLecture: string | null;
  progressPercentage: number;
}