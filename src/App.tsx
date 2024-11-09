import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { modes } from "./states/modes";
import { Home } from "./components/pages/Home";
import { TimeLineEditor } from "./components/pages/TimeLineEditor";
import { SettingsEditor } from "./components/pages/SettingsEditor";
import { SideBar } from "./components/templates/SideBar";
import "./App.css";

import { ModeList } from "./components/organisms/ModeList";

function ContentHandler() {
  const checkMode = useAtomValue(modes);
  switch (checkMode?.id) {
    case "timeline":
      return <TimeLineEditor />;
    case "setting":
      return <SettingsEditor />;
    default:
      return <Home />;
  }
}

function App() {
  useEffect(() => {
    navigator.storage.estimate().then((estimate) => {
      console.log(estimate);
    });
  }, []);

  return (
    <div className="flex h-screen w-screen gap-0 overflow-hidden">
      <ModeList />
      <SideBar />
      <div className="max-w-full flex-1">
        <ContentHandler />
      </div>
    </div>
  );
}

export default App;
