import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register?: UseFormRegisterReturn<any>;
  type?: string;
  placeholder: string;
  className?: string;
  [props: string]: any;
}

export const Input: React.FC<Props> = ({
  type = "text",
  placeholder = "",
  className = "",
  register,
  ...props
}) => {
  className = `w-2/3 mx-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight ${className}`;
  return (
    <input
      type={type}
      {...(register || {})}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
};
