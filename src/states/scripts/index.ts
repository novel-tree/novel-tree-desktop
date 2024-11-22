import { atom, useAtom } from "jotai";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getStorage, setStorage, storageKeys } from "../../data";

const ScriptSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title must not be empty"),
  description: z.string().nullable().optional(),
  hasUnsavedChanges: z.boolean(),
  characterIds: z.array(z.string().uuid()).optional(),
  locationIds: z.array(z.string().uuid()).optional(),
  eventIds: z.array(z.string().uuid()).optional(),
  itemIds: z.array(z.string().uuid()).optional(),
});

export type Script = z.infer<typeof ScriptSchema>;
export type ScriptList = z.infer<typeof ScriptSchema>[];

const getInitialState = (): ScriptList => {
  try {
    const storedScripts = ScriptSchema.array().safeParse(
      getStorage(storageKeys.scripts.editor),
    );
    return storedScripts.success ? storedScripts.data : [];
  } catch (error) {
    console.error("Invalid scripts stored. Defaulting to empty array.", error);
    return [];
  }
};

const scriptsAtom = atom(getInitialState());

export type ScriptsStoreHook = {
  scripts: ScriptList;
  createScript: () => void;
  updateScript: (script: Script) => void;
  deleteScript: (id: string) => void;
};

export const useScriptsState = (): ScriptsStoreHook => {
  const [scripts, setScripts] = useAtom(scriptsAtom);
  const createScript = () => {
    const newScript: Script = {
      id: uuid(),
      title: "New Script",
      description: null,
      hasUnsavedChanges: true,
      characterIds: [],
      locationIds: [],
      eventIds: [],
      itemIds: [],
    };
    setScripts([...scripts, newScript]);
  };
  const updateScript = (script: Script) => {
    const updatedScripts = scripts.map((s) =>
      s.id === script.id ? script : s,
    );
    setScripts(updatedScripts);
  };
  const deleteScript = (id: string) => {
    const updatedScripts = scripts.filter((s) => s.id !== id);
    setScripts(updatedScripts);
  };
  return { scripts, createScript, updateScript, deleteScript };
};
