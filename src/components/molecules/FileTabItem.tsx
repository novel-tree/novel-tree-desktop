import classNames from "classnames";
import { EditorFile } from "../../states/fileEditor";
import { Typography } from "../atoms/Typography";

export function FileTabItem({ file }: { file: EditorFile }) {
  return (
    <div
      className={classNames(
        "flex h-full items-center gap-2",
        file.isFocused ? "bg-gray-300" : "bg-gray-200",
      )}
    >
      <div
        className={classNames(
          "flex h-fit min-w-28 max-w-fit items-center justify-center border-x border-solid",
        )}
      >
        <Typography variant="p" color="secondary" ellipsis>
          {file.name}
        </Typography>
        <button className="flex h-4 w-4 items-center justify-center">X</button>
      </div>
    </div>
  );
}
