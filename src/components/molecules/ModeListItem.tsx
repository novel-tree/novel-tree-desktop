import React, { useMemo } from "react";
import classNames from "classnames";
import { Timeline, Script, Setting } from "../atoms/icons";

interface ModeListItemProps {
  icon: string;
  name: string;
  description: string;
  onClick: () => void;
  selected: boolean;
}

const size = 40;

export const ModeListItem: React.FC<ModeListItemProps> = ({
  icon,
  name,
  description,
  onClick,
  selected,
}) => {
  const Icon = useMemo(() => {
    switch (icon) {
      case "script":
        return () => (
          <Script
            className={classNames(selected ? "fill-gray-500" : "fill-gray-300")}
            size={size}
          />
        );
      case "setting":
        return () => (
          <Setting
            className={classNames(selected ? "fill-gray-500" : "fill-gray-300")}
            size={size}
          />
        );
      case "timeline":
        return () => (
          <Timeline
            className={classNames(selected ? "fill-gray-500" : "fill-gray-300")}
            size={size}
          />
        );
      default:
        return () => (
          <Script
            className={classNames(selected ? "fill-gray-500" : "fill-gray-300")}
            size={size}
          />
        );
    }
  }, [icon, selected]);
  return (
    <React.Fragment>
      <button
        onClick={onClick}
        className={classNames(
          "p-1 box-border border-l-4",
          selected ? "border-solid border-blue-500" : "border-transparent"
        )}
      >
        {<Icon />}
        <div className="sr-only">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </button>
    </React.Fragment>
  );
};
