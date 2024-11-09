import { ChangeEvent, FC, useState } from "react";
import { Circle } from "lucide-react";
import classNames from "classnames";

interface CardTitleProps {
  hasUnsavedChanges: boolean;
  message: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

function titleClassNames(isEditing: boolean) {
  return classNames(
    "flex items-center justify-start w-full border-b -m-[1px]",
    isEditing ? "border-gray-100" : "border-transparent",
  );
}

export const CardTitle: FC<CardTitleProps> = ({
  hasUnsavedChanges,
  message,
  onChange,
  placeholder,
}) => {
  const [isEditing, setIsFocused] = useState(false);
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  return (
    <div className={titleClassNames(isEditing)}>
      <input
        className="flex-grow text-2xl font-semibold leading-none outline-none"
        type="text"
        value={message}
        onChange={handleOnChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder ? placeholder : "Enter a title"}
      />
      {hasUnsavedChanges && <Circle className="ml-2 h-4 w-4 text-yellow-500" />}
    </div>
  );
};
