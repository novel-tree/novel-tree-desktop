import { atom, useAtom } from "jotai";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getStorage, setStorage, storageKeys } from "../../data";

const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
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
    const newEvent: Event = {
      id: uuid(),
      name,
      hasUnsavedChanges: true,
    };
    setEvents([...events, newEvent]);
  };

  const saveToStorage = () => {
    setStorage(storageKeys.settings.events, events);
  };

  return { events, addEvent, saveToStorage };
};
