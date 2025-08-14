"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navigation } from "@/components/Navigation";
import { useProgress } from "@/contexts/ProgressContext";
import { Card } from "@/components/ui/card";

import { Clock, PlayCircle, BookOpen, BarChart2 } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "@/components/shared/Sidebar";
import { Course } from "@/types";

export default function UserCourses({ courses }: { courses: Course[] }) {
  const { getProgressPercentage } = useProgress();

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-2">Continue your learning journey</p>
          </div>
          {/* 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
             
              const progressPercentage = getProgressPercentage(course.id, totalLectures);

              return (
                <Card key={course._id}>
                  <CardContent className="p-0">
                    <Link href={`/courses/${course._id}`}>
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
                          <Badge className="absolute top-2 right-2 bg-green-500">{progressPercentage}% Complete</Badge>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-600">
                              <BookOpen className="h-4 w-4 mr-1" />
                              {course.modules.length} modules
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
                      </div>{" "}
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const totalModules = course.modules.length;
              const totalLectures = course.modules.reduce((sum, mod) => sum + (mod.lectures?.length || 0), 0);

              return (
                <Card
                  key={course._id}
                  className="overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group bg-white"
                >
                  <Link href={`/courses/${course._id}`} className="block h-full">
                    {/* Thumbnail with badges */}
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-56 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <PlayCircle className="h-8 w-8 text-primary" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-5 line-clamp-2">{course.description}</p>

                      {/* Stats */}
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span>{totalModules} Modules</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{totalLectures} Lectures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart2 className="h-4 w-4 text-gray-500" />
                          <span>{"All Levels"}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        {/* Instructor */}
                        <div className="flex items-center gap-2">
                          {
                            <img
                              src={
                                "https://i.ibb.co.com/hXmmwCH/240-F-622120265-HY3bi4i0-DNk-Edw-Q4-Rd-ODi3p1-Ac0-A9-NAu.jpg"
                              }
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          }
                          <span className="text-xs font-medium text-gray-600">{"Professional Instructor"}</span>
                        </div>

                        {/* Language */}
                        {course.language && (
                          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {course.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
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
