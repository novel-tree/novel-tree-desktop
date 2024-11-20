import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface TextButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function handleClasses(className = ""): string {
  const defaultClasses = classNames(
    "relative flex w-full items-center justify-between p-2 hover:bg-gray-200",
  );
  return classNames(defaultClasses, className);
}

export const TextButton: FC<TextButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} role="button" className={handleClasses(props.className)}>
      {children}
    </button>
  );
};
