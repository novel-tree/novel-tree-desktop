import { createStore } from "jotai";
import { editorFilesAtom, editorFileOrderAtom } from "./fileEditor";
import { filesAtom, folderAtom } from "./directory";

export const store = createStore();
