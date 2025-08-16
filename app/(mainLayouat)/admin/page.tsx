import { getData } from "@/server/serverAction";
import React from "react";
import AdminDashboard from "./dashboardIndex";

const AdminDashboardPage = async () => {
  const courses = await getData("/course/get-courses");

  return courses && <AdminDashboard courses={courses?.data} length={courses.total} />;
};

export default AdminDashboardPage;
