"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from "@/components/ui/table";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle
} from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, BookOpen, Eye } from "lucide-react";
import Link from "next/link";
import { Course, TCreateCourse } from "@/types";
import { createData, updateData } from "@/server/serverAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CourseFormDialog } from "@/components/admin/CourseFormDialog";
import { ConfirmAndDelete } from "@/components/shared/ConfirmAndDelete";

export default function CourseIndex({ courses }: { courses: Course[] }) {
   const router = useRouter();
   const [searchTerm, setSearchTerm] = useState("");
   const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
   const [editingCourse, setEditingCourse] = useState<Course | null>(null);

   const filteredCourses = courses?.filter(
      (course) =>
         course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         course.description.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const handleCreate = async (data: TCreateCourse) => {
      try {
         const res = await createData("course/create-course", data);
         if (res?.success) {
            toast.success("Course created successfully");
         } else {
            toast.error(res?.message || "Unable to create course.");
         }
      } catch (error: any) {
         toast.error(error.message || "Unexpected error occurred.");
      } finally {
         setIsCreateDialogOpen(false);
         setEditingCourse(null);
         router.refresh();
      }
   };

   const handleEdit = async (data: Partial<Course>) => {
      if (!editingCourse) {
         toast.warning("No Course selected for editing.");
         return;
      }
      try {
         const res = await updateData(
            "course/update-course",
            editingCourse._id as string,
            data,
            ""
         );
         if (res?.success) {
            toast.success("Course updated successfully.");
         } else {
            toast.error(res?.message || "Unable to update Course.");
         }
      } catch (error: any) {
         toast.error(error.message || "Unexpected error occurred.");
      } finally {
         setIsCreateDialogOpen(false);
         setEditingCourse(null);
         router.refresh();
      }
   };

   const handleDelete = (id: string) => {
      ConfirmAndDelete(id, "course/delete-course", router)
   };

   return (
      <ProtectedRoute requiredRole="admin">
         <div className="min-h-screen bg-gray-50">
           
            <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
               {/* Header */}
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">
                        Course Management
                     </h1>
                     <p className="text-gray-600 mt-2">
                        Create and manage your courses
                     </p>
                  </div>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                     <Plus className="h-4 w-4 mr-2" />
                     Create Course
                  </Button>
               </div>

               {/* Search */}
               <div className="mb-4 max-w-md ms-auto w-full">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                     <Input
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                     />
                  </div>
               </div>

               {filteredCourses?.length ? (
                  <div className="space-y-4">
                     {/* Mobile Card View */}
                     <div className="lg:hidden space-y-4">
                        {filteredCourses.map((course) => (
                           <Card
                              key={course._id}
                              onClick={() => router.push(`/admin/courses/${course._id}`)}
                              className="cursor-pointer"
                           >
                              <CardHeader className="pb-2">
                                 <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{course.title}</CardTitle>
                                    <Badge variant="secondary">
                                       {course.modules.length} Modules
                                    </Badge>
                                 </div>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                 <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-40 object-cover rounded"
                                 />
                                 <p className="text-sm text-muted-foreground line-clamp-3">
                                    {course.description}
                                 </p>
                                 <div className="flex justify-between items-center">
                                    <span className="font-bold text-green-600">
                                       ${course.price}
                                    </span>
                                    <div className="flex gap-2">
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             setEditingCourse(course);
                                          }}
                                       >
                                          <Edit className="h-4 w-4" />
                                       </Button>
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             handleDelete(course?._id);
                                          }}
                                          className="text-destructive hover:text-destructive"
                                       >
                                          <Trash2 className="h-4 w-4" />
                                       </Button>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        ))}
                     </div>

                     {/* Desktop Table View */}
                     <Card className="hidden lg:block">
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Thumbnail</TableHead>
                                 <TableHead>Title</TableHead>
                                 <TableHead>Description</TableHead>
                                 <TableHead>Price</TableHead>
                                 <TableHead>Modules</TableHead>
                                 <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {filteredCourses.map((course) => (
                                 <TableRow
                                    key={course._id}
                                    onClick={() =>
                                       router.push(`/admin/courses/${course._id}`)
                                    }
                                    className="cursor-pointer"
                                 >
                                    <TableCell>
                                       <img
                                          src={course.thumbnail}
                                          alt={course.title}
                                          className="w-16 h-16 object-cover rounded"
                                       />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                       {course.title}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                       {course.description}
                                    </TableCell>
                                    <TableCell>${course.price}</TableCell>
                                    <TableCell>{course.modules.length}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                       <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             router.push(`/admin/courses/${course._id}`);
                                          }}
                                       >
                                          <Eye className="h-4 w-4" />
                                       </Button>
                                       <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             setEditingCourse(course);
                                          }}
                                       >
                                          <Edit className="h-4 w-4" />
                                       </Button>
                                       <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             handleDelete(course?._id);
                                          }}
                                          className="text-destructive hover:text-destructive"
                                       >
                                          <Trash2 className="h-4 w-4" />
                                       </Button>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </Card>
                  </div>
               ) : (
                  <div className="text-center py-12">
                     <div className="text-gray-400 mb-4">
                        <BookOpen className="h-12 w-12 mx-auto" />
                     </div>
                     <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No courses found
                     </h3>
                     <p className="text-gray-600 mb-4">
                        {searchTerm
                           ? "Try adjusting your search terms"
                           : "Get started by creating your first course"}
                     </p>
                     {!searchTerm && (
                        <Button onClick={() => setIsCreateDialogOpen(true)}>
                           <Plus className="h-4 w-4 mr-2" />
                           Create Course
                        </Button>
                     )}
                  </div>
               )}

               {/* Create/Edit Course Dialog */}
               <CourseFormDialog
                  open={isCreateDialogOpen || !!editingCourse}
                  onOpenChange={(open) => {
                     if (!open) {
                        setIsCreateDialogOpen(false);
                        setEditingCourse(null);
                     }
                  }}
                  addCourse={editingCourse ? handleEdit : handleCreate}
                  course={editingCourse}
               />
            </div>
         </div>
      </ProtectedRoute>
   );
}
