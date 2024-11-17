import { z } from "zod";

export const SETTINGS_TYPE = z.enum(["event", "character", "location", "item"]);

export const ISettingItem = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  hasUnsavedChanges: z.boolean().optional(),
  isEditing: z.boolean().optional(),
});

export const ICharacterSetting = ISettingItem.extend({
  characterType: z.string().optional(),
  defaultAttributes: z.array(z.string()).optional(),
});

export const ILocationSetting = ISettingItem.extend({
  locationType: z.string().optional(),
  defaultProperties: z.array(z.string()).optional(),
});

export const IItemSetting = ISettingItem.extend({
  itemCategory: z.string().optional(),
  defaultTraits: z.array(z.string()).optional(),
});

export const IEventSetting = ISettingItem.extend({
  eventType: z.string().optional(),
  defaultParameters: z.array(z.string()).optional(),
});

// export interface ISettingItem {
//   id: string;
//   name: string;
//   description?: string;
//   hasUnsavedChanges?: boolean;
//   isEditing?: boolean;
// }

// /** Represents character-specific settings */
// export interface ICharacterSetting extends ISettingItem {
//   // Add character-specific properties
//   characterType?: string;
//   defaultAttributes?: string[];
// }

// /** Represents location-specific settings */
// export interface ILocationSetting extends ISettingItem {
//   // Add location-specific properties
//   locationType?: string;
//   defaultProperties?: string[];
// }

// /** Represents item-specific settings */
// export interface IItemSetting extends ISettingItem {
//   // Add item-specific properties
//   itemCategory?: string;
//   defaultTraits?: string[];
// }

// /** Represents event-specific settings */
// export interface IEventSetting extends ISettingItem {
//   // Add event-specific properties
//   eventType?: string;
//   defaultParameters?: string[];
// }
