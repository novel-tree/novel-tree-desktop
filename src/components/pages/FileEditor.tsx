import { useAtom } from "jotai";
import { filesAtom, fileOrderAtom } from "../../states/directory";
import { DefaultPage } from "../templates/DefaultPage";
import { FileTab } from "../organisms/FileTab";

export function FileEditor() {
  return (
    <div className="w-full">
      <FileTab />
      <DefaultPage />
    </div>
  );
}
