import React from 'react';
import styles from './Course.module.less';
import { BorderlessTableOutlined } from '@ant-design/icons';
import { Typography, Collapse, Card } from 'antd';
import { Course, Work, User, Teacher, Student, File } from '../../../../types/types';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

@inject('userStore', 'badgeStore', 'fileStore', 'testStore')
@observer
export class Courses extends React.Component<any> {

    private course: Course = this.props.courseStore.courses[0];
    private works: Work[] = this.props.workStore.works;

    @observable user!: User | Teacher | Student;
    @observable files: File[] = [];
    @observable studentCompleted: any = [];

    async UNSAFE_componentWillMount () {
        await this.props.fileStore.getAllFilesbyCourseId('1');
        await this.props.testStore.fetchStudentCompleted(this.props.userStore.user.id);
    };

    componentDidMount() {
        this.user = this.props.userStore.getUser();
        this.files = this.props.fileStore.getFiles();
        this.studentCompleted = this.props.testStore.getStudentCompleted();

        // console.log(this.studentCompleted);
        
        
        if (this.props.userStore.user) {
            this.props.badgeStore.getCompletedTasks(this.props.userStore.user.id);
        }
    };

    componentDidUpdate() {
        if (this.props.userStore.user && this.props.badgeStore.completedTasks.length === 0) {
            this.props.badgeStore.getCompletedTasks(this.props.userStore.user.id);
        }
    };

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
            <div className={styles.courseCollapse}>
                <Collapse
                    bordered={true}
                >
                    <Panel 
                        key={this.course ? this.course.id : 'def'} 
                        header='Описание дисциплины'
                    >
                        <Paragraph> 
                            {this.course.description}
                        </Paragraph>
                    </Panel>
                </Collapse>
            </div>
        );
    };

    private renderCourseWorks = (): React.ReactNode => {
        return (
            <div className={styles.titleWorks}>
                <Text strong underline>{`Количество лабоарторных работ: ${this.works.length}`}</Text>
            </div>
        );
    };

    private renderCardTitle = (work: Work): React.ReactNode => {
        const { user } = this.props;
        return (
            <Link
                to={`/user/${user.id}/courses/${this.course.id}/works/${work.id}/do`}
            >
                <span className={styles.cardTitle}>
                    <Text strong>{`ЛР № ${work.id} - ${work.title}`}</Text>
                    <Text type='danger'>{work.deadline}</Text>
                </span>
            </Link>
        );
    }; 

    private renderCards = (): React.ReactNode => {
        return (
            this.works.map((work: Work) =>
                <li key={work.id} className={styles.li}>
                    <Card
                        className={
                            this.props.badgeStore.isTaskCompleted(work.id)
                            ?   this.props.badgeStore.getLabStatus(work.id) === 'success'
                                    ?   styles.backGreenColor
                                    :   this.props.badgeStore.getLabStatus(work.id) === 'warning'
                                        ?   styles.backWarColor
                                        :   styles.backErrorColor
                            :   styles.backDefaultColor
                        }
                        hoverable
                        title={this.renderCardTitle(work)}
                    >
                        {this.renderCompleted(work)}
                        <Paragraph>{work.description}</Paragraph>
                        {this.renderFiles(work.id)}
                    </Card>
                </li> 
            )
        );
    };

    private renderCompleted = (work: Work): React.ReactNode => {
        if (this.studentCompleted.find((completedWork: any) => work.id === completedWork.workId)) {
            return ( 
               this.studentCompleted
               .filter((completedWork: any) => work.id === completedWork.workId)
               .map((completedWork: any) =>
                    <div key={completedWork.id} className={styles.dataWrapper}>
                        <Text key={completedWork.id} strong code className={styles.date}>
                            {`Выполнено: ${completedWork.date}`}
                        </Text>
                    </div>
               )
            )
        } else return null;
    }; 

    private renderFiles = (id: string): React.ReactNode => {
        if (this.props.fileStore.files) {
            
            return ( 
                <div className={styles.filesWrapper}>
                    {
                        this.props.fileStore.files
                        .filter((file: File) => file.workId === id)
                        .map((file: File) =>
                            <Link key={file.id} to=''>
                                {/* <Text 
                                    key={file.id} 
                                    type='secondary'
                                    underline
                                > */}
                                    {file.filename}
                                {/* </Text> */}
                            </Link>
                        )
                    }
                </div>
            );
        } else return null;
    };

    render(): React.ReactChild {
        return (
            <section className={styles.mainWrapper}>
                {this.renderTitle()}
                <div className={styles.margin}>{this.renderDescription()}</div>
                {this.renderCourseWorks()}
                <ul className={styles.worksWrapper}>
                    {this.renderCards()}
                </ul>
            </section>
        );
    }
} 