import React from "react";

const TextInput: React.FC<{
  type?: "text" | "password" | "email";
  name: string;
  className?: string;
}> = ({ type = "text", name, className }) => {
  return (
    <input
      type={type}
      className={`rounded border-gray-200 w-full ${className ?? ""}`}
      name={name}
      id={name}
    />
  );
};

export default TextInput;
