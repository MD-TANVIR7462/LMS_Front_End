'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { useCourses } from '@/contexts/CourseContext';
import { useProgress } from '@/contexts/ProgressContext';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  PlayCircle, 
  CheckCircle, 
  Lock, 
  Clock, 
  BookOpen, 
  Star,
  User,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id as string;
  const { courses } = useCourses();
  const { getProgressPercentage, isLessonCompleted } = useProgress();

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <ProtectedRoute requiredRole="user">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
            <p className="text-gray-600 mt-2">The course you're looking for doesn't exist.</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const totalLectures = course.modules.reduce((acc, module) => acc + module.lectures.length, 0);
  const progressPercentage = getProgressPercentage(courseId, totalLectures);

  // Mock additional course data for better presentation
  const courseStats = {
    duration: `${totalLectures * 15} minutes`,
    students: Math.floor(Math.random() * 1000) + 100,
    rating: 4.8,
    reviews: Math.floor(Math.random() * 100) + 50,
    instructor: 'Expert Instructor',
    level: 'Beginner to Advanced'
  };

  const isLectureUnlocked = (moduleIndex: number, lectureIndex: number) => {
    if (moduleIndex === 0 && lectureIndex === 0) return true;
    
    // Check if previous lecture is completed
    for (let m = 0; m <= moduleIndex; m++) {
      const moduleEndIndex = m === moduleIndex ? lectureIndex : course.modules[m].lectures.length;
      for (let l = 0; l < moduleEndIndex; l++) {
        const lecture = course.modules[m].lectures[l];
        if (!isLessonCompleted(courseId, lecture.id)) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-2/3">
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-blue-100 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-medium">{courseStats.rating}</span>
                    <span className="text-blue-200 ml-1">({courseStats.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-blue-200">
                    <User className="h-5 w-5 mr-1" />
                    {courseStats.students} students
                  </div>
                  <div className="flex items-center text-blue-200">
                    <Clock className="h-5 w-5 mr-1" />
                    {courseStats.duration}
                  </div>
                  <div className="flex items-center text-blue-200">
                    <Award className="h-5 w-5 mr-1" />
                    {courseStats.level}
                  </div>
                </div>

                {progressPercentage > 0 && (
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Your Progress</span>
                      <span className="text-sm">{progressPercentage}% Complete</span>
                    </div>
                    <Progress value={progressPercentage} className="bg-white bg-opacity-20" />
                  </div>
                )}
              </div>
              
              <div className="lg:w-1/3 lg:pl-8 mt-8 lg:mt-0">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Course Content
                  </CardTitle>
                  <p className="text-gray-600">
                    {course.modules.length} modules • {totalLectures} lectures
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border rounded-lg">
                      <div className="p-4 bg-gray-50 border-b">
                        <h3 className="font-semibold text-lg">
                          Module {module.moduleNumber}: {module.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {module.lectures.length} lectures
                        </p>
                      </div>
                      <div className="divide-y">
                        {module.lectures.map((lecture, lectureIndex) => {
                          const isCompleted = isLessonCompleted(courseId, lecture.id);
                          const isUnlocked = isLectureUnlocked(moduleIndex, lectureIndex);
                          
                          return (
                            <div key={lecture.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  {isCompleted ? (
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                  ) : isUnlocked ? (
                                    <PlayCircle className="h-6 w-6 text-blue-500" />
                                  ) : (
                                    <Lock className="h-6 w-6 text-gray-400" />
                                  )}
                                </div>
                                <div>
                                  <h4 className={`font-medium ${!isUnlocked ? 'text-gray-400' : ''}`}>
                                    {lecture.title}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Video • {lecture.pdfNotes.length} notes
                                  </p>
                                </div>
                              </div>
                              
                              {isUnlocked && (
                                <Link href={`/courses/${courseId}/lecture/${lecture.id}`}>
                                  <Button size="sm" variant={isCompleted ? "secondary" : "default"}>
                                    {isCompleted ? 'Review' : 'Start'}
                                  </Button>
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-4">
                      ${course.price}
                    </div>
                    <Button className="w-full mb-4" size="lg">
                      Enroll Now
                    </Button>
                    <p className="text-sm text-gray-600">
                      30-day money-back guarantee
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Course Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Instructor:</span>
                    <span className="font-medium">{courseStats.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{courseStats.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{courseStats.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{courseStats.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <Badge variant="secondary">Yes</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}