import React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "password" | "email";
  name: string;
};
const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  name,
  ...props
}) => {
  return (
    <input
      {...props}
      type={type}
      className={`rounded border-gray-200 w-full ${props.className ?? ""}`}
      name={name}
      id={name}
    />
  );
};

export default TextInput;
