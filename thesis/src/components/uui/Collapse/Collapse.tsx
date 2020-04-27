import React from 'react';
import { Collapse as AntdCollapse } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Work, Student } from '../../../types/types';
import styles from './Collapse.module.less';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Panel } = AntdCollapse;
const { Title, Paragraph } = Typography;

interface Props {
    user: Student;
    courseId: string;
    title: string;
    bordered?: boolean; 
    iconPosition?: 'right' | 'left';
    content: Work;
}

export class Collapse extends React.Component<Props> {

    private renderContent = (): React.ReactNode => {
        const { content } = this.props; //content = work
        return (
            <>
                <span className={styles.titleWrapper}>
                    <Title className={styles.title}>{content.title}</Title>
                    <Paragraph>{` - ${content.parts.length} part${content.parts.length === 1 ? '' : 's'}`}</Paragraph>
                </span>
                <Paragraph>{`Deadline: ${content.deadline ? content.deadline : '-'}`}</Paragraph>
                <Paragraph>{`Description: ${content.description}`}</Paragraph>
                {/* correct path */}
                <Link to={`/user/${this.props.user.id}/courses/${this.props.courseId}/works/${content.id}`}>Go to tast <DoubleRightOutlined /></Link>
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