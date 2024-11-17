import { atom, useAtom } from "jotai";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getStorage, setStorage, storageKeys } from "../../data";

const CharacterSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name must not be empty"),
  description: z.string().nullable().optional(),
  hasUnsavedChanges: z.boolean(),
});

export type Character = z.infer<typeof CharacterSchema>;
export type CharacterList = Character[];

const getInitialState = (): CharacterList => {
  try {
    const characters = getStorage(
      storageKeys.settings.characters,
    ) as CharacterList;
    if (!characters) return [];
    return characters
      .map((character) => {
        const result = CharacterSchema.safeParse(character);
        if (!result.success) {
          console.error("Failed to load character state:", result.error);
          return null;
        }
        return result.data;
      })
      .filter((character): character is Character => character !== null);
  } catch (error) {
    console.error("Failed to load character state:", error);
    return [];
  }
};

const charactersAtom = atom(getInitialState());

export type CharactersHook = {
  characters: CharacterList;
  addCharacter: (name: string) => void;
  saveToStorage: () => void;
};

export const useCharactersState = (): CharactersHook => {
  const [characters, setCharacters] = useAtom(charactersAtom);

  const addCharacter = (name: string) => {
    const newCharacter: Character = {
      id: uuid(),
      name,
      hasUnsavedChanges: true,
    };
    setCharacters([...characters, newCharacter]);
  };

  const saveToStorage = () => {
    setStorage(storageKeys.settings.characters, characters);
  };

  return { characters, addCharacter, saveToStorage };
};
