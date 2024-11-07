import { FC } from "react";

interface ListContainerProps {
  children: React.ReactNode;
  width?: number;
  listName?: string;
}

const DEFAULT_WIDTH = 80;

export const ListContainer: FC<ListContainerProps> = ({
  children,
  width,
  listName,
}) => {
  return (
    <div
      className={`flex flex-col min-w-[${width || DEFAULT_WIDTH}px]`}
      role="list"
      aria-label={listName}
    >
      {children}
    </div>
  );
};
