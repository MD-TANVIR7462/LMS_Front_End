"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, PlayCircle, TrendingUp } from "lucide-react";
import { Course } from "@/types";

export default function AdminDashboard({ courses, length }: { courses: any; length: number }) {
  const stats = [
    {
      title: "Total Courses",
      value: length,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Modules",
      value: courses.reduce((acc: any, course: any) => acc + course.modules.length, 0),
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Total Lectures",
      value: courses.reduce(
        (acc: any, course: any) =>
          acc + course.modules.reduce((modAcc: any, module: any) => modAcc + module.lectures.length, 0),
        0
      ),
      icon: PlayCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Total Revenue",
      value: `$${courses.reduce((acc: any, course: any) => acc + course.price, 0).toFixed(2)}`,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your courses and track performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bg}`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.slice(0, 5).map((course: Course) => (
                  <div key={course._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={course.thumbnail} alt={course.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h3 className="font-medium text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.modules.length} modules</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${course.price}</p>
                      <p className="text-sm text-gray-500">
                        {course?.createdAt ? new Date(course.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
                {courses?.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No courses available. Start by creating your first course!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
