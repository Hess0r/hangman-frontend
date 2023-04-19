import React from "react";

const OutlineBtn: React.FC<
  React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="flex justify-center items-center rounded border border-sky-500 px-3 py-2 text-sky-500 uppercase hover:border-sky-400 text-sm"
    >
      {children}
    </button>
  );
};

export default OutlineBtn;
