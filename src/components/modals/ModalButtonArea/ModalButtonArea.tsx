import { FC, ReactNode } from "react";

interface ModalButtonAreaProps {
  children: ReactNode;
  direction: "row" | "col";
  align: "start" | "center" | "end";
}

export const ModalButtonArea: FC<ModalButtonAreaProps> = ({
  children,
  direction,
  align,
}) => {
  return (
    <div
      className={`flex flex-${direction} justify-${align} mt-4 w-full gap-4`}
    >
      {children}
    </div>
  );
};
