import { FC, ReactNode } from "react";

interface ContentHeaderBarProps {
  children: ReactNode;
}

export const ContentHeaderBar: FC<ContentHeaderBarProps> = ({
  children,
}: ContentHeaderBarProps) => {
  return (
    <div className="flex items-center justify-between border-b p-4">
      {children}
    </div>
  );
};
