import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Calendar,
  Copy,
  Circle,
  CircleUserRound,
  File,
  Gem,
  Italic,
  MapPin,
  NotepadText,
  Plus,
  Save,
  Underline,
  Users,
} from "lucide-react";
import { Card } from "../Cards/CardContainer/Card";
import { ContentArea } from "../templates";
import { ContentHeaderBar } from "../Contents";
import { IconButtonList, iIconButton } from "../Lists";
import { Button, IconButton } from "../Buttons";
import { VerticalDivider } from "../Dividers";

function createIconButton(count: number): iIconButton[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `icon-button-${i}`,
    icon: <File size={16} />,
    text: `Script ${i + 1}`,
    onClick: () => console.log(`Script ${i + 1}`),
  }));
}

export const ScriptsEditor = () => {
  const [scripts] = useState<iIconButton[]>(createIconButton(10));
  const splitRatio = 0.5;
  const subMenuModeListRef = useRef<HTMLDivElement>(null);
  const [subMenuHeight, setSubMenuHeight] = useState(0);
  function handleSubMenuHeight() {
    if (subMenuModeListRef.current) {
      const windowHeight = window.innerHeight;
      const subMenuBottom =
        subMenuModeListRef.current.getBoundingClientRect().bottom;
      setSubMenuHeight(windowHeight - subMenuBottom);
    }
  }
  useEffect(() => {
    if (subMenuModeListRef.current) {
      window.addEventListener("resize", handleSubMenuHeight);
    }
    handleSubMenuHeight();
    return () => {
      window.removeEventListener("resize", handleSubMenuHeight);
    };
  }, [subMenuHeight]);
  return (
    <ContentArea>
      <IconButtonList IconButtons={scripts} title="Scripts" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ContentHeaderBar>
          <div className="w-64 flex items-center gap-2">
            <input
              type="text"
              className="w-full h-10 px-4 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
              value="The Awakening"
              placeholder="script name"
              readOnly
            ></input>
            <Circle className="h-4 w-4 text-yellow-500" />
          </div>
          <Button variant="primary">
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span className="">Save</span>
            </div>
          </Button>
        </ContentHeaderBar>
        <div className="p-2 border-b border-border flex gap-2">
          <IconButton text="bold" icon={<Bold size={16} />} />
          <IconButton text="italic" icon={<Italic size={16} />} />
          <IconButton text="underline" icon={<Underline size={16} />} />
          <VerticalDivider />
          <IconButton text="copy" icon={<Copy size={16} />} />
        </div>
        <div className="flex-1 flex relative">
          <div className="flex-1 p-4" style={{ width: `${splitRatio * 100}%` }}>
            <textarea
              className="w-full h-full resize-none rounded-md border p-2"
              placeholder="Start writing your chapter here..."
            />
          </div>
          <div
            className="flex-1 bg-gray-50 border-l border-gray-100"
            style={{ width: `${(1 - splitRatio) * 100}%` }}
          >
            <div
              className="p-2 border-b border-border flex gap-2 bg-white"
              ref={subMenuModeListRef}
            >
              <IconButton text="scripts" icon={<NotepadText size={16} />} />
              <IconButton text="characters" icon={<Users size={16} />} />
              <IconButton text="locations" icon={<MapPin size={16} />} />
              <IconButton text="items" icon={<Gem size={16} />} />
              <IconButton text="events" icon={<Calendar size={16} />} />
              <VerticalDivider />
              <IconButton text="add" icon={<Plus size={16} />} />
            </div>
            <div
              className="flex flex-col gap-2 p-2 overflow-y-auto"
              style={{ height: `${subMenuHeight}px` }}
            >
              <h3 className="text-lg font-semibold mb-2">Events</h3>
              <Card>
                <div className="flex gap-2 p-2">
                  <div>
                    <Calendar strokeWidth={1} size={64} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Event Name</h4>
                    <p className="text-sm text-gray-500">Event Description</p>
                  </div>
                </div>
              </Card>
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              <Card>
                <div className="flex gap-2 p-2">
                  <div>
                    <Gem strokeWidth={1} size={64} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Item Name</h4>
                    <p className="text-sm text-gray-500">Item Description</p>
                  </div>
                </div>
              </Card>
              <h3 className="text-lg font-semibold mb-2">Locations</h3>
              <Card>
                <div className="flex gap-2 p-2">
                  <div>
                    <MapPin strokeWidth={1} size={64} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Location Name</h4>
                    <p className="text-sm text-gray-500">
                      Location Description
                    </p>
                  </div>
                </div>
              </Card>
              <h3 className="text-lg font-semibold mb-2">Characters</h3>
              <Card>
                <div className="flex gap-2 p-2">
                  <div>
                    <CircleUserRound strokeWidth={1} size={64} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Character Name</h4>
                    <p className="text-sm text-gray-500">
                      Character Description
                    </p>
                  </div>
                </div>
              </Card>
              <h3 className="text-lg font-semibold mb-2">Memo</h3>
              <Card>
                <textarea
                  className="w-full p-2 bg-background"
                  placeholder="Add notes, comments, or additional information here..."
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ContentArea>
  );
};
