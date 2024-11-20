import { atom, useAtom } from "jotai";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getStorage, setStorage, storageKeys } from "../../data";

const LocationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name must not be empty"),
  description: z.string().nullable().optional(),
  hasUnsavedChanges: z.boolean(),
});

export type Location = z.infer<typeof LocationSchema>;
export type LocationList = Location[];

const getInitialState = (): LocationList => {
  try {
    const locations = getStorage(
      storageKeys.settings.locations,
    ) as LocationList;
    if (!locations) return [];
    return locations
      .map((location) => {
        const result = LocationSchema.safeParse(location);
        if (!result.success) {
          console.error("Failed to load location state:", result.error);
          return null;
        }
        return result.data;
      })
      .filter((location): location is Location => location !== null);
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
    if (!name.trim()) {
      throw new Error("Name must not be empty");
    }
    const newLocation: Location = {
      id: uuid(),
      name,
      hasUnsavedChanges: true,
    };
    setLocations((prev) => [...prev, newLocation]);
  };

  const saveToStorage = () => {
    try {
      setLocations((prev) =>
        prev.map((location) => ({ ...location, hasUnsavedChanges: false })),
      );
      setStorage(storageKeys.settings.locations, locations);
    } catch (error) {
      console.error("Failed to save location state:", error);
    }
  };

  return { locations, addLocation, saveToStorage };
};
