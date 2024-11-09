import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { directoryAtom } from "../../states/directory";
import { addFile as addFileAtom } from "../../states/files";

interface OpenDirectoryDialogResponse {
  files: string[];
  path: string;
}

export const Home: React.FC = () => {
  const currentDirectory = useAtomValue(directoryAtom);
  const addFile = useSetAtom(addFileAtom);
  function getLastDirectory(fullPath: string) {
    return fullPath.split("/").pop();
  }
  function getFileExtension(fullPath: string) {
    return getLastDirectory(fullPath)?.split(".").pop();
  }
  function openDirectoryDialog() {
    window.ipcRenderer
      .invoke("open-directory-dialog")
      .then((result: OpenDirectoryDialogResponse) => {
        result.files.forEach((file) => {
          addFile({
            directoryId: currentDirectory.directoryId,
            fileName: getLastDirectory(file) || file,
            filePath: file,
            fileType: getFileExtension(file) || "",
          });
        });
      });
  }
  return (
    <React.Fragment>
      <div className="flex h-screen flex-col items-center justify-center">
        <button onClick={openDirectoryDialog} className="text-blue-500">
          Open Directory Dialog
        </button>
      </div>
    </React.Fragment>
  );
};
