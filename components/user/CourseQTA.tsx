import React from 'react';
import MotionWraper from '../shared/MotionWraper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Award, BarChart2, Clock, Star, User } from 'lucide-react';
import { Badge } from '../ui/badge';

const CourseQTA = ({courseStats}:{courseStats:any}) => {
   
   return (
       <MotionWraper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                     >
                        <Card className="border-0 shadow-sm">
                           <CardHeader>
                              <CardTitle className="text-xl">Course Details</CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                 <span className="text-gray-600 flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-indigo-500" /> Duration
                                 </span>
                                 <span className="font-medium">{courseStats.duration}</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                 <span className="text-gray-600 flex items-center">
                                    <BarChart2 className="h-4 w-4 mr-2 text-indigo-500" /> Level
                                 </span>
                                 <Badge variant="outline" className="border-indigo-200 text-indigo-700">
                                    {courseStats.level}
                                 </Badge>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                 <span className="text-gray-600 flex items-center">
                                    <User className="h-4 w-4 mr-2 text-indigo-500" /> Students
                                 </span>
                                 <span className="font-medium">{courseStats.students.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                 <span className="text-gray-600 flex items-center">
                                    <Star className="h-4 w-4 mr-2 text-indigo-500" /> Rating
                                 </span>
                                 <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="font-medium">{courseStats.rating}</span>
                                    <span className="text-gray-500 text-sm ml-1">({courseStats.reviews})</span>
                                 </div>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                 <span className="text-gray-600 flex items-center">
                                    <Award className="h-4 w-4 mr-2 text-indigo-500" /> Certificate
                                 </span>
                                 <Badge variant={courseStats.certificate ? "default" : "outline"} className="bg-green-100 text-green-800">
                                    {courseStats.certificate ? "Included" : "Not Included"}
                                 </Badge>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                 <span className="text-gray-600">Last updated</span>
                                 <span className="font-medium">{courseStats.lastUpdated}</span>
                              </div>
                           </CardContent>
                        </Card>
                     </MotionWraper>
   );
};

export default CourseQTA;