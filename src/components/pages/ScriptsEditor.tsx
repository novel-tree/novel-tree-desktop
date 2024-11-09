import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash-es";
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
import { SidebarCard } from "../Cards";
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
  const debouncedHandleSubMenuHeight = debounce(handleSubMenuHeight, 100);
  useEffect(() => {
    if (subMenuModeListRef.current) {
      window.addEventListener("resize", debouncedHandleSubMenuHeight);
    }
    handleSubMenuHeight();
    return () => {
      window.removeEventListener("resize", debouncedHandleSubMenuHeight);
    };
  }, [subMenuHeight]);
  return (
    <ContentArea>
      <IconButtonList IconButtons={scripts} title="Scripts" />
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <ContentHeaderBar>
          <div className="flex w-64 items-center gap-2">
            <input
              type="text"
              className="h-10 w-full rounded-md border border-gray-200 px-4 focus:outline-none focus:ring focus:ring-blue-500"
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
        <div className="border-border flex gap-2 border-b p-2">
          <IconButton ariaLabel="bold" icon={<Bold size={16} />} />
          <IconButton ariaLabel="italic" icon={<Italic size={16} />} />
          <IconButton ariaLabel="underline" icon={<Underline size={16} />} />
          <VerticalDivider />
          <IconButton ariaLabel="copy" icon={<Copy size={16} />} />
        </div>
        <div className="relative flex flex-1">
          <div className="flex-1 p-4" style={{ width: `${splitRatio * 100}%` }}>
            <textarea
              className="h-full w-full resize-none rounded-md border p-2"
              placeholder="Start writing your chapter here..."
            />
          </div>
          <div
            className="flex-1 border-l border-gray-100 bg-gray-50"
            style={{ width: `${(1 - splitRatio) * 100}%` }}
          >
            <div
              className="border-border flex gap-2 border-b bg-white p-2"
              ref={subMenuModeListRef}
            >
              <IconButton
                ariaLabel="scripts"
                icon={<NotepadText size={16} />}
              />
              <IconButton ariaLabel="characters" icon={<Users size={16} />} />
              <IconButton ariaLabel="locations" icon={<MapPin size={16} />} />
              <IconButton ariaLabel="items" icon={<Gem size={16} />} />
              <IconButton ariaLabel="events" icon={<Calendar size={16} />} />
              <VerticalDivider />
              <IconButton ariaLabel="add" icon={<Plus size={16} />} />
            </div>
            <div
              className="flex flex-col gap-2 overflow-y-auto p-2"
              style={{ height: `${subMenuHeight}px` }}
            >
              <h3 className="mb-2 text-lg font-semibold">Events</h3>
              <SidebarCard
                title="Event Name"
                icon={<Calendar strokeWidth={1} size={64} />}
                description="Event Description"
              />
              <h3 className="mb-2 text-lg font-semibold">Items</h3>
              <SidebarCard
                title="Item Name"
                icon={<Gem strokeWidth={1} size={64} />}
                description="Item Description"
              />
              <h3 className="mb-2 text-lg font-semibold">Locations</h3>
              <SidebarCard
                title="Location Name"
                icon={<MapPin strokeWidth={1} size={64} />}
                description="Location Description"
              />
              <h3 className="mb-2 text-lg font-semibold">Characters</h3>
              <SidebarCard
                title="Character Name"
                icon={<CircleUserRound strokeWidth={1} size={64} />}
                description="Character Description"
              />
              <h3 className="mb-2 text-lg font-semibold">Memo</h3>
              <Card>
                <textarea
                  className="bg-background w-full p-2"
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
