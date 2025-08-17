import { getData } from '@/server/serverAction';
import React from 'react';
import UserCourses from './UserCourses';



const userCoursespage = async() => {
  const courses = (await getData('/course/get-courses'))?.data;

  return (
    <>
      <UserCourses courses={courses} />
    </>
  );
};

export default userCoursespage;