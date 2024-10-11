import React from "react";
import classNames from "classnames";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "code";
  color?: "primary" | "secondary" | "error";
  ellipsis?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  color,
  ellipsis,
}) => {
  const Tag = variant || "p";
  return (
    <Tag
      className={classNames(
        color === "primary" && "text-blue-500",
        color === "secondary" && "text-gray-800",
        color === "error" && "text-red-500",
        variant === "h1" && "text-4xl font-bold",
        variant === "h2" && "text-3xl font-bold",
        variant === "h3" && "text-2xl font-bold",
        variant === "h4" && "text-xl font-bold",
        variant === "h5" && "text-lg font-bold",
        variant === "h6" && "text-base font-bold",
        variant === "p" && "text-base",
        variant === "code" && "text-sm font-mono",
        ellipsis && "overflow-x-hidden text-ellipsis text-nowrap"
      )}
    >
      {children}
    </Tag>
  );
};
