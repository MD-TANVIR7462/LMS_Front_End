'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { useCourses } from '@/contexts/CourseContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, PlayCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function UserCourses() {
  const { courses } = useCourses();
  const { getProgressPercentage } = useProgress();

  const getTotalLectures = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course?.modules.reduce((acc, module) => acc + module.lectures.length, 0) || 0;
  };

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-2">Continue your learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const totalLectures = getTotalLectures(course.id);
              const progressPercentage = getProgressPercentage(course.id, totalLectures);
              
              return (
                <Card key={course.id} className="hover:shadow-lg transition-shadow group">
                  <CardContent className="p-0">
                    <Link href={`/courses/${course.id}`}>
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                          <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {progressPercentage > 0 && (
                          <Badge className="absolute top-2 right-2 bg-green-500">
                            {progressPercentage}% Complete
                          </Badge>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <Link href={`/courses/${course.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {course.modules.length} modules
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {totalLectures} lessons
                          </div>
                        </div>
                        
                        {progressPercentage > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Progress</span>
                              <span>{progressPercentage}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                          </div>
                        )}
                        
                        <div className="pt-2 border-t">
                          <span className="text-2xl font-bold text-green-600">${course.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <BookOpen className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
              <p className="text-gray-600">Check back later for new courses!</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}