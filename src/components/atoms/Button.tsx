import React from "react";
import classNames from "classnames";
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "error";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  disabled,
  fullWidth,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-4 py-2 rounded-md",
        variant === "primary" && "bg-blue-500 text-white",
        variant === "secondary" && "bg-gray-300 text-gray-800",
        variant === "error" && "bg-red-500 text-white",
        disabled && "opacity-50 cursor-not-allowed",
        fullWidth ? "w-full" : "w-fit"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
