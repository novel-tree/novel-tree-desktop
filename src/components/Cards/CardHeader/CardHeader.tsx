import { FC, ReactNode } from "react";

interface CardHeaderProps {
  children: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ children }) => {
  return <div className="flex flex-col space-y-2 p-6">{children}</div>;
};
