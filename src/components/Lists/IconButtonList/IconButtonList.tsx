import { FC, ReactNode } from "react";
import { IconTextButton } from "../../Buttons";

export interface iIconButton {
  id: string;
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

interface IconButtonListProps {
  title?: string;
  listName?: string;
  IconButtons: iIconButton[];
}

export const IconButtonList: FC<IconButtonListProps> = ({
  title,
  listName,
  IconButtons,
}) => {
  return (
    <div className="flex w-auto flex-col border-r bg-gray-100 p-4">
      {title && <h1 className="mb-4 text-2xl font-bold">{title}</h1>}
      <ul className="flex flex-col" aria-label={listName}>
        {IconButtons.map((item) => (
          <li key={item.id}>
            <IconTextButton
              text={item.text}
              icon={item.icon}
              onClick={item.onClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
