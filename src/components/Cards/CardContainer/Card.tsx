import classNames from "classnames";
import { FC, HTMLAttributes, ReactNode } from "react";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className, ...props }) => {
  const classes = classNames(
    "rounded-lg bg-white text-gray-900 border shadow-lg",
    className
  );
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
