import React from "react";
import Spinner from "../Spinner";

export type ButtonProps = {
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<
  React.PropsWithChildren<
    ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
  >
> = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      className={`flex gap-2 justify-center items-center px-4 py-2 select-none disabled:cursor-not-allowed disabled:opacity-40 ${
        props.className ?? ""
      }`}
    >
      {loading && <Spinner className="animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
