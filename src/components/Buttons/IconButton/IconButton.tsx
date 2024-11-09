import { FC, HTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  text: string;
}

export const IconButton: FC<IconButtonProps> = ({ text, icon, ...props }) => {
  return (
    <button
      {...props}
      onClick={props?.onClick}
      className="inline-flex items-center gap-2 border p-2 rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      aria-label={text}
    >
      {icon}
    </button>
  );
};
