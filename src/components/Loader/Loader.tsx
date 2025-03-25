import React from "react";

const Loader = () => {
  return (
    <div className="relative mx-auto w-12 h-12">
      <div className="absolute top-[60px] left-0 w-12 h-[5px] bg-red-300/50 rounded-full animate-shadow"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-red-400 rounded-md animate-jump"></div>
    </div>
  );
};

export default Loader;
