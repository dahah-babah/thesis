import React from 'react';
import { Course, Work, Teacher } from '../../../../../types/types';
import styles from './EditCourse.module.less';
import { BorderlessTableOutlined } from '@ant-design/icons';
import { Typography, Collapse, Card, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Text, Paragraph, Title } = Typography;
const { Panel } = Collapse;

interface Props {
    course?: Course;
    user?: Teacher;
}

export class EditCourse extends React.Component<Props> {

    private renderTitle = (): React.ReactNode => {
        const { course } = this.props;
        return (
            <span className={styles.titleWrapper}>
                <BorderlessTableOutlined />
                <Text mark strong className={styles.title}>{course?.name}</Text>
            </span>
        );
    };

    private renderDescription = (): React.ReactNode => {
        const { course } = this.props;
        return (
            <Collapse
                bordered={true}
            >
                <Panel 
                    key={course ? course.id : 'def'} 
                    header='Description'
                >
                    {/* !not work yet: request to server + state (store) */}
                    <Paragraph editable> 
                        {course?.description}
                    </Paragraph>
                </Panel>
            </Collapse>
        );
    };

    private renderCourseWorks = (): React.ReactNode => {
        const { course } = this.props;
        return (
            <div className={styles.titleWorks}>
                <Text strong underline>{`Task${course?.works.length === 1 ? '' : 's'}: ${course?.works.length}`}</Text>
            </div>
        );
    };

    private renderCardTitle = (work: Work): React.ReactNode => {
        const { user, course } = this.props;
        return (
            <Link
                to={`/user/${user?.id}/courses/${course?.id}/works/${work.id}/edit`}
            >
                <span className={styles.cardTitle}>
                    <Text strong>{work.title}</Text>
                    <Text type='danger'>{work.deadline}</Text>
                </span>
            </Link>
        );
    }; 

    private renderFiles = (files: any): React.ReactNode => {
        return (
            <Text type='secondary'>files</Text>
        );
    };

    private renderButtons = (workId: string): React.ReactNode => {
        const { user, course } = this.props;
        return (
            <>
                <Button type='default'>
                    <Link
                        to={`/user/${user?.id}/courses/${course?.id}/works/${workId}/edit`}
                    >
                        EDIT
                    </Link>
                </Button>
                <Button 
                    danger 
                    className={styles.margintLeft10} 
                    onClick={() => console.log('delete work ' + workId)}
                >
                    DELETE
                </Button>
            </>
        );
    };

    private renderCards = (): React.ReactNode => {
        const { course } = this.props;
        return (
            course?.works.map((work: Work) =>
                <li key={work.id} className={styles.li}>
                    <Card
                        hoverable
                        title={this.renderCardTitle(work)}
                    >
                        <Paragraph editable>{work.description}</Paragraph>
                        <Text strong>Files: {this.renderFiles(work.files)}</Text>
                        <div className={styles.cardButtons}>{this.renderButtons(work.id)}</div>
                    </Card>
                </li> 
            )
        );
    };

    private renderAddWorkCard = (): React.ReactNode => {
        const { user, course } = this.props;
        return (
            <Card hoverable>
                <Title className={styles.addWorkCardTitle} level={4} type='secondary'>
                    <Link to={`/user/${user?.id}/courses/${course?.id}/works/new`}>+ ADD TASK</Link>
                </Title>
            </Card>
        );
    };

    render (): React.ReactChild {
        return (
            <>
                {this.renderTitle()}
                <div className={styles.margin}>{this.renderDescription()}</div>
                {this.renderCourseWorks()}
                <ul className={styles.worksWrapper}>
                    {this.renderCards()}
                    <li key={'add'} className={styles.li}>
                        {this.renderAddWorkCard()}
                    </li>
                </ul>
            </>
        );
    }
}