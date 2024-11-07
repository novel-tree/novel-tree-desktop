import { FC } from "react";
import { Card } from "../CardContainer/Card";
import { CardHeader } from "../CardHeader/CardHeader";
import { CardContent } from "../CardContent/CardContent";
import { CardTitle } from "../CardTitle/CardTitle";
import { SettingItem } from "../../../types/settings";

interface SettingCardProps {
  item: SettingItem;
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
          onChange={() => {}}
        />
      </CardHeader>
      <CardContent
        description={item.description || ""}
        hasUnsavedChanges={hasUnsavedChanges}
        onChange={() => {}}
      />
    </Card>
  );
};
