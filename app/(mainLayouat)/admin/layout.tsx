import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/shared/Sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute requiredRole="admin">
      <Sidebar />
      {children}
    </ProtectedRoute>
  );
};

export default layout;
