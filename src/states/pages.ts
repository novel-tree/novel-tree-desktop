import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface Page {
  id: string;
  title: string;
  state?: string;
}

interface PageState {
  [key: string]: Page;
}

export const pages: PageState = {
  home: {
    id: "home",
    title: "Home",
  },
  fileEditor: {
    id: "fileEditor",
    title: "File Editor",
  },
};

const initialState = pages["home"];

export const selectedPageAtom = atomWithStorage<Page>(
  "selectedPage",
  initialState
);

// reducers
export const setSelectedPage = atom(null, (_, set, newPage: Page) => {
  set(selectedPageAtom, newPage);
});
