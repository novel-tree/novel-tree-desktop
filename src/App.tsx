import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { modes } from "./states/modes";
import { Home } from "./components/pages/Home";
import { TimeLineEditor } from "./components/pages/TimeLineEditor";
import { SideBar } from "./components/templates/SideBar";
import "./App.css";

import { ModeList } from "./components/organisms/ModeList";

function ContentHandler() {
  const checkMode = useAtomValue(modes);
  switch (checkMode?.id) {
    case "timeline":
      return <TimeLineEditor />;
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
    <div className="flex gap-0 w-screen h-screen overflow-hidden">
      <ModeList />
      <SideBar />
      <div className="flex-1 max-w-full">
        <ContentHandler />
      </div>
    </div>
  );
}

export default App;
