import { getSingleData } from '@/server/serverAction';
import React from 'react';
import LectureIndex from './LectureIndex';




const LecturPage = async ({ params }: { params: any }) => {

  const courseId = params.id as string;
  const course = (await getSingleData('/course/get-course', courseId))?.data;


  return (
    <>
      {course && < LectureIndex course={course} />}
    </>
  );
};

export default LecturPage;