import { atom, useAtom } from "jotai";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getStorage, setStorage, storageKeys } from "../../data";

const EventSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name must not be empty"),
  description: z.string().nullable().optional(),
  hasUnsavedChanges: z.boolean(),
});

export type Event = z.infer<typeof EventSchema>;
export type EventList = Event[];

const getInitialState = (): EventList => {
  try {
    const events = getStorage(storageKeys.settings.events) as EventList;
    if (!events) return [];
    return events
      .map((event) => {
        const result = EventSchema.safeParse(event);
        if (!result.success) {
          console.error("Failed to load event state:", result.error);
          return null;
        }
        return result.data;
      })
      .filter((event): event is Event => event !== null);
  } catch (error) {
    console.error("Failed to load event state:", error);
    return [];
  }
};

const eventsAtom = atom(getInitialState());

export type EventsHook = {
  events: EventList;
  addEvent: (name: string) => void;
  saveToStorage: () => void;
};

export const useEventsState = (): EventsHook => {
  const [events, setEvents] = useAtom(eventsAtom);

  const addEvent = (name: string) => {
    if (!name.trim()) {
      throw new Error("Name must not be empty");
    }
    const newEvent: Event = {
      id: uuid(),
      name,
      hasUnsavedChanges: true,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const saveToStorage = () => {
    try {
      setEvents((prev) => ({
        ...prev,
        hasUnsavedChanges: false,
      }));
      setStorage(storageKeys.settings.events, events);
    } catch (error) {
      console.error("Failed to save event state:", error);
      throw error;
    }
  };

  return { events, addEvent, saveToStorage };
};
