import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ReactFlowProvider } from "@xyflow/react";
import { debounce } from "lodash-es";
import { TimeLineNodeRenderer } from "../templates/TimeLineNodeRenderer";

interface ContainerSize {
  width: number;
  height: number;
}

const TimelineErrorFallback = () => (
  <div role="alert" className="p-4 text-red-500">
    <span>Failed to load timeline editor. Please try refreshing the page.</span>
  </div>
);

export function TimeLineEditor() {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<ContainerSize>({
    width: 0,
    height: 0,
  });
  function getCurrentDivSize() {
    if (flowRef.current) {
      const parent = flowRef.current.parentElement;
      if (!parent) {
        console.warn("Timeline container must have a parent element");
        return;
      }
      setContainerSize({
        width: parent.clientWidth,
        height: parent.clientHeight,
      });
    }
  }
  useEffect(() => {
    const debouncedResize = debounce(getCurrentDivSize, 100);
    window.addEventListener("resize", debouncedResize);
    getCurrentDivSize();
    return () => {
      window.removeEventListener("resize", debouncedResize);
      debouncedResize.cancel();
    };
  }, []);
  return (
    <div className="w-full flex" ref={flowRef}>
      <ErrorBoundary FallbackComponent={TimelineErrorFallback}>
        <ReactFlowProvider>
          {containerSize.width === 0 || containerSize.height === 0 ? (
            <div className="p-4">
              <span>Loading timeline editor...</span>
            </div>
          ) : (
            <TimeLineNodeRenderer
              width={containerSize.width}
              height={containerSize.height}
            />
          )}
        </ReactFlowProvider>
      </ErrorBoundary>
    </div>
  );
}
