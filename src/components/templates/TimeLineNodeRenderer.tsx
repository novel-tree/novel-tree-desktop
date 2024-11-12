import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  useOnSelectionChange,
  ReactFlow,
} from "@xyflow/react";
import { Button } from "../Buttons/Button";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash-es";
import "@xyflow/react/dist/style.css";
import { useTimelineState, TimelineNode } from "../../states";

const debouncedUpdate = debounce(
  (
    nodes: TimelineNode[],
    selectedNode: string,
    nodeLabel: string,
    setNodes: (nodes: TimelineNode[]) => void,
  ) => {
    setNodes(
      nodes.map((nd) =>
        nd.id === selectedNode ? { ...nd, data: { label: nodeLabel } } : nd,
      ),
    );
  },
  300,
);

export function TimeLineNodeRenderer({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const {
    addNode,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
  } = useTimelineState();

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodeLabel, setNodeLabel] = useState("");
  const onClickAddNode = () => {
    addNode("New Node");
  };

  useEffect(() => {
    if (selectedNode) {
      debouncedUpdate(nodes, selectedNode, nodeLabel, setNodes);
    }
    return () => {
      debouncedUpdate.cancel();
    };
  }, [nodeLabel, setNodes, selectedNode, nodes]);
  const onChange = useCallback(
    ({ nodes }: { nodes: Node[]; edges: Edge[] }) => {
      try {
        if (nodes.length > 0) {
          const s = nodes[0];
          if (!s?.data?.label) {
            console.error("Invalid node data");
            return;
          }
          setSelectedNode(s.id);
          setNodeLabel(s.data.label as string);
        } else {
          setSelectedNode(null);
          setNodeLabel("");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [setSelectedNode, setNodeLabel],
  );
  useOnSelectionChange({ onChange });

  return (
    <div className="relative h-full w-full">
      {width && height && (
        <div
          className="rounded border"
          style={{ width: `${width}px`, height: `${height}px` }}
          role="application"
          aria-label="Timeline editor"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={0.5} />
            <Controls />
          </ReactFlow>
        </div>
      )}
      <div className="absolute left-4 top-4 flex flex-col gap-4">
        <Button onClick={onClickAddNode} variant="primary">
          Add Event
        </Button>
        {selectedNode && (
          <div className="flex flex-col gap-1 rounded-md bg-white p-4 shadow-md">
            <label
              htmlFor="eventLabel"
              className="text-sm font-medium text-gray-700"
            >
              Event Label
            </label>
            <input
              id="eventLabel"
              className="rounded-md border p-2"
              value={nodeLabel}
              onChange={(e) => setNodeLabel(e.target.value)}
              placeholder="Event Label"
              autoFocus
              aria-label="Edit event label"
              role="textbox"
            />
          </div>
        )}
      </div>
    </div>
  );
}
