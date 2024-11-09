import { FC, ReactNode } from "react";

interface ContentHeaderBarProps {
  children: ReactNode;
}

export const ContentHeaderBar: FC<ContentHeaderBarProps> = ({
  children,
}: ContentHeaderBarProps) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      {children}
    </div>
  );
};
