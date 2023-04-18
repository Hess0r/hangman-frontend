import React from "react";

const TextInput: React.FC<{
  type?: "text" | "password";
  name: string;
  className?: string;
}> = ({ type = "text", name, className }) => {
  return (
    <input
      type={type}
      className={`rounded w-full py-1.5 ${className ?? ""}`}
      name={name}
      id={name}
    />
  );
};

export default TextInput;
