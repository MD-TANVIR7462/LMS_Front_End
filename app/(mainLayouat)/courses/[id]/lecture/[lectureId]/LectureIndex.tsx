"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useCourses } from "@/contexts/CourseContext";
import { useProgress } from "@/contexts/ProgressContext";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Download, Search, CheckCircle, PlayCircle, FileText, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Course } from "@/types";

export default function LectureIndex({ course }: { course: Course }) {
   const params = useParams();
   const courseId = params.id as string;
   const lectureId = params.lectureId as string;
   const { completeLesson, isLessonCompleted, getProgressPercentage } = useProgress();
   const [searchTerm, setSearchTerm] = useState("");
   const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

   const currentLecture = course?.modules.flatMap((m) => m.lectures).find((l) => l._id === lectureId);
   const currentModule = course?.modules.find((m) => m.lectures.some((l) => l._id === lectureId));

   useEffect(() => {
      if (currentModule) {
         setExpandedModules((prev) => new Set([...(prev as any), currentModule._id]));
      }
   }, [currentModule]);

   if (!course || !currentLecture || !currentModule) {
      return (
         <ProtectedRoute requiredRole="user">
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
               <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900">Lecture not found</h1>
                  <p className="text-gray-600 mt-2">The lecture you're looking for doesn't exist.</p>
               </div>
            </div>
         </ProtectedRoute>
      );
   }

   const totalLectures = course.modules.reduce((acc, module) => acc + module.lectures.length, 0);
   const progressPercentage = getProgressPercentage(courseId, totalLectures);
   const isCompleted = isLessonCompleted(courseId, lectureId);

   // Get all lectures in order for navigation
   const allLectures = course.modules.flatMap((module) =>
      module.lectures.map((lecture) => ({
         ...lecture,
         moduleTitle: module.title,
         moduleNumber: module.moduleNumber,
      }))
   );

   const currentIndex = allLectures.findIndex((l) => l._id === lectureId);
   const previousLecture = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
   const nextLecture = currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : null;

   const handleCompleteLesson = () => {
      completeLesson(courseId, lectureId);
   };

   const toggleModule = (moduleId: string) => {
      setExpandedModules((prev) => {
         const newSet = new Set(prev);
         if (newSet.has(moduleId)) {
            newSet.delete(moduleId);
         } else {
            newSet.add(moduleId);
         }
         return newSet;
      });
   };

   const filteredModules = course.modules
      .map((module) => ({
         ...module,
         lectures: module.lectures.filter((lecture) => lecture.title.toLowerCase().includes(searchTerm.toLowerCase())),
      }))
      .filter((module) => module.lectures.length > 0 || searchTerm === "");
   console.log(currentLecture);
   return (
      <ProtectedRoute requiredRole="user">
         <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
               {/* Course Progress Bar */}
               <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                     <Link href={`/courses/${courseId}`} className="text-sm text-blue-600 hover:text-blue-800">
                        ← Back to Course
                     </Link>
                     <span className="text-sm text-gray-600">{progressPercentage}% Complete</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                  {/* Main Content */}
                  <div className="lg:col-span-5">
                     <div className="space-y-6">
                        {/* Lecture Header */}
                        <Card>
                           <CardContent className="p-2">
                              <div className="flex items-center justify-between ">
                                 <div>
                                    <h1 className="text-lg  text-gray-900">{currentLecture.title}</h1>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    {isCompleted ? (
                                       <CheckCircle className="h-6 w-6 text-green-500" />
                                    ) : (
                                       <Button onClick={handleCompleteLesson}>Mark as Complete</Button>
                                    )}
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        {/* Video Player */}
                        <Card>
                           <CardContent className="p-0">
                              <div className="aspect-video">
                                 <iframe
                                    src={currentLecture.videoUrl}
                                    className="w-full h-full rounded-lg"
                                    allowFullScreen
                                    title={currentLecture.title}
                                 />
                              </div>
                           </CardContent>
                        </Card>

                        {/* PDF Notes */}
                        {currentLecture.pdfNotes && currentLecture.pdfNotes.length > 0 && (
                           <Card>
                              <CardHeader>
                                 <CardTitle className="flex items-center">
                                    <FileText className="h-5 w-5 mr-2" />
                                    Course Notes
                                 </CardTitle>
                              </CardHeader>
                              <CardContent>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {currentLecture.pdfNotes && currentLecture?.pdfNotes.map((note) => (
                                       <div key={note._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                          <div className="flex items-center space-x-3">
                                             <FileText className="h-6 w-6 text-red-500" />
                                             <span className="font-medium">{note.title}</span>
                                          </div>
                                          <Button size="sm" variant="outline">
                                             <Download className="h-4 w-4 mr-1" />
                                             Download
                                          </Button>
                                       </div>
                                    ))}
                                 </div>
                              </CardContent>
                           </Card>
                        )}

                        {/* Navigation */}
                        <Card>
                           <CardContent className="p-6">
                              <div className="flex justify-between">
                                 <div>
                                    {previousLecture && (
                                       <Link href={`/courses/${courseId}/lecture/${previousLecture._id}`}>
                                          <Button variant="outline">
                                             <ChevronLeft className="h-4 w-4 mr-2" />
                                             {/* Previous: {previousLecture.title} */}
                                             Previous
                                          </Button>
                                       </Link>
                                    )}
                                 </div>
                                 <div>
                                    {nextLecture && (
                                       <Link href={`/courses/${courseId}/lecture/${nextLecture._id}`}>
                                          <Button>
                                             Next
                                             {/* Next: {nextLecture.title} */}
                                             <ChevronRight className="h-4 w-4 ml-2" />
                                          </Button>
                                       </Link>
                                    )}
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </div>

                  {/* Sidebar - Course Content */}
                  <div className="lg:col-span-2">
                     <Card className="sticky top-6">
                        <CardHeader>
                           <CardTitle className="text-lg">{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 max-h-[100vh] overflow-y-auto">
                           {/* Search */}
                           <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                 placeholder="Search lessons..."
                                 value={searchTerm}
                                 onChange={(e) => setSearchTerm(e.target.value)}
                                 className="pl-10"
                              />
                           </div>

                           {/* Module & Lectures List */}
                           <div className="space-y-2">
                              {filteredModules.map((module) => (
                                 <div key={module._id} className="border rounded-lg">
                                    <button
                                       onClick={() => toggleModule(module._id)}
                                       className="w-full p-3 text-left bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-colors"
                                    >
                                       <div className="flex items-center justify-between">
                                          <span className="font-medium text-sm">
                                             Module {module.moduleNumber}: {module.title}
                                          </span>
                                          <ChevronRight
                                             className={`h-4 w-4 transition-transform ${expandedModules.has(module._id) ? "rotate-90" : ""
                                                }`}
                                          />
                                       </div>
                                    </button>

                                    {expandedModules?.has(module._id) && (
                                       <div className="divide-y">
                                          {module.lectures.map((lecture) => {
                                             const lectureCompleted = isLessonCompleted(courseId, lecture._id as string);
                                             const isCurrent = lecture._id === lectureId;

                                             return (
                                                <Link
                                                   key={lecture._id}
                                                   href={`/courses/${courseId}/lecture/${lecture._id}`}
                                                   className={`block p-3 hover:bg-gray-50 transition-colors ${isCurrent ? "bg-blue-50 border-r-2 border-blue-500" : ""
                                                      }`}
                                                >
                                                   <div className="flex items-center space-x-2">
                                                      {lectureCompleted ? (
                                                         <CheckCircle className="h-4 w-4 text-green-500" />
                                                      ) : (
                                                         <PlayCircle className="h-4 w-4 text-gray-400" />
                                                      )}
                                                      <span
                                                         className={`text-sm ${isCurrent ? "font-medium text-blue-700" : "text-gray-700"}`}
                                                      >
                                                         {lecture.title}
                                                      </span>
                                                   </div>
                                                </Link>
                                             );
                                          })}
                                       </div>
                                    )}
                                 </div>
                              ))}
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
