import React from 'react';
import { Typography, Card, Switch as AntdSwitch, Divider } from 'antd';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Teacher, Course, Work } from '../../../../types/types';
import { BorderlessTableOutlined, CommentOutlined, FilePdfOutlined } from '@ant-design/icons';
import styles from './MainPage.module.less';
import { Collapse } from '../../../uui/Collapse/Collapse';
import { Switch, Route } from 'react-router';
import { EditCourse } from '../Courses/EditCourse/EditCourse';
import { PATH } from '../../../../routes/paths';
import { EditWork } from '../Courses/EditCourse/Works/EditWork/EditWork';
import { AddWork } from '../Courses/EditCourse/Works/AddWork/AddWork';
import { TeacherStatistic } from '../Statistic/Statistic';

const { Text } = Typography;

interface Props {
    user: Teacher;
}

@inject('courseStore', 'workStore', 'userStore')
@observer
export class TeacherMainPage extends React.Component<Props | any> {
        
    @observable completedReports: any[] = [];
    @observable courses: Course | Course[] = [];
    @observable works: Work[] = [];

    async UNSAFE_componentWillMount() {        
        //get course id for teacher
        const courseId: string | string[] = '1'; //mock => get from store
        await this.props.courseStore.fetchTeacherCourses(courseId);   
        await this.props.courseStore.fetchCourses();
        await this.props.workStore.fetchWorks('1');
        await this.props.userStore.fetchStudents();
    };

    componentDidMount () {
        this.completedReports = this.props.courseStore.getSetcompletedReports(); 
        this.works = this.props.workStore.getWorks();
    };

    private renderSwitch = (completedT: any): React.ReactNode => {
        return (
            <AntdSwitch />
        );
    };

    private renderCardTitle = (completedT: any): React.ReactNode => {
        return (
            <div className={styles.cardTitle}>
                <Text strong>{`${this.props.courseStore.getCourseSgortNameById(completedT.courseId)}`}</Text>
                <Text>{`${this.props.workStore.getWork(completedT.workId).title}`}</Text>
            </div>
        );
    };

    private openCommentModal = (data: any): void => {
        console.log(data);
        
    }; 

    private renderUnverifiedReports = (): React.ReactNode => {
        return (
            this.props.courseStore.completedReports.map((completed: any) => 
                <li
                    key={completed.id}
                    className={styles.listItem}
                >
                    <Card
                        key={completed.id}
                        title={this.renderCardTitle(completed)}
                        actions={[
                            <CommentOutlined key={'comment'} onClick={this.openCommentModal}/>,
                            <FilePdfOutlined />,
                            this.renderSwitch(completed),
                        ]}
                        className=
                            {
                                completed.rate >= 70
                                ?   styles.backGreenColor
                                :   completed.rate >= 55
                                    ?   styles.backWarColor
                                    :   styles.backErrorColor
                            }
                    >
                        <Text>
                            {`Группа:`}
                            <Text strong> {this.props.userStore.findUserDataById(completed.userId).group}</Text>
                        </Text>

                        <Divider />

                        <Text>
                            {`Студент:`}
                            <Text strong> {this.props.userStore.findUserDataById(completed.userId).lastname}</Text>
                            <Text strong> {this.props.userStore.findUserDataById(completed.userId).name}</Text>
                        </Text>

                        <Divider/>

                        <Text>
                            {`Итоговый балл:`} <Text strong code> {completed.rate}</Text>
                        </Text>
                    </Card>
                </li>
            )
        );
    };

    private renderCourses = (): React.ReactNode => {
        return (this.props.courseStore.completedReports
            ?   <ul className={styles.listWrapper}>
                    {this.renderUnverifiedReports()}
                </ul>
            :   `Вы проверели все роботы студентов! Отличная работа!`
        );
    };

    private renderDefault = (): React.ReactNode => {
        return (
            <>
                <span className={styles.titleWrapper}>
                    <BorderlessTableOutlined />
                    <Text mark strong className={styles.title}>{'Выполненные работы'}</Text>
                </span>
                {this.renderCourses()}
            </>
        );
    };
        
    render(): React.ReactChild {        
        return (
            <section>
                <Switch>

                    <Route 
                        exact 
                        path={`${PATH.USER}/home`} 
                        render={() => this.renderDefault()} 
                    />

                    <Route 
                        path={PATH.WORKEDIT} 
                        render={(matchProps) => <EditWork {...matchProps} {...this.props} />} 
                    />

                    <Route path={PATH.WORKADD}>
                        <AddWork {...this.props} />
                    </Route>
                    
                    {/* <Route path={PATH.COURSEEDIT}>
                        <EditCourse
                            course={this.courses[0]}
                            user={this.props.user} 
                        />
                    </Route> */}

                    <Route path={PATH.STATISTIC}>
                        {this.props.user
                        ?   <TeacherStatistic {...this.props} />
                        :   null}
                    </Route>

                </Switch>
            </section>
        );
    }
}