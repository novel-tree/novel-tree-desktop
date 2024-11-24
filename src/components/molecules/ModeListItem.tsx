import React, { useMemo } from "react";
import classNames from "classnames";
import { Ban, ChartColumnStacked, ScrollText, Workflow } from "lucide-react";

interface ModeListItemProps {
  icon: string;
  name: string;
  description: string;
  onClick: () => void;
  selected: boolean;
  disabled?: boolean;
}

const size = 40;

function handleIconClass(selected: boolean, disabled?: boolean) {
  return classNames(
    selected ? "text-gray-500" : "text-gray-300",
    disabled ? "cursor-not-allowed" : "hover:text-gray-500",
  );
}

export const ModeListItem: React.FC<ModeListItemProps> = ({
  icon,
  name,
  description,
  onClick,
  selected,
  disabled = false,
}) => {
  const Icon = useMemo(() => {
    switch (icon) {
      case "script":
        return () => (
          <ScrollText
            className={handleIconClass(selected, disabled)}
            size={size}
          />
        );
      case "setting":
        return () => (
          <ChartColumnStacked
            className={handleIconClass(selected, disabled)}
            size={size}
          />
        );
      case "timeline":
        return () => (
          <Workflow
            className={handleIconClass(selected, disabled)}
            size={size}
          />
        );
      default:
        return () => <Ban className={handleIconClass(selected)} size={size} />;
    }
  }, [icon, selected]);
  return (
    <React.Fragment>
      <button
        onClick={onClick}
        className={classNames(
          "box-border border-l-4 p-1",
          selected ? "border-solid border-blue-500" : "border-transparent",
        )}
        disabled={disabled || undefined}
        title={`${name}${disabled ? " (Coming soon)" : ""}`}
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
