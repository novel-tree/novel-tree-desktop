import classNames from "classnames";
import { EditorFile } from "../../states/fileEditor";
import { Typography } from "../atoms/Typography";

export function FileTabItem({ file }: { file: EditorFile }) {
  return (
    <div
      className={classNames(
        "flex gap-2 items-center h-full",
        file.isFocused ? "bg-gray-300" : "bg-gray-200"
      )}
    >
      <div
        className={classNames(
          "min-w-28 max-w-fit flex items-center justify-center border-x border-solid h-fit"
        )}
      >
        <Typography variant="p" color="secondary" ellipsis>
          {file.name}
        </Typography>
        <button className="w-4 h-4 flex items-center justify-center">X</button>
      </div>
    </div>
  );
}
