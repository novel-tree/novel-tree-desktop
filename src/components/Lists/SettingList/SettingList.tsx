import { FC, useEffect } from "react";
import { Circle } from "lucide-react";
import { ListContainer } from "../ListContainer/ListContainer";
import { TextButton } from "../../Buttons";
import { SettingItem } from "../../../types/settings";

interface CardHeaderProps {
  settings: SettingItem[];
  onClickItem?: (id: string) => void;
}

export const SettingList: FC<CardHeaderProps> = ({ settings, onClickItem }) => {
  useEffect(() => {
    console.log("Settings loaded", settings, onClickItem);
  }, []);
  return (
    <ListContainer>
      {settings.map((item) => (
        <TextButton
          key={item.id}
          onClick={() => onClickItem?.(item.id)}
          style={{ paddingRight: "32px" }}
        >
          {item.name}
          {item.hasUnsavedChanges && (
            <Circle className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-500" />
          )}
        </TextButton>
      ))}
    </ListContainer>
  );
};
