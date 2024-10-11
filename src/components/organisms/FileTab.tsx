import { FileTabItem } from "../molecules/FileTabItem";
import { useAtomValue } from "jotai";
// import { editorFilesAtom } from "../../states/fileEditor";

export function FileTab() {
  // const files = useAtomValue(editorFilesAtom);
  return (
    <div className="w-full inline-flex items-center justify-start overflow-x-scroll h-10 bg-gray-100 min-w-full">
      {/* {files.map((file, index) => (
        <FileTabItem file={file} key={index}></FileTabItem>
      ))} */}
    </div>
  );
}
