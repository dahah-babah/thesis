import React from 'react';
import { Collapse as AntdCollapse } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Work, Student, Teacher } from '../../../types/types';
import styles from './Collapse.module.less';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Panel } = AntdCollapse;
const { Title, Paragraph } = Typography;

interface Props {
    user: Student | Teacher;
    courseId: string;
    title: string;
    bordered?: boolean; 
    iconPosition?: 'right' | 'left';
    content: Work;
}

export class Collapse extends React.Component<Props> {

    private renderStudentTasks = (): React.ReactNode => {
        const { content, user, courseId } = this.props; //content = work        
        if (user && content) {
            return (
                <>
                    <span className={styles.titleWrapper}>
                        <Title className={styles.title}>{content.title}</Title>
                    </span>
                    <Paragraph>{`Deadline: ${content.deadline ? content.deadline : '-'}`}</Paragraph>
                    <Paragraph>{`Description: ${content.description}`}</Paragraph>
                    {/* correct path */}
                    <Link to={`/user/${user.id}/courses/${courseId}/works/${content.id}/do`}>Go to tast <DoubleRightOutlined /></Link>
                </>
            );
        } else return 'null';
    };

    private renderTeacherTasks = (): React.ReactNode => {
        const { content, user, courseId } = this.props; //content = work        
        if (user && content) {
            return (
                <>
                    <span className={styles.titleWrapper}>
                        <Title className={styles.title}>{content.title}</Title>
                    </span>
                    <span>
                        <Paragraph>{`Deadline: ${content.deadline ? content.deadline : '-'}`}</Paragraph>
                        <Paragraph>{`Date: here is date for student`}</Paragraph>
                    </span>
                    <Paragraph>{`Mark: mark of student`}</Paragraph>
                    {/* correct path - ? */}
                    <Link to={`/user/${user.id}/courses/${courseId}/works/${content.id}`}>View report<DoubleRightOutlined /></Link>
                </>
            );
        } else return 'null';
    };

    private renderContent = (): React.ReactNode => {
        const { user: { role } } = this.props;
        if (role === 'student') return this.renderStudentTasks();
        else return this.renderTeacherTasks();
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