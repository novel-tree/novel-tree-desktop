import { FileTabItem } from "../molecules/FileTabItem";
import { useAtomValue } from "jotai";
// import { editorFilesAtom } from "../../states/fileEditor";

export function FileTab() {
  // const files = useAtomValue(editorFilesAtom);
  return (
    <div className="inline-flex h-10 w-full min-w-full items-center justify-start overflow-x-scroll bg-gray-100">
      {/* {files.map((file, index) => (
        <FileTabItem file={file} key={index}></FileTabItem>
      ))} */}
    </div>
  );
}
