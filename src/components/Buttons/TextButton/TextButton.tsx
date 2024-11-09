import { FC, HTMLAttributes, ReactNode } from "react";

interface TextButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const TextButton: FC<TextButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      role="button"
      className="relative flex w-full items-center justify-between p-2 hover:bg-gray-200"
    >
      {children}
    </button>
  );
};
