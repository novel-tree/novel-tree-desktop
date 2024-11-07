export interface ISettingItem {
  id: string;
  name: string;
  description?: string;
  hasUnsavedChanges?: boolean;
  isEditing?: boolean;
}

/** Represents character-specific settings */
export interface ICharacterSetting extends ISettingItem {
  // Add character-specific properties
  characterType?: string;
  defaultAttributes?: string[];
}

/** Represents location-specific settings */
export interface ILocationSetting extends ISettingItem {
  // Add location-specific properties
  locationType?: string;
  defaultProperties?: string[];
}

/** Represents item-specific settings */
export interface IItemSetting extends ISettingItem {
  // Add item-specific properties
  itemCategory?: string;
  defaultTraits?: string[];
}

/** Represents event-specific settings */
export interface IEventSetting extends ISettingItem {
  // Add event-specific properties
  eventType?: string;
  defaultParameters?: string[];
}
