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
  } catch (error) {
    console.error(error);
  }
};

export const setStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};
