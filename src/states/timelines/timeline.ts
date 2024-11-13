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
import { getStorage, setStorage, storageKeys } from "../../data";

export interface TimelineNode extends Node {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
}

interface TimelineEdge extends Edge {
  id: string;
  source: string;
  target: string;
}

const MAX_NODES = 10;
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

const createInitialEdges = (nodes: TimelineNode[]): TimelineEdge[] => {
  if (nodes.length < 2) {
    throw new Error("Nodes must have at least 2 elements");
  }
  return [
    {
      id: `e-${nodes[0].id}-${nodes[1].id}`,
      source: nodes[0].id,
      target: nodes[1].id,
    },
  ];
};

export type AppState = {
  nodes: TimelineNode[];
  edges: TimelineEdge[];
  onNodesChange: OnNodesChange<TimelineNode>;
  onEdgesChange: OnEdgesChange<TimelineEdge>;
  onConnect: OnConnect;
  setNodes: (nodes: TimelineNode[]) => void;
  setEdges: (edges: TimelineEdge[]) => void;
  addNode: (label: string) => void;
  saveToStorage: () => void;
};
const getInitialState = () => {
  try {
    const storedNodes = getStorage(storageKeys.timelines.nodes);
    const nodes = (storedNodes as TimelineNode[]) || initialNodes;
    const edges =
      (getStorage(storageKeys.timelines.edges) as TimelineEdge[]) ||
      createInitialEdges(nodes);
    return { nodes, edges };
  } catch (error) {
    console.error("Failed to load timeline state:", error);
    return {
      nodes: initialNodes,
      edges: createInitialEdges(initialNodes),
    };
  }
};
const { edges, nodes } = getInitialState();
const nodesAtom = atom(nodes);
const edgesAtom = atom(edges);

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
    if (nodes.length >= MAX_NODES) {
      throw new Error(`Maximum number of nodes reached: ${MAX_NODES}`);
    }
    const newNodeY = nodes[nodes.length - 1].position.y + DEFAULT_NODE_DISTANCE;
    const newNode: TimelineNode = {
      id: uuid(),
      position: { x: DEFAULT_NODE_X, y: newNodeY },
      data: { label },
    };
    setNodes([...nodes, newNode]);
  };

  const saveToStorage = () => {
    try {
      setStorage(storageKeys.timelines.nodes, nodes);
      setStorage(storageKeys.timelines.edges, edges);
    } catch (error) {
      console.error("Failed to save timeline state:", error);
      throw new Error("Failed to save timeline state");
    }
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
    saveToStorage,
  };
};
