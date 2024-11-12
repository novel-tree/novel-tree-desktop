import { atom, useAtom } from "jotai";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react";
import { v4 as uuid } from "uuid";

export interface TimelineNode extends Node {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
}

interface TimelineEdge extends Edge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
}

const DEFAULT_NODE_DISTANCE = 100;
const DEFAULT_NODE_X = 0;

const initialNodes: TimelineNode[] = [
  {
    id: uuid(),
    position: { x: DEFAULT_NODE_X, y: 0 },
    data: { label: "1" },
  },
  {
    id: uuid(),
    position: { x: DEFAULT_NODE_X, y: 0 + DEFAULT_NODE_DISTANCE },
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

export type AppState = {
  nodes: TimelineNode[];
  edges: TimelineEdge[];
  onNodesChange: OnNodesChange<TimelineNode>;
  onEdgesChange: OnEdgesChange<TimelineEdge>;
  onConnect: OnConnect;
  setNodes: (nodes: TimelineNode[]) => void;
  setEdges: (edges: TimelineEdge[]) => void;
  addNode: (label: string) => void;
};
const nodesAtom = atom(initialNodes);
const edgesAtom = atom(createInitialEdges(initialNodes));

export const useTimelineState = (): AppState => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);

  const onNodesChange: OnNodesChange<TimelineNode> = (newNodes) => {
    setNodes(applyNodeChanges(newNodes, nodes));
  };

  const onEdgesChange: OnEdgesChange<TimelineEdge> = (newEdges) => {
    setEdges(applyEdgeChanges(newEdges, edges));
  };

  const onConnect: OnConnect = (params) => {
    setEdges(addEdge(params, edges));
  };

  const addNode = (label: string) => {
    const newNodeY = nodes[nodes.length - 1].position.y + DEFAULT_NODE_DISTANCE;
    const newNode: TimelineNode = {
      id: uuid(),
      position: { x: DEFAULT_NODE_X, y: newNodeY },
      data: { label },
    };
    setNodes([...nodes, newNode]);
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
    addNode,
  };
};
