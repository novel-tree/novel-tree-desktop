import { useState } from "react";
import { Search, Users, MapPin, Gem, Calendar, Plus } from "lucide-react";
import { Button, IconTextButton } from "../Buttons";
import { SettingList } from "../Lists";
import { SettingCard } from "../Cards";
import {
  useSettingsState,
  SettingMode,
  useCharactersState,
  useLocationsState,
  useItemsState,
  useEventsState,
  CharacterList,
  LocationList,
  EventList,
  ItemList,
  Setting,
} from "../../states/settings";

export function SettingsEditor() {
  const { setCurrentSettingMode, settingMode } = useSettingsState();
  const { addCharacter, characters } = useCharactersState();
  const { addLocation, locations } = useLocationsState();
  const { addItem, items } = useItemsState();
  const { addEvent, events } = useEventsState();

  const [selectedItem, setSelectedItem] = useState<Setting | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSelectedMode = (mode: SettingMode) => {
    setCurrentSettingMode(mode);
    const newSelectedItem = handleSelectedModeData()[0];
    setSelectedItem(newSelectedItem ?? null);
  };

  const handleSelectedModeData = ():
    | CharacterList
    | LocationList
    | EventList
    | ItemList => {
    switch (settingMode) {
      case "character":
        return characters;
      case "location":
        return locations;
      case "item":
        return items;
      case "event":
        return events;
    }
  };

  const handleSelectedItem = (item: Setting) => {
    setSelectedItem(item);
  };

  const handleAddNew = () => {
    try {
      switch (settingMode) {
        case "character":
          addCharacter("New Character");
          break;
        case "location":
          addLocation("New Location");
          break;
        case "item":
          addItem("New Item");
          break;
        case "event":
          addEvent("New Event");
          break;
      }
    } catch (error) {
      console.error("Failed to add new item:", error);
    }
  };
  const categories: {
    value: SettingMode;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "character",
      label: "Characters",
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: "location",
      label: "Locations",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      value: "item",
      label: "Items",
      icon: <Gem className="h-4 w-4" />,
    },
    {
      value: "event",
      label: "Events",
      icon: <Calendar className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-white">
      <div className="flex w-auto flex-col border-r bg-gray-100 p-4">
        <h1 className="mb-4 text-2xl font-bold">Story Settings</h1>
        <nav className="flex flex-grow flex-col space-y-2">
          {categories.map((category) => (
            <IconTextButton
              key={category.value}
              text={category.label}
              icon={category.icon}
              className={category.value === settingMode ? "bg-blue-100" : ""}
              onClick={() => handleSelectedMode(category.value)}
            />
          ))}
        </nav>
      </div>
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Search and Add New */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              className="h-10 w-full rounded-md border border-gray-200 pl-10 pr-4 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleAddNew} variant="primary">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="">Add New</span>
            </div>
          </Button>
        </div>
        {/* List and Details */}
        <div className="flex flex-1 overflow-scroll">
          {/* List */}
          <SettingList
            settings={handleSelectedModeData()}
            onItemSelected={handleSelectedItem}
            selectedSettingId={selectedItem?.id ?? ""}
          />
          {/* Details */}
          <div className="flex-1 overflow-auto border-l p-4">
            {selectedItem ? (
              <SettingCard item={selectedItem} hasUnsavedChanges={false} />
            ) : (
              <p className="text-gray-500">Select an item to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
