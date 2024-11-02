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
import "@xyflow/react/dist/style.css";

const node1Id = uuid();
const node2Id = uuid();

const initialNodes = [
  { id: node1Id, position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: node2Id, position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [
  { id: "e1-2", source: node1Id, target: node2Id, animated: true },
];

export function TimeLineNodeRenderer({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
      setNodes((nds) => {
        return nds.map((nd) => {
          if (nd.id === selectedNode) {
            return { ...nd, data: { label: nodeLabel } };
          }
          return nd;
        });
      });
    }
  }, [nodeLabel, setNodes]);
  const onChange = useCallback(
    ({ nodes }: { nodes: Node[]; edges: Edge[] }) => {
      if (nodes.length > 0) {
        setSelectedNode(nodes[0].id);
        const nodeLabel = nodes[0].data.label as string;
        setNodeLabel(nodeLabel);
      }
    },
    []
  );
  useOnSelectionChange({ onChange });
  const onConnect = useCallback(
    (connection: Connection) => {
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
      <div></div>
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
            />
          </div>
        )}
      </div>
    </div>
  );
}
