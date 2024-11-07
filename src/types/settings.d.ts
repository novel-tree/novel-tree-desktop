export interface SettingItem {
  id: string;
  name: string;
  description?: string;
  hasUnsavedChanges?: boolean;
  isEditing?: boolean;
}

export interface character extends SettingItem {}

export interface location extends SettingItem {}

export interface item extends SettingItem {}

export interface event extends SettingItem {}
