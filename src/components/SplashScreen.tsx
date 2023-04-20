import React from "react";
import Spinner from "./Spinner";

const SplashScreen: React.FC<{}> = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner className="!w-8 !h-8" />
    </div>
  );
};

export default SplashScreen;
