import { atom } from "jotai";

interface windowSize {
  width: number;
  height: number;
}

export const windowSizesAtom = atom<windowSize>({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const sidebarWidthAtom = atom<number>(128);

// function to update the sidebar width but not less than 64px
export const updateSidebarWidthAtom = atom(
  (get) => get(sidebarWidthAtom),
  (_get, set, width: number) => {
    if (width > 64) {
      set(sidebarWidthAtom, width);
    }
  }
);
