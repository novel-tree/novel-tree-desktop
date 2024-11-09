import { FC, HTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  text: ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({ text, icon, ...props }) => {
  return (
    <button
      {...props}
      onClick={props?.onClick}
      className="inline-flex h-10 w-full items-center justify-start gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
};
