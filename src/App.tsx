import { useEffect, useMemo } from "react";
import { useAtomValue } from "jotai";
import { modes } from "./states/modes";
import { Home } from "./components/pages/Home";
import { SideBar } from "./components/templates/SideBar";
import "./App.css";
import { ModeList } from "./components/organisms/ModeList";

function App() {
  const checkMode = useAtomValue(modes);
  const isModeSelected = useMemo(() => checkMode !== null, [checkMode]);

  useEffect(() => {
    navigator.storage.estimate().then((estimate) => {
      console.log(estimate);
    });
  }, []);

  return (
    <div className="flex gap-0 w-screen h-screen overflow-hidden">
      <ModeList />
      <SideBar />
      <div className="flex-1 max-w-full">{!isModeSelected && <Home />}</div>
    </div>
  );
}

export default App;
