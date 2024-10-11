import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuid } from "uuid";

interface FileChange {
  changeId: string;
  fileId: string;
  changeType: "added" | "modified" | "deleted";
  contentSnapshot: string;
  changedAt: number;
}

const fileChangesInitialState: FileChange[] = [];

export const fileChangesAtom = atomWithStorage<FileChange[]>(
  "fileChanges",
  fileChangesInitialState
);

// reducers
export const addFileChange = atom(null, (get, set, newFileChange: any) => {
  set(fileChangesAtom, [
    ...get(fileChangesAtom),
    {
      changeId: uuid(),
      fileId: newFileChange.fileId,
      changeType: newFileChange.changeType,
      contentSnapshot: newFileChange.contentSnapshot,
      changedAt: Date.now(),
    },
  ]);
});

// selectors
// export const getTheMostRecentAddedFileChange = atom((get) => {
//   const fileChanges = get(fileChangesAtom);
//   const addedFileChanges = fileChanges.filter((fileChange) => fileChange.changeType === "added");
//   return addedFileChanges.reduce((prev, current) => (prev.changedAt > current.changedAt ? prev : current), {});
// }
