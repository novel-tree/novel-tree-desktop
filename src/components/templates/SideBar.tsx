import React from "react";
import { useAtomValue } from "jotai";
import { sidebarWidthAtom } from "../../states/windowSizes";
import { modeList, modes } from "../../states/modes";
import { ScriptList } from "../organisms/SideBarModules/ScriptList";

interface SideBarProps {
  children?: React.ReactNode;
}

const SelectedMode: React.FC = () => {
  const mode = useAtomValue(modes);
  if (!mode) {
    return null;
  }
  return <ScriptList />;
};

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const sidebarWidth = useAtomValue(sidebarWidthAtom);
  return (
    <aside
      className="h-screen p-x border-r border-solid flex flex-col gap-0"
      style={{ maxWidth: `${sidebarWidth}px` }}
    >
      <SelectedMode />
    </aside>
  );
};
