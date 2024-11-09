import { ChangeEvent, FC } from "react";

interface CardContentProps {
  description: string;
  hasUnsavedChanges: boolean;
  onChange: (text: string) => void;
  placeholder?: string;
}

export const CardContent: FC<CardContentProps> = ({
  description,
  onChange,
  placeholder,
}) => {
  function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }
  return (
    <div className="flex flex-col space-y-2 p-6">
      <textarea
        className="min-h-20 w-full resize-none rounded-md border p-2 text-sm outline-none"
        value={description}
        placeholder={placeholder || "Enter a description"}
        onChange={handleOnChange}
      />
    </div>
  );
};
