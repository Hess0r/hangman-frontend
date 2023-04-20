import React from "react";
import Button, { ButtonProps } from "./Button";

const PrimaryBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className={`rounded bg-sky-500 text-white text-sm uppercase hover:bg-sky-400 ${
        props.className ?? ""
      }`}
    >
      {children}
    </Button>
  );
};

export default PrimaryBtn;
