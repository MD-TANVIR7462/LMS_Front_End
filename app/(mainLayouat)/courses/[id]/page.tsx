import { getSingleData } from '@/server/serverAction';
import React from 'react';
import CourseDetail from './CourseDetails';



const UserCoursePage = async ({ params }: { params: any }) => {

  const courseId = params.id as string;
  const course = (await getSingleData('/course/get-course', courseId))?.data;


  return (
    <>
      {course && < CourseDetail course={course} />}
    </>
  );
};

export default UserCoursePage;