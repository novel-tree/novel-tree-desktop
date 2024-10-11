import { useAtom } from "jotai";
import { modeList, modes } from "../../states/modes";
import { ModeListItem } from "../molecules/ModeListItem";

export function ModeList() {
  const [mode, setMode] = useAtom(modes);
  return (
    <div className="flex flex-col gap-0 h-screen border-r border-solid">
      {Object.values(modeList).map((modeItem) => (
        <ModeListItem
          key={modeItem.id}
          icon={modeItem.id}
          name={modeItem.title}
          description=""
          onClick={() => setMode(modeItem)}
          selected={mode?.id === modeItem.id}
        />
      ))}
    </div>
  );
}
