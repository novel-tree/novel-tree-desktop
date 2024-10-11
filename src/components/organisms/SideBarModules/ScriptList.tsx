import { useAtomValue } from "jotai";
import { IconButton } from "../../molecules/IconButton";
import { filesAtom } from "../../../states/files";

export const ScriptList = () => {
  const files = useAtomValue(filesAtom);
  function handleFileClick() {
    console.log("File clicked");
  }

  return (
    <div className="flex flex-col gap-0">
      {files.map((file) => (
        <IconButton
          key={file.fileId}
          fill="secondary"
          icon="file"
          onClick={handleFileClick}
        >
          {file.fileName}
        </IconButton>
      ))}
    </div>
  );
};
