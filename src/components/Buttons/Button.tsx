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
        "rounded-md px-4 py-2",
        variant === "primary" && "bg-blue-500 text-white",
        variant === "secondary" && "bg-gray-300 text-gray-800",
        variant === "error" && "bg-red-500 text-white",
        disabled && "cursor-not-allowed opacity-50",
        fullWidth ? "w-full" : "w-fit",
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
