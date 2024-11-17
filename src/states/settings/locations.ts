import { atom, useAtom } from "jotai";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getStorage, setStorage, storageKeys } from "../../data";

const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  hasUnsavedChanges: z.boolean(),
});

export type Location = z.infer<typeof LocationSchema>;
export type LocationList = Location[];

const getInitialState = (): LocationList => {
  try {
    const locations = getStorage(
      storageKeys.settings.locations,
    ) as LocationList;
    return locations || [];
  } catch (error) {
    console.error("Failed to load location state:", error);
    return [];
  }
};

const locationsAtom = atom(getInitialState());

export type LocationsHook = {
  locations: LocationList;
  addLocation: (name: string) => void;
  saveToStorage: () => void;
};

export const useLocationsState = (): LocationsHook => {
  const [locations, setLocations] = useAtom(locationsAtom);

  const addLocation = (name: string) => {
    const newLocation: Location = {
      id: uuid(),
      name,
      hasUnsavedChanges: true,
    };
    setLocations([...locations, newLocation]);
  };

  const saveToStorage = () => {
    setStorage(storageKeys.settings.locations, locations);
  };

  return { locations, addLocation, saveToStorage };
};
