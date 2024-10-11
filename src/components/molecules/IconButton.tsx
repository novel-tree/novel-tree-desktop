import React from "react";
import classNames from "classnames";
import { File, Folder } from "../atoms/icons";
import { Typography } from "../atoms/Typography";

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
    fill === "primary" && "fill-blue-500",
    fill === "secondary" && "fill-gray-800",
    disabled && "opacity-50 cursor-not-allowed"
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
        "flex items-center gap-1 px-2 py-0 rounded-md w-full"
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
