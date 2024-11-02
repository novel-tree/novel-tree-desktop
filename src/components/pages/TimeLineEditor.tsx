import { useEffect, useRef, useState } from "react";
import { TimeLineNodeRenderer } from "../templates/TimeLineNodeRenderer";
import { ReactFlowProvider } from "@xyflow/react";
export function TimeLineEditor() {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  function getCurrentDivSize() {
    if (flowRef.current) {
      console.log(flowRef.current.parentElement?.clientHeight);
      console.log(flowRef.current.parentElement?.clientWidth);
      setContainerSize({
        width: flowRef.current.parentElement?.clientWidth || 0,
        height: flowRef.current.parentElement?.clientHeight || 0,
      });
    }
  }
  useEffect(() => {
    window.addEventListener("resize", getCurrentDivSize);
    getCurrentDivSize();
    return () => {
      window.removeEventListener("resize", getCurrentDivSize);
    };
  }, []);
  return (
    <div className="w-full flex" ref={flowRef}>
      <ReactFlowProvider>
        <TimeLineNodeRenderer
          width={containerSize.width}
          height={containerSize.height}
        />
      </ReactFlowProvider>
    </div>
  );
}
