import React from 'react';
import { Badge as AntdBadge } from 'antd';

interface Props {
    content: React.ReactNode;
    count?: number;
    status?: 'success' | 'default' | 'error' | 'warning'; // warning if comments
    dot?: boolean;
    title?: string;
    offset?: [number, number];
}

export class Badge extends React.Component<Props> {

    render(): React.ReactChild {
        const { content, count, status, dot, offset, title } = this.props;
        return (
            <AntdBadge
                count={count}
                status={status}
                dot={dot}
                offset={offset}
                title={title}
            >
                {content}
            </AntdBadge>
        );
    }
}