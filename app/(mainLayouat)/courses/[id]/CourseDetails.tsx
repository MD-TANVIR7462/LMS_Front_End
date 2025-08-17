"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useProgress } from "@/contexts/ProgressContext";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  BookOpen,
  Star,
  User,
  Award,
  ChevronRight,
  Check,
  Lock,
  Play,
  Trophy,
  BarChart2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Course } from "@/types";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Certificate from "@/components/user/Certificate";
import CourseQTA from "@/components/user/CourseQTA";
import { useAppSelector } from "@/redux/features/hooks";
import { logout, useCurrentToken, useCurrentUser } from "@/redux/features/auth/authSlice";
import { getData } from "@/server/serverAction";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function CourseDetail({ course }: { course: Course }) {
  const params = useParams();
  const courseId = params.id as string;
  const { getProgressPercentage, isLessonCompleted } = useProgress();
  const router = useRouter();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const disPatch = useDispatch();
  const [progress, setProgress] = useState([]);
  const [dbUser, setdbUser] = useState([]);

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

  useEffect(() => {
    const checkUser = async () => {
      if (!token || !user) return; // exit early if no token or user

      try {
        const response = (await getData("/auth/register/me", token))?.data[0];
        if (response) {
          setdbUser(response);
          const progress = (await getData(`progress/${response._id}/${course._id}`)).data;
          setProgress(progress);
          return;
        }
        setProgress([]);
        setdbUser([]);
      } catch (err) {
        setdbUser([]);
        setProgress([]);
      }
    };

    checkUser();
  }, [token, user, disPatch, router]); // router and disPatch are stable, this is fine

  //getlecture progress

  // const getModuleProgress = async (moduleId: string) => {
  //    console.log(moduleId)
  //    const progress = (await getData(`progress/${course._id}/${moduleId}`)).data
  //    console.log(progress)
  // }

  const totalLectures = course.modules.reduce((acc: any, module: any) => acc + module.lectures.length, 0);
  const progressPercentage = getProgressPercentage(courseId, totalLectures);

  // Enhanced course stats with more realistic data
  const courseStats = {
    duration: `${Math.round((totalLectures * 30) / 50)} hours`,
    students: Math.floor(Math.random() * 10000) + 1000,
    rating: (Math.random() * 0.7 + 4.3).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 100,
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Senior Developer & Educator",
      avatar: "/instructor-avatar.jpg",
      bio: "10+ years of experience in web development and teaching",
    },
    level: "Beginner to Advanced",
    lastUpdated: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
    certificate: true,
    skills: ["React", "Next.js", "TypeScript", "UI/UX", "State Management"],
  };

  const isLectureUnlocked = (moduleIndex: number, lectureIndex: number) => {
    if (moduleIndex === 0 && lectureIndex === 0) return true;
    return true; // Temporarily unlocked all for demo
  };

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen ">
        {/* Hero Section with Gradient Background */}
        {/* Background elements */}
        <div className="relative  flex items-center justify-center bg-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                         radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                backgroundSize: "100px 100px",
              }}
            ></div>
          </div>
          <div className="relative  text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
              <div className="lg:flex lg:items-center lg:justify-between gap-12">
                <div className="lg:w-2/3">
                  <Badge variant="secondary" className="mb-4 bg-white/10 backdrop-blur-sm text-white border-white/20">
                    {"Web Development"}
                  </Badge>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                  >
                    {course.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-blue-100 mb-8 max-w-3xl"
                  >
                    {course.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-6 mb-8"
                  >
                    <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-medium">{courseStats.rating}</span>
                      <span className="text-blue-200 ml-1">({courseStats.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <div className="flex items-center text-blue-200 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <User className="h-5 w-5 mr-1" />
                      {courseStats.students.toLocaleString()} students
                    </div>
                    <div className="flex items-center text-blue-200 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Clock className="h-5 w-5 mr-1" />
                      {courseStats.duration}
                    </div>
                    <div className="flex items-center text-blue-200 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Award className="h-5 w-5 mr-1" />
                      {courseStats.level}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link href={`/courses/${courseId}/lecture/${course.modules[0]?.lectures[0]?._id}`}>
                      <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                        <Play className="h-4 w-4 mr-2" /> Start Learning
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                    >
                      <Trophy className="h-4 w-4 mr-2" /> Earn Certificate
                    </Button>
                  </motion.div>
                </div>

                <div className="lg:w-1/3 mt-12 lg:mt-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -inset-2 rounded-md"></div>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="relative w-full rounded-xl shadow-2xl border-4 border-white/20 transform hover:scale-[1.02] transition-transform duration-300"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
          {/* Progress Bar */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
            {/* Course Content - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Outline Card */}
              <motion.div
                className="l"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className=" shadow-sm border">
                  <div className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      {" "}
                      <CardTitle className="flex items-center text-xl">
                        <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                        Course Outline & Modules
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        {course.modules.length} modules • {totalLectures} lectures • {courseStats.duration} total length
                      </p>
                    </div>
                    <Link href={`/courses/${courseId}/lecture`}>
                      {" "}
                      <Button variant={"outline"}> Watch Lectures</Button>
                    </Link>
                  </div>
                  <CardContent className="pb-6  max-h-[500px] overflow-y-auto ">
                    <div className="space-y-2">
                      {course.modules.map((module, moduleIndex) => {
                        const [isExpanded, setIsExpanded] = useState(moduleIndex === 0);

                        return (
                          <div key={module?._id} className="border rounded-lg overflow-hidden">
                            <button
                              onClick={() => setIsExpanded(!isExpanded)}
                              className="w-full p-4 bg-gradient-to-r from-gray-50 to-white border-b flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                              <div className="text-left">
                                <h3 className="font-semibold text-lg">
                                  <span className="text-indigo-600">Module {moduleIndex + 1}:</span> {module.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {module.lectures.length} lectures • {Math.round((module.lectures.length * 15) / 60)}{" "}
                                  min
                                </p>
                              </div>
                              <ChevronRight
                                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                  isExpanded ? "rotate-90" : ""
                                }`}
                              />
                            </button>

                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="divide-y overflow-hidden"
                              >
                                {module.lectures.map((lecture, lectureIndex) => {
                                  const isUnlocked = isLectureUnlocked(moduleIndex, lectureIndex);
                                  const isCompleted = isLessonCompleted(courseId, lecture._id as string);

                                  return (
                                    <div
                                      key={lecture._id}
                                      className={`block p-4 hover:bg-gray-50 transition-colors  cursor-not-allowed `}
                                    >
                                      <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3">
                                          {isCompleted ? (
                                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                                              <Check className="h-4 w-4 text-green-600" />
                                            </div>
                                          ) : isUnlocked ? (
                                            <Play className="h-5 w-5 text-gray-400" />
                                          ) : (
                                            <Lock className="h-5 w-5 text-gray-300" />
                                          )}
                                        </div>
                                        <div className="flex-grow">
                                          <h4
                                            className={`font-medium ${
                                              isCompleted
                                                ? "text-green-600"
                                                : isUnlocked
                                                ? "text-gray-800"
                                                : "text-gray-400"
                                            }`}
                                          >
                                            {lecture.title}
                                          </h4>
                                          <div className="flex items-center mt-1">
                                            <span
                                              className={`text-xs ${
                                                isCompleted
                                                  ? "text-green-500"
                                                  : isUnlocked
                                                  ? "text-gray-500"
                                                  : "text-gray-400"
                                              }`}
                                            >
                                              15 min • {isCompleted ? "Completed" : isUnlocked ? "Available" : "Locked"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* What You'll Learn Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">Master the fundamentals of {course.title}</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">Build real-world projects to showcase in your portfolio</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">Learn best practices from industry experts</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">Gain hands-on experience with practical exercises</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Instructor Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-2 border-indigo-100">
                        <AvatarImage src={courseStats.instructor.avatar} />
                        <AvatarFallback>{courseStats.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{courseStats.instructor.name}</h3>
                        <p className="text-sm text-gray-600">{courseStats.instructor.title}</p>
                        <p className="text-sm text-gray-500 mt-2">{courseStats.instructor.bio}</p>
                        <Button variant="outline" size="sm" className="mt-3">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Course Details Card */}
              <CourseQTA courseStats={courseStats} />
              {/* Skills Covered Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Skills You'll Gain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {courseStats.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border-indigo-100"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Certificate Preview */}
              {courseStats.certificate && <Certificate />}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
