import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    Controls,
    NodeTypes,
    Node as ReactFlowNode,
    Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { StartNode } from './Nodes/StartNode';

const initialNodes: ReactFlowNode[] = [
    { id: '1', type: 'start', position: { x: 0, y: 0 }, data: { label: 'Start Quest', startCondition: 'Talk with NPC' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'Task 1' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const NodeEditor: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeCounter, setNodeCounter] = useState(initialNodes.length + 1);

    const nodeTypes: NodeTypes = {
        start: StartNode,
    };

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const handleAddNode = useCallback(() => {
        setNodes((prevNodes) => [
            ...prevNodes,
            {
                id: `${nodeCounter}`,
                position: { x: 100, y: 150 + (nodeCounter - 3) * 50 },
                data: { label: `New Node ${nodeCounter}` },
            },
        ]);
        setNodeCounter((prevCounter) => prevCounter + 1);
    }, [setNodes, nodeCounter]);

    const handleRemoveSelectedNode = useCallback(() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        setNodes((prevNodes) => prevNodes.filter((node) => !selectedNodes.find(selected => selected.id === node.id)));
        setEdges((prevEdges) => prevEdges.filter((edge) => !selectedNodes.find(selected => selected.id === edge.source) && !selectedNodes.find(selected => selected.id === edge.target)));
    }, [nodes, setNodes, setEdges]);

    const handleRevert = useCallback(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [setNodes, setEdges]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div>
                <button onClick={handleAddNode}>New Node</button>
                <button onClick={handleRemoveSelectedNode}>Remove selected Node</button>
                <button onClick={handleRevert}>Reset</button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
                <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
export default NodeEditor;