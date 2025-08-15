
import { Navigation } from "@/components/Navigation";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
   return (
      <div>
         <Navigation />
         {children}
      </div>
   );
};

export default layout;