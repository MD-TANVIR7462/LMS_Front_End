import { Course, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@lms.com',
    name: 'Admin User',
    role: 'admin',
    progress: []
  },
  {
    id: '2',
    email: 'user@lms.com',
    name: 'Student User',
    role: 'user',
    progress: [
      {
        courseId: '1',
        completedLectures: ['1', '2'],
        currentLecture: '3',
        progressPercentage: 25
      }
    ]
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Development Course',
    description: 'Master React from basics to advanced concepts including hooks, context, and modern patterns.',
    price: 99.99,
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
    createdAt: '2024-01-15',
    modules: [
      {
        id: '1',
        courseId: '1',
        title: 'React Fundamentals',
        moduleNumber: 1,
        lectures: [
          {
            id: '1',
            moduleId: '1',
            title: 'Introduction to React',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            pdfNotes: [
              { id: '1', title: 'React Basics.pdf', url: '#' },
              { id: '2', title: 'Setup Guide.pdf', url: '#' }
            ]
          },
          {
            id: '2',
            moduleId: '1',
            title: 'JSX and Components',
            videoUrl: 'https://www.youtube.com/embed/QFaFIcGhPoM',
            pdfNotes: [
              { id: '3', title: 'JSX Syntax.pdf', url: '#' }
            ]
          }
        ]
      },
      {
        id: '2',
        courseId: '1',
        title: 'State Management',
        moduleNumber: 2,
        lectures: [
          {
            id: '3',
            moduleId: '2',
            title: 'useState Hook',
            videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0',
            pdfNotes: [
              { id: '4', title: 'State Management.pdf', url: '#' }
            ]
          },
          {
            id: '4',
            moduleId: '2',
            title: 'useEffect Hook',
            videoUrl: 'https://www.youtube.com/embed/0ZJgIjIuY7U',
            pdfNotes: [
              { id: '5', title: 'Effect Patterns.pdf', url: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
    price: 129.99,
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
    createdAt: '2024-01-20',
    modules: [
      {
        id: '3',
        courseId: '2',
        title: 'Node.js Basics',
        moduleNumber: 1,
        lectures: [
          {
            id: '5',
            moduleId: '3',
            title: 'Setting up Node.js',
            videoUrl: 'https://www.youtube.com/embed/fBNz5xF-Kx4',
            pdfNotes: [
              { id: '6', title: 'Node.js Setup.pdf', url: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Full Stack Web Development',
    description: 'Complete full-stack development course covering frontend, backend, and database technologies.',
    price: 199.99,
    thumbnail: 'https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg',
    createdAt: '2024-02-01',
    modules: []
  }
];