import React from 'react';
import { Collapse as AntdCollapse } from 'antd';
import { Work } from '../../../types/types';
import styles from './Collapse.module.less';

const { Panel } = AntdCollapse;

interface Props {
    title: string;
    bordered?: boolean; 
    iconPosition?: 'right' | 'left';
    content: Work;
}

export class Collapse extends React.Component<Props> {

    private renderContent = (): React.ReactNode => {
        const { content } = this.props; 
        return (
            <p>{`Deadline: ${content.deadline ? content.deadline : '-'}`}</p>
        );
    }

    private renderPanels = (): React.ReactNode => {
        const { title, content } = this.props;
        return (
            <Panel key={content.id} header={title}>
                {this.renderContent()}
            </Panel>
        );
    };

    render(): React.ReactChild {
        const { bordered, iconPosition } = this.props;
        return (
            <AntdCollapse
                className={styles.workWrapper}
                bordered={bordered}
                expandIconPosition={iconPosition}
            >
                {this.renderPanels()}
            </AntdCollapse>
        );
    };
}