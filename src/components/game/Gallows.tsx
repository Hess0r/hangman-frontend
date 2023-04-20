import React from "react";

const Gallows: React.FC<{ className: string; errorCount: number }> = ({
  className,
  errorCount,
}) => {
  return (
    <svg
      stroke="#707070"
      strokeWidth={0.1}
      strokeLinecap="round"
      fill="none"
      viewBox="0 0 10 12"
      className={className}
    >
      <path d="M1,11 h8" />
      <path d="M9,11 v-10" />
      <path d="M9,1 h-4" />
      <path d="M5,1 v2" />
      {errorCount < 6 && <circle cx="5" cy="4" r="1" />}
      {errorCount < 5 && <path d="M5,5 v3" />}
      {errorCount < 4 && <path d="M5,5 l-2,2" />}
      {errorCount < 3 && <path d="M5,5 l2,2" />}
      {errorCount < 2 && <path d="M5,8 l-2,2" />}
      {errorCount < 1 && <path d="M5,8 l2,2" />}
    </svg>
  );
};

export default Gallows;
