import { FC } from "react";

interface ModalHeaderProps {
  title: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title }) => {
  return <h2 className="text-lg font-semibold"> {title}</h2>;
};
