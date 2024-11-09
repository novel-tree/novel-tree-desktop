import { FC, HTMLAttributes, ReactNode } from "react";

interface IconTextButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  text: ReactNode;
}

export const IconTextButton: FC<IconTextButtonProps> = ({
  text,
  icon,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={props?.onClick}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full justify-start"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
};
