import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface Mode {
  id: string;
  title: string;
  notification?: number;
}

interface Modes {
  [key: string]: Mode;
}

export const modeList: Modes = {
  script: {
    id: "script",
    title: "Script",
  },
  setting: {
    id: "setting",
    title: "Setting",
  },
  timeline: {
    id: "timeline",
    title: "Timeline",
  },
};

export const modes = atomWithStorage<Mode | null>("modes", null);

// reducers
export const setMode = atom(null, (_, set, newMode: Mode) => {
  set(modes, newMode);
});

export const resetMode = atom(null, (_, set) => {
  set(modes, null);
});
