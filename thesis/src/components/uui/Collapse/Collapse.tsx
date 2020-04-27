import React from 'react';
import { Collapse as AntdCollapse } from 'antd';
import { Work } from '../../../types/types';
import styles from './Collapse.module.less';
import { Typography } from 'antd';

const { Panel } = AntdCollapse;
const { Title, Paragraph } = Typography;

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
            <>
                <span className={styles.titleWrapper}>
                    <Title className={styles.title}>{content.title}</Title>
                    <Paragraph>{` - ${content.parts.length} part${content.parts.length === 1 ? '' : 's'}`}</Paragraph>
                </span>
                <Paragraph>{`Deadline: ${content.deadline ? content.deadline : '-'}`}</Paragraph>
                <Paragraph>{`Description: ${content.description}`}</Paragraph>
            </>
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