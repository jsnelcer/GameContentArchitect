import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './StartNode.css'

interface StartNodeProps {
    data: {
        label: string;
        startCondition?: string;
    };
}

export const StartNode: React.FC<StartNodeProps> = ({ data }) => {
    return (
        <div className="start-node">
            <Handle type="source" position={Position.Right} id="a" />
            <div>{data.label}</div>
            {data.startCondition && <div className="start-condition">Condition: {data.startCondition}</div>}
        </div>
    );
};
