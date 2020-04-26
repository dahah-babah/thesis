import React from 'react';
import { Collapse as AntdCollapse } from 'antd';

const { Panel } = AntdCollapse;

interface Props {
    title: string;
    bordered?: boolean; 
    iconPosition?: 'right' | 'left';
}

export class Collapse extends React.Component<Props> {

    private renderPanels = (): React.ReactNode => {
        const { title } = this.props;
        return (
            <Panel key={1} header={title}>
                {'tetxt'}
            </Panel>
        );
    };

    render(): React.ReactChild {
        const { bordered, iconPosition } = this.props;
        return (
            <AntdCollapse
                bordered={bordered}
                expandIconPosition={iconPosition}
            >
                {this.renderPanels()}
            </AntdCollapse>
        );
    };
}