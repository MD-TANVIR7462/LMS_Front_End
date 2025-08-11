'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { UserProgress } from '@/types';
import { useAuth } from './AuthContext';

interface ProgressContextType {
  getUserProgress: (courseId: string) => UserProgress | undefined;
  completeLesson: (courseId: string, lectureId: string) => void;
  isLessonCompleted: (courseId: string, lectureId: string) => boolean;
  getProgressPercentage: (courseId: string, totalLectures: number) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress[]>(user?.progress || []);

  const getUserProgress = (courseId: string) => {
    return userProgress.find(progress => progress.courseId === courseId);
  };

  const completeLesson = (courseId: string, lectureId: string) => {
    setUserProgress(prev => {
      const existingProgress = prev.find(p => p.courseId === courseId);
      
      if (existingProgress) {
        if (!existingProgress.completedLectures.includes(lectureId)) {
          return prev.map(p => 
            p.courseId === courseId 
              ? { ...p, completedLectures: [...p.completedLectures, lectureId] }
              : p
          );
        }
        return prev;
      } else {
        return [...prev, {
          courseId,
          completedLectures: [lectureId],
          currentLecture: lectureId,
          progressPercentage: 0
        }];
      }
    });
  };

  const isLessonCompleted = (courseId: string, lectureId: string) => {
    const progress = getUserProgress(courseId);
    return progress?.completedLectures.includes(lectureId) || false;
  };

  const getProgressPercentage = (courseId: string, totalLectures: number) => {
    const progress = getUserProgress(courseId);
    if (!progress || totalLectures === 0) return 0;
    return Math.round((progress.completedLectures.length / totalLectures) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      getUserProgress,
      completeLesson,
      isLessonCompleted,
      getProgressPercentage
    }}>
      {children}
    </ProgressContext.Provider>
  );
};