import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuid, validate } from "uuid";

interface DirectoryState {
  directoryId: string;
  directoryName: string;
  directoryPath: string;
  order: number;
}

const directoryInitialState: DirectoryState = {
  directoryId: "",
  directoryName: "",
  directoryPath: "",
  order: 0,
};

export const directoryAtom = atomWithStorage<DirectoryState>(
  "directory",
  directoryInitialState
);

// reducers
export const setDirectory = atom(
  null,
  (_, set, newDirectory: DirectoryState) => {
    set(directoryAtom, {
      directoryId: uuid(),
      directoryPath: newDirectory.directoryPath,
      directoryName: newDirectory.directoryName,
      order: 0,
    });
  }
);

// selectors
export const doesDirectoryExist = atom((get) => {
  return validate(get(directoryAtom).directoryId);
});
