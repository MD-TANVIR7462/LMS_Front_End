import {  getSingleData } from '@/server/serverAction';
import React from 'react';
import AdminCourseDetails from './AdminCourseDetails';


const AdminCoursePage = async ({params}:{params:any}) => {

  const courseId = params.id as string;
  const course = (await getSingleData('/course/get-course', courseId))?.data;
  console.log(course)

  return (
    <>
      <AdminCourseDetails course={course} />
    </>
  );
};

export default AdminCoursePage;