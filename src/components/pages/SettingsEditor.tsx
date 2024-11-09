import { useState } from "react";
import { Search, Users, MapPin, Gem, Calendar, Plus } from "lucide-react";
import { Button, IconButton } from "../Buttons";
import { SettingList } from "../Lists";
import { SettingCard } from "../Cards";
import {
  ISettingItem,
  ICharacterSetting,
  ILocationSetting,
  IItemSetting,
  IEventSetting,
} from "../../types/settings";

const mockData: {
  characters: ICharacterSetting[];
  locations: ILocationSetting[];
  items: IItemSetting[];
  events: IEventSetting[];
} = {
  characters: [
    {
      id: "1",
      name: "John Doe",
      description: "The protagonist, a detective with a dark past",
      hasUnsavedChanges: true,
      isEditing: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      description: "A brilliant scientist working on a secret project.",
    },
  ],
  locations: [
    {
      id: "1",
      name: "City Hall",
      description: "The seat of the city government",
    },
    {
      id: "2",
      name: "Smith Manor",
      description: "The home of the Smith family",
    },
  ],
  items: [
    {
      id: "1",
      name: "Key",
      description: "A mysterious key with an unknown purpose",
    },
    { id: "2", name: "Gun", description: "A weapon used in a recent crime" },
  ],
  events: [
    {
      id: "1",
      name: "Awakening",
      description:
        "The protagonist wakes up in a dark alley with no memory of how he got there",
    },
    {
      id: "2",
      name: "Experiment",
      description:
        "Jane conducts a dangerous experiment that goes horribly wrong",
    },
  ],
};

type Category = "characters" | "locations" | "items" | "events";
type ItemId = string;

export function SettingsEditor() {
  const [activeCategory, setActiveCategory] = useState<Category>("characters");
  const [selectedItem, setSelectedItem] = useState<ItemId | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
  };
  const handleAddNew = () => {
    // In a real application, this would open a form to add a new item
    console.log("Adding new item to", activeCategory);
  };
  const categories: {
    value: Category;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "characters",
      label: "Characters",
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: "locations",
      label: "Locations",
      icon: <MapPin className="h-4 w-4" />,
    },
    { value: "items", label: "Items", icon: <Gem className="h-4 w-4" /> },
    {
      value: "events",
      label: "Events",
      icon: <Calendar className="h-4 w-4" />,
    },
  ];
  return (
    <div className="flex h-screen w-full bg-white">
      <div className="w-auto border-r bg-gray-100 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Story Settings</h1>
        <nav className="flex flex-col space-y-2 flex-grow">
          {categories.map((category) => (
            <IconButton
              key={category.value}
              text={category.label}
              icon={category.icon}
              onClick={() => setActiveCategory(category.value)}
            />
          ))}
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Search and Add New */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="w-64 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
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
        <div className="flex-1 flex overflow-scroll">
          {/* List */}
          <SettingList
            settings={mockData[activeCategory]}
            onClickItem={handleItemClick}
          />
          {/* Details */}
          <div className="flex-1 p-4 overflow-auto border-l">
            {selectedItem ? (
              <SettingCard
                item={
                  mockData[activeCategory].find(
                    (item) => item.id === selectedItem
                  ) as ISettingItem
                }
                hasUnsavedChanges={
                  mockData[activeCategory].find(
                    (item) => item.id === selectedItem
                  )?.hasUnsavedChanges || false
                }
              />
            ) : (
              <p className="text-gray-500">Select an item to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
