import { FC, ReactNode } from "react";

interface ContentAreaProps {
  children: ReactNode;
}

export const ContentArea: FC<ContentAreaProps> = ({ children }) => {
  return <div className="flex h-screen w-full bg-white">{children}</div>;
};
