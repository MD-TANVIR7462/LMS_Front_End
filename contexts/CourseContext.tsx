'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Course, Module, Lecture } from '@/types';
import { mockCourses } from '@/lib/mockData';

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'createdAt' | 'modules'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addModule: (courseId: string, module: Omit<Module, 'id' | 'moduleNumber' | 'lectures'>) => void;
  updateModule: (moduleId: string, module: Partial<Module>) => void;
  deleteModule: (moduleId: string) => void;
  addLecture: (moduleId: string, lecture: Omit<Lecture, 'id'>) => void;
  updateLecture: (lectureId: string, lecture: Partial<Lecture>) => void;
  deleteLecture: (lectureId: string) => void;
  getCourseById: (id: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt' | 'modules'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      modules: []
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = (id: string, courseData: Partial<Course>) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === id ? { ...course, ...courseData } : course
      )
    );
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const addModule = (courseId: string, moduleData: Omit<Module, 'id' | 'moduleNumber' | 'lectures'>) => {
    setCourses(prev =>
      prev.map(course => {
        if (course.id === courseId) {
          const moduleNumber = course.modules.length + 1;
          const newModule: Module = {
            ...moduleData,
            id: Date.now().toString(),
            moduleNumber,
            lectures: []
          };
          return { ...course, modules: [...course.modules, newModule] };
        }
        return course;
      })
    );
  };

  const updateModule = (moduleId: string, moduleData: Partial<Module>) => {
    setCourses(prev =>
      prev.map(course => ({
        ...course,
        modules: course.modules.map(module =>
          module.id === moduleId ? { ...module, ...moduleData } : module
        )
      }))
    );
  };

  const deleteModule = (moduleId: string) => {
    setCourses(prev =>
      prev.map(course => ({
        ...course,
        modules: course.modules.filter(module => module.id !== moduleId)
      }))
    );
  };

  const addLecture = (moduleId: string, lectureData: Omit<Lecture, 'id'>) => {
    setCourses(prev =>
      prev.map(course => ({
        ...course,
        modules: course.modules.map(module => {
          if (module.id === moduleId) {
            const newLecture: Lecture = {
              ...lectureData,
              id: Date.now().toString()
            };
            return { ...module, lectures: [...module.lectures, newLecture] };
          }
          return module;
        })
      }))
    );
  };

  const updateLecture = (lectureId: string, lectureData: Partial<Lecture>) => {
    setCourses(prev =>
      prev.map(course => ({
        ...course,
        modules: course.modules.map(module => ({
          ...module,
          lectures: module.lectures.map(lecture =>
            lecture.id === lectureId ? { ...lecture, ...lectureData } : lecture
          )
        }))
      }))
    );
  };

  const deleteLecture = (lectureId: string) => {
    setCourses(prev =>
      prev.map(course => ({
        ...course,
        modules: course.modules.map(module => ({
          ...module,
          lectures: module.lectures.filter(lecture => lecture.id !== lectureId)
        }))
      }))
    );
  };

  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  return (
    <CourseContext.Provider value={{
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      addModule,
      updateModule,
      deleteModule,
      addLecture,
      updateLecture,
      deleteLecture,
      getCourseById
    }}>
      {children}
    </CourseContext.Provider>
  );
};