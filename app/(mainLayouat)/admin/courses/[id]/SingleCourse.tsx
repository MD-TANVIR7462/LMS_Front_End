"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navigation } from "@/components/Navigation";
import { useCourses } from "@/contexts/CourseContext";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Play, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ModuleFormDialog } from "@/components/admin/ModuleFormDialog";
import { LectureFormDialog } from "@/components/admin/LectureFormDialog";
import { Module, Lecture, Course } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ConfirmAndDelete } from "@/components/shared/ConfirmAndDelete";
export default function AdminCourseDetails({ course }: { course: Course }) {
  console.log(course);
  const params = useParams();
  const courseId = params.id as string;
  const router = useRouter();
  const { courses, deleteModule, deleteLecture } = useCourses();
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [isLectureDialogOpen, setIsLectureDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLecture, setEditingLecture] = useState<{ lecture: Lecture; moduleId: string } | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");

console.log(editingLecture,"Edit" , course)

  if (!course) {
    return (
      <ProtectedRoute requiredRole="admin">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
            <p className="text-gray-600 mt-2">The course you're looking for doesn't exist.</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  const handleDeleteModule = (id: string) => {
    ConfirmAndDelete(id, "module/delete-module", router);
  };

  const handleDeleteLecture = (lectureId: string) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      deleteLecture(lectureId);
    }
  };

  const handleAddLecture = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setIsLectureDialogOpen(true);
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden max-h-[300px]">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img src={course.thumbnail} alt={course.title} className="w-full h-64 md:h-full object-cover" />
              </div>
              <div className="md:w-2/3 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-green-600">${course.price}</span>
                  <div className="text-sm text-gray-500">
                    {course.modules.length} modules •{" "}
                    {course.modules.reduce((acc, module) => acc + module.lectures.length, 0)} lectures
                  </div>
                </div>
              </div>
            </div>
          </div>

          {course.modules.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-8">
              <Button onClick={() => setIsModuleDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>
          )}

          {/* Modules & Lectures */}
          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {course?.modules.map((module, index) => (
                <AccordionItem value={`item-${index}`} className="my-3">
                  <div key={module._id}>
                    <AccordionTrigger
                      className={`shadow-sm backdrop-blur-lg p-4 rounded-sm flex ${
                        module.lectures.length > 0 && "hover:underline"
                      }`}
                    >
                      <div>
                        Module e.g {module.moduleNumber}: {module.title}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(), handleAddLecture(module._id);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Lecture
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation(), setEditingModule(module);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation(), handleDeleteModule(module?._id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
                      </div>
                    </AccordionTrigger>

                    <div>
                      {module?.lectures?.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No lectures yet. Add your first lecture!</p>
                        </div>
                      ) : (
                        <AccordionContent className="flex flex-col gap-4 text-balance ">
                          <div className="space-y-3 ">
                            {module?.lectures?.map((lecture, index) => (
                              <div
                                key={lecture._id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg "
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">{lecture.title}</h4>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                      <span className="flex items-center">
                                        <Play className="h-3 w-3 mr-1" />
                                        Video
                                      </span>
                                      <span className="flex items-center">
                                        <FileText className="h-3 w-3 mr-1" />
                                        {lecture?.pdfNotes && lecture?.pdfNotes.length} notes
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingLecture({ lecture, moduleId: module._id })}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleDeleteLecture(lecture?._id as string)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      )}
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
            {course.modules.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Plus className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No modules yet</h3>
                <p className="text-gray-600 mb-4">Start building your course by adding modules</p>
                <Button onClick={() => setIsModuleDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </div>
            )}
          </div>

          {/* Module Form Dialog */}
          <ModuleFormDialog
            open={isModuleDialogOpen || !!editingModule}
            onOpenChange={(open) => {
              if (!open) {
                setIsModuleDialogOpen(false);
                setEditingModule(null);
              }
            }}
            courseId={courseId}
            module={editingModule}
          />

          {/* Lecture Form Dialog */}
          <LectureFormDialog
            open={isLectureDialogOpen || !!editingLecture}
            onOpenChange={(open) => {
              if (!open) {
                setIsLectureDialogOpen(false);
                setEditingLecture(null);
                setSelectedModuleId("");
              }
            }}
            moduleId={editingLecture?.moduleId || selectedModuleId}
            lecture={editingLecture?.lecture}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
