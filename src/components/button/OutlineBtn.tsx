import React from "react";
import Button, { type ButtonProps } from "./Button";

const OutlineBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className={`rounded border border-sky-500 text-sm text-sky-500 uppercase hover:border-sky-400 ${
        props.className ?? ""
      }`}
    >
      {children}
    </Button>
  );
};

export default OutlineBtn;
