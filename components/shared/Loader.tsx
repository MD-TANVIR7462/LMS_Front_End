import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center text-white">
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
    </div>
  );
};

export default Loader;
