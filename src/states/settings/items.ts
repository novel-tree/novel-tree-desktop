import { atom, useAtom } from "jotai";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getStorage, setStorage, storageKeys } from "../../data";

const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  hasUnsavedChanges: z.boolean(),
});

export type Item = z.infer<typeof ItemSchema>;
export type ItemList = Item[];

const getInitialState = (): ItemList => {
  try {
    const items = getStorage(storageKeys.settings.items) as ItemList;
    if (!items) return [];
    return items
      .map((item) => {
        const result = ItemSchema.safeParse(item);
        if (!result.success) {
          console.error("Failed to load item state:", result.error);
          return null;
        }
        return result.data;
      })
      .filter((item): item is Item => item !== null);
  } catch (error) {
    console.error("Failed to load item state:", error);
    return [];
  }
};

const itemsAtom = atom(getInitialState());

export type ItemsHook = {
  items: ItemList;
  addItem: (name: string) => void;
  saveToStorage: () => void;
};

export const useItemsState = (): ItemsHook => {
  const [items, setItems] = useAtom(itemsAtom);

  const addItem = (name: string) => {
    const newItem: Item = {
      id: uuid(),
      name,
      hasUnsavedChanges: true,
    };
    setItems([...items, newItem]);
  };

  const saveToStorage = () => {
    setStorage(storageKeys.settings.items, items);
  };

  return { items, addItem, saveToStorage };
};
