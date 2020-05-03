import React from 'react';
import styles from './Course.module.less';
import { BorderlessTableOutlined } from '@ant-design/icons';
import { Typography, Collapse, Card } from 'antd';
import { Course, Work } from '../../../../types/types';
import { Link } from 'react-router-dom';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

export class Courses extends React.Component<any> {

    private course: Course = this.props.courseStore.courses[0];

    private renderTitle = (): React.ReactNode => {
        return (
            <span className={styles.titleWrapper}>
                <BorderlessTableOutlined />
                <Text mark strong className={styles.title}>{this.course.name}</Text>
            </span>
        );
    };

    private renderDescription = (): React.ReactNode => {
        return (
            <Collapse
                bordered={true}
            >
                <Panel 
                    key={this.course ? this.course.id : 'def'} 
                    header='Description'
                >
                    <Paragraph> 
                        {this.course.description}
                    </Paragraph>
                </Panel>
            </Collapse>
        );
    };

    private renderCourseWorks = (): React.ReactNode => {
        return (
            <div className={styles.titleWorks}>
                <Text strong underline>{`Task${this.course.works.length === 1 ? '' : 's'}: ${this.course.works.length}`}</Text>
            </div>
        );
    };

    private renderCardTitle = (work: Work): React.ReactNode => {
        const { user, course } = this.props;
        return (
            <Link
                to={`/user/${user?.id}/courses/${course?.id}/works/${work.id}`}
            >
                <span className={styles.cardTitle}>
                    <Text strong>{work.title}</Text>
                    <Text type='danger'>{work.deadline}</Text>
                </span>
            </Link>
        );
    }; 

    private renderCards = (): React.ReactNode => {
        return (
            this.course.works.map((work: Work) =>
                <li key={work.id} className={styles.li}>
                    <Card
                        hoverable
                        title={this.renderCardTitle(work)}
                    >
                        <Paragraph>{work.description}</Paragraph>
                        <Text strong>Files: {this.renderFiles(work.files)}</Text>
                    </Card>
                </li> 
            )
        );
    };

    private renderFiles = (files: any): React.ReactNode => {
        return (
            <Text type='secondary'>files</Text>
        );
    };

    render(): React.ReactChild {
        return (
            <>
                {this.renderTitle()}
                <div className={styles.margin}>{this.renderDescription()}</div>
                {this.renderCourseWorks()}
                <ul className={styles.worksWrapper}>
                    {this.renderCards()}
                </ul>
            </>
        );
    }
} 