import React from "react";

interface Props {
  className?: string;
  children: JSX.Element | string;
  handleClick?: () => Promise<void> | void;
}

export const Button: React.FC<Props> = ({
  handleClick,
  className = "",
  children,
}) => {
  className = `text-white py-2 px-3 rounded bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 ${className}`;
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
