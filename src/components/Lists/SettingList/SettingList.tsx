import { FC, useEffect } from "react";
import { Circle } from "lucide-react";
import { ListContainer } from "../ListContainer/ListContainer";
import { TextButton } from "../../Buttons";
import { ISettingItem } from "../../../types/settings";

interface CardHeaderProps {
  settings: ISettingItem[];
  onClickItem?: (id: string) => void;
}

export const SettingList: FC<CardHeaderProps> = (
  { settings, onClickItem } = {
    settings: [],
    onClickItem: () => {},
  },
) => {
  useEffect(() => {
    console.log("Settings loaded", settings, onClickItem);
  }, [settings, onClickItem]);
  return (
    <ListContainer listName="Setting List">
      {settings.map((item) => (
        <TextButton
          key={item.id}
          onClick={() => onClickItem?.(item.id)}
          style={{ paddingRight: "32px" }}
        >
          {item.name}
          {item.hasUnsavedChanges && (
            <Circle className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-yellow-500" />
          )}
        </TextButton>
      ))}
    </ListContainer>
  );
};
