import { FC } from "react";
import { Card } from "../CardContainer/Card";
import { CardHeader } from "../CardHeader/CardHeader";
import { CardContent } from "../CardContent/CardContent";
import { CardTitle } from "../CardTitle/CardTitle";
import { ISettingItem } from "../../../types/settings";

interface SettingCardProps {
  item: ISettingItem;
  hasUnsavedChanges: boolean;
}

export const SettingCard: FC<SettingCardProps> = ({
  item,
  hasUnsavedChanges,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          message={item.name}
          hasUnsavedChanges={hasUnsavedChanges}
          onChange={(text: string) => {
            console.warn("Card title on change not implemented", text);
          }}
        />
      </CardHeader>
      <CardContent
        description={item.description || ""}
        hasUnsavedChanges={hasUnsavedChanges}
        onChange={(text: string) => {
          console.warn("Card content on change not implemented", text);
        }}
      />
    </Card>
  );
};
