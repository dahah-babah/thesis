import React from 'react';
import { Badge as AntdBadge } from 'antd';

interface Props {
    content: React.ReactNode;
    count?: number;
    status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    dot?: boolean;
    title?: string;
    offset?: [number, number];
}

export class Badge extends React.Component<Props> {

    render(): React.ReactChild {
        const { content, count, status, dot, offset } = this.props;
        return (
            <AntdBadge
                count={count}
                status={status}
                dot={dot}
                offset={offset}
            >
                {content}
            </AntdBadge>
        );
    }
}