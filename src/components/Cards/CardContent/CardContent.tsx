import { FC } from "react";

interface CardContentProps {
  description: string;
  hasUnsavedChanges: boolean;
  onChange: () => void;
  placeholder?: string;
}

export const CardContent: FC<CardContentProps> = ({
  description,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-2 p-6">
      <textarea
        className="min-h-20 w-full rounded-md border p-2 text-sm outline-none resize-none"
        value={description}
        placeholder={placeholder ? placeholder : "Enter a description"}
        onChange={onChange}
      />
    </div>
  );
};
