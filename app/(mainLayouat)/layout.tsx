import { Sidebar } from "@/components/shared/Sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
       {children}
    </div>
  );
};

export default layout;
