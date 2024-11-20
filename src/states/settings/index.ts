import { atom, useAtom } from "jotai";
import { z } from "zod";
import { getStorage, setStorage, storageKeys } from "../../data";
import { useCharactersState, CharacterList, Character } from "./characters";
import { useLocationsState, LocationList, Location } from "./locations";
import { useEventsState, EventList, Event } from "./events";
import { useItemsState, ItemList, Item } from "./items";

const SettingModeSchema = z.enum(["character", "location", "event", "item"]);

export type SettingMode = z.infer<typeof SettingModeSchema>;
export type Setting = Character | Location | Event | Item;

const getInitialState = (): SettingMode => {
  try {
    const storedMode = SettingModeSchema.safeParse(
      getStorage(storageKeys.settings.mode),
    );
    return storedMode.success ? storedMode.data : SettingModeSchema.options[0];
  } catch (error) {
    console.error(
      `Invalid setting mode stored. Expected one of [${SettingModeSchema.options.join(", ")}]. Defauluting to ${SettingModeSchema.options[0]}.`,
      error,
    );
    return SettingModeSchema.options[0];
  }
};

const selectedSettingTypeAtom = atom(getInitialState());

export type SettingsStoreHook = {
  settingMode: SettingMode;
  setCurrentSettingMode: (mode: SettingMode) => void;
};

export const useSettingsState = (): SettingsStoreHook => {
  const [settingMode, setSettingMode] = useAtom(selectedSettingTypeAtom);

  const setCurrentSettingMode = (mode: SettingMode) => {
    setSettingMode(mode);
    setStorage(storageKeys.settings.mode, mode);
  };

  return { settingMode, setCurrentSettingMode };
};

export { useCharactersState, useLocationsState, useEventsState, useItemsState };

export type {
  CharacterList,
  LocationList,
  EventList,
  ItemList,
  Character,
  Location,
  Event,
  Item,
};
