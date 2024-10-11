import React from "react";
import classNames from "classnames";
interface ScriptProps {
  className?: string;
  size?: number;
}

export const Script: React.FC<ScriptProps> = ({ className, size }) => {
  return (
    <svg
      className={classNames(className, "min-w-4 min-h-4")}
      xmlns="http://www.w3.org/2000/svg"
      height={size ? `${size}px` : "16px"}
      viewBox="0 -960 960 960"
      width={size ? `${size}px` : "16px"}
      fill="#9ca3af"
    >
      <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
    </svg>
  );
};
