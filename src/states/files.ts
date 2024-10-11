import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuid } from "uuid";

export interface FileState {
  fileId: string;
  directoryId: string;
  fileName: string;
  filePath: string;
  fileType: string;
  isEdited: boolean;
  isFocused: boolean;
  editorOrder: number;
  openedAt: number;
  lastSavedAt: number;
}

const filesInitialState: FileState[] = [];

export const filesAtom = atomWithStorage<FileState[]>(
  "files",
  filesInitialState
);

// reducers
export const addFile = atom(
  null,
  (
    get,
    set,
    newFile: {
      directoryId: string;
      fileName: string;
      filePath: string;
      fileType: string;
    }
  ) => {
    const files = get(filesAtom);
    set(filesAtom, [
      ...files,
      {
        fileId: uuid(),
        directoryId: newFile.directoryId,
        fileName: newFile.fileName,
        filePath: newFile.filePath,
        fileType: newFile.fileType,
        editorOrder: files.length,
        isEdited: false,
        isFocused: false,
        openedAt: Date.now(),
        lastSavedAt: Date.now(),
      },
    ]);
    set(filesAtom, sortFiles(get(filesAtom)));
  }
);

export const focusFile = atom(null, (get, set, fileId: string) => {
  const files = get(filesAtom);
  const file = files.find((file) => file.fileId === fileId);
  if (file) {
    set(filesAtom, [
      ...files.filter((file) => file.fileId !== fileId),
      { ...file, isFocused: true },
    ]);
    set(filesAtom, sortFiles(get(filesAtom)));
  }
});

// utils
export function sortFiles(files: FileState[]): FileState[] {
  if (files.length === 0) return [];
  if (files.length === files[0].editorOrder) return files;
  return files.sort((a, b) => a.editorOrder - b.editorOrder);
}
