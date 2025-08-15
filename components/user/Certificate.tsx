import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Award, Trophy } from 'lucide-react';

import MotionWraper from '../shared/MotionWraper';
import { Button } from '../ui/button';

const Certificate = () => {
   return (
      <MotionWraper
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.8 }}
      >
         <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardHeader>
               <CardTitle className="text-xl flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-600" /> Earn Your Certificate
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-center">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block mb-4">
                     <div className="w-48 h-32 bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center rounded border border-gray-200">
                        <div className="text-center">
                           <Award className="h-10 w-10 mx-auto text-yellow-500" />
                           <p className="text-xs font-medium mt-2">Certificate of Completion</p>
                        </div>
                     </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                     Complete this course to earn a certificate that you can share with your professional network.
                  </p>
                  <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                     View Sample Certificate
                  </Button>
               </div>
            </CardContent>
         </Card>
      </MotionWraper>
   );
};

export default Certificate;