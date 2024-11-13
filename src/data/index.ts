export const storageKeys = {
  timelines: {
    nodes: "timelines/nodes",
    edges: "timelines/edges",
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

export const setStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
