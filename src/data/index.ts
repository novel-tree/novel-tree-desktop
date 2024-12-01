export const storageKeys = {
  timelines: {
    nodes: "timelines/nodes",
    edges: "timelines/edges",
  },
  settings: {
    events: "settings/events",
    characters: "settings/characters",
    locations: "settings/locations",
    items: "settings/items",
    mode: "settings/mode",
  },
  scripts: {
    editor: "scripts/editor",
  },
};

export const getStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const setStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
