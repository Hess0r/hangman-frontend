import React from "react";
import Button from "./Button";

const RadioBtn: React.FC<
  React.PropsWithChildren<{ selected: boolean; onClick: () => void }>
> = ({ selected, onClick, children }) => {
  return (
    <Button
      type="button"
      className={`text-sm ${
        selected
          ? "bg-sky-500 text-white"
          : "shadow-md text-gray-500 hover:bg-sky-400 hover:text-white"
      }`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </Button>
  );
};

export default RadioBtn;
