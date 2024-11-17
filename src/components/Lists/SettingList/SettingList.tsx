import { FC } from "react";
import { Circle } from "lucide-react";
import classNames from "classnames";
import { ListContainer } from "../ListContainer/ListContainer";
import { TextButton } from "../../Buttons";
import {
  CharacterList,
  LocationList,
  EventList,
  ItemList,
  Setting,
} from "../../../states/settings";

interface CardHeaderProps {
  settings: CharacterList | LocationList | EventList | ItemList;
  selectedSettingId?: string;
  onItemSelected: (item: Setting) => void;
}

export const SettingList: FC<CardHeaderProps> = ({
  settings,
  selectedSettingId,
  onItemSelected,
}) => {
  return (
    <ListContainer listName="Setting List">
      {settings.map((item) => (
        <TextButton
          key={item.id}
          onClick={() => onItemSelected(item)}
          style={{ paddingRight: "32px" }}
          className={classNames(
            "hover:bg-gray-200",
            selectedSettingId === item.id && "bg-gray-200 hover:bg-gray-300",
          )}
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
