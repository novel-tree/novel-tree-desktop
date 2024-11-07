import { FC, ReactNode } from "react";
interface CardProps {
  children: ReactNode;
}

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className="rounded-lg bg-white text-gray-900 border shadow-lg">
      {children}
    </div>
  );
};
