import {  getSingleData } from '@/server/serverAction';
import React from 'react';
import AdminCourseDetails from './SingleCourse';


const AdminCoursePage = async ({params}:{params:any}) => {

  const courseId = params.id as string;
  console.log(params)
  const course = (await getSingleData('/course/get-course', courseId))?.data;
  console.log(course);

  return (
    <>
      <AdminCourseDetails course={course} />
    </>
  );
};

export default AdminCoursePage;