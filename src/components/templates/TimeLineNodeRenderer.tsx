import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  useOnSelectionChange,
  ReactFlow,
} from "@xyflow/react";
import { v4 as uuid } from "uuid";
import { Button } from "../atoms/Button";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash-es";
import "@xyflow/react/dist/style.css";

interface TimelineNode {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
}

interface TimelineEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
}

const DEFAULT_NODE_DISTANCE = 100;
const DEFAULT_NODE_X = 0;

const createInitialNodes = (startY = 0): TimelineNode[] => [
  {
    id: uuid(),
    position: { x: DEFAULT_NODE_X, y: startY },
    data: { label: "1" },
  },
  {
    id: uuid(),
    position: { x: DEFAULT_NODE_X, y: startY + DEFAULT_NODE_DISTANCE },
    data: { label: "2" },
  },
];
const createInitialEdges = (nodes: TimelineNode[]): TimelineEdge[] => [
  {
    id: `e-${nodes[0].id}-${nodes[1].id}`,
    source: nodes[0].id,
    target: nodes[1].id,
    animated: true,
  },
];

const debouncedUpdate = debounce(
  (
    nodes: TimelineNode[],
    selectedNode: string,
    nodeLabel: string,
    setNodes: (nodes: TimelineNode[]) => void
  ) => {
    setNodes(
      nodes.map((nd) =>
        nd.id === selectedNode ? { ...nd, data: { label: nodeLabel } } : nd
      )
    );
  },
  300
);

export function TimeLineNodeRenderer({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(createInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    createInitialEdges(nodes)
  );
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodeLabel, setNodeLabel] = useState("");
  function addNode() {
    const newNodeY = nodes[nodes.length - 1].position.y + 100;
    const newNode: Node<{ label: string }> = {
      id: uuid(),
      position: { x: 0, y: newNodeY },
      data: { label: "New Event" },
    };
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  }

  useEffect(() => {
    if (selectedNode) {
      debouncedUpdate(nodes, selectedNode, nodeLabel, setNodes);
    }
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
    [setSelectedNode, setNodeLabel]
  );
  useOnSelectionChange({ onChange });
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) {
        console.warn("Invalid connection");
      }
      setEdges((oldEdges) =>
        addEdge({ ...connection, animated: true }, oldEdges)
      );
    },
    [setEdges]
  );
  return (
    <div className="w-full h-full relative">
      {width && height && (
        <div
          className="border rounded"
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
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        <Button onClick={addNode} variant="primary">
          Add Event
        </Button>
        {selectedNode && (
          <div className="p-4 bg-white rounded-md shadow-md flex flex-col gap-1">
            <label
              htmlFor="eventLabel"
              className="text-sm font-medium text-gray-700"
            >
              Event Label
            </label>
            <input
              id="eventLabel"
              className="border rounded-md p-2"
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
