import React from "react";
import classNames from "classnames";
import { File, Folder } from "lucide-react";
import { Typography } from "../Typographies/Typography";

type icon = "folder" | "file";

interface IconButtonProps {
  icon: icon;
  fill?: "primary" | "secondary";
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  fill,
  disabled,
  onClick,
  children,
}) => {
  const iconColor = classNames(
    fill === "primary" && "text-blue-500",
    fill === "secondary" && "text-gray-800",
    disabled && "opacity-50 cursor-not-allowed",
  );
  function getIconComponent(icon: icon) {
    if (icon === "folder") {
      return <Folder className={iconColor} />;
    }
    if (icon === "file") {
      return <File className={iconColor} />;
    }
    return <File className={iconColor} />;
  }
  const Icon = getIconComponent(icon);
  return (
    <button
      onClick={onClick}
      className={classNames(
        fill === "primary"
          ? "text-blue-500"
          : fill === "secondary"
            ? "text-gray-800"
            : "text-gray-500",
        "flex w-full items-center gap-1 rounded-md px-2 py-0",
      )}
      disabled={disabled}
    >
      {Icon}
      <Typography variant="p" ellipsis>
        {children}
      </Typography>
    </button>
  );
};
// "flex items-center gap-2 px-2 py-1 rounded-md text-gray-400"
