import { getData } from '@/server/serverAction';
import React from 'react';
import CourseIndex from './CourseIndex';

const AdminCoursePage = async() => {
  const courses = (await getData('/course/get-courses'))?.data;
  console.log(courses);
  return (
    <>
      <CourseIndex courses={courses} />
    </>
  );
};

export default AdminCoursePage;