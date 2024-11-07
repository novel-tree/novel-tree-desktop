import { FC } from "react";

interface ListContainerProps {
  children: React.ReactNode;
  width?: number;
}

const DEFAULT_WIDTH = 80;

export const ListContainer: FC<ListContainerProps> = ({ children, width }) => {
  return (
    <div
      className="flex flex-col"
      style={{ minWidth: width ? `${width}px` : `${DEFAULT_WIDTH}px` }}
    >
      {children}
    </div>
  );
};
