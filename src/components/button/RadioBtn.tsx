import React from "react";

const RadioBtn: React.FC<
  React.PropsWithChildren<{ selected: boolean; onClick: () => void }>
> = ({ selected, onClick, children }) => {
  return (
    <button
      type="button"
      className={`flex w-full justify-center items-center ${
        selected ? "bg-sky-500 text-white" : "shadow-md text-gray-500 hover:bg-sky-400 hover:text-white"
      } px-3 py-1.5 text-sm`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
};

export default RadioBtn;
