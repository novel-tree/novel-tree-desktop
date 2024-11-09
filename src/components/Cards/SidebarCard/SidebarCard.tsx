import { FC, ReactNode } from "react";
import { Card } from "../CardContainer/Card";

interface SidebarCardProps {
  title: string;
  icon: ReactNode;
  description: string;
}

export const SidebarCard: FC<SidebarCardProps> = ({
  title,
  icon,
  description,
}) => (
  <Card>
    <div className="flex gap-2 p-2">
      <div>{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </Card>
);
