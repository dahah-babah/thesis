import React from 'react';
import { Typography, Card, Checkbox, Divider, Modal, TreeSelect } from 'antd';
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

@inject('courseStore', 'workStore', 'userStore', 'modalStore')
@observer
export class TeacherMainPage extends React.Component<Props | any> {
        
    @observable completedReports: any[] = [];
    @observable courses: Course | Course[] = [];
    @observable works: Work[] = [];

    private treeSelectData = [
        {
            title: 'Дисциплины',
            value: '0-0',
            key: '0-0',
            children: [
              {
                title: 'Все',
                value: '0-0-0',
                key: '0-0-0',
              },
              {
                title: 'ВиМТ',
                value: '0-0-1',
                key: '0-0-1',
              },
            ],
          },
          {
            title: 'Группы',
            value: '0-1',
            key: '0-1',
            children: [
              {
                title: 'ГРУППА-1',
                value: '0-1-0',
                key: '0-1-0',
              },
              {
                title: 'ГРУППА-2',
                value: '0-1-1',
                key: '0-1-1',
              },
            ],
          },
          {
            title: 'Отчеты',
            value: '0-2',
            key: '0-2',
            children: [
              {
                title: 'Все',
                value: '0-2-0',
                key: '0-2-0',
              },
              {
                title: 'Непроверенные',
                value: '0-2-1',
                key: '0-2-1',
              },
            ],
          },
    ];

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
            <Checkbox onChange={this.onSwitchChange}/>
        );
    };

    private onSwitchChange = (event: any): void => {
        console.log(event);
        
    };

    private renderCardTitle = (completedT: any): React.ReactNode => {
        return (
            <div className={styles.cardTitle}>
                <Text strong>{`${this.props.courseStore.getCourseSgortNameById(completedT.courseId)}`}</Text>
                <Text>{`${this.props.workStore.getWork(completedT.workId).title}`}</Text>
            </div>
        );
    };

    private openCommentModal = (): void => {
        console.log('modal');
        
    }; 

    private openReport = (): void => {
        console.log('report');
        
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
                            <FilePdfOutlined key={'report'} onClick={this.openReport}/>,
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

    private renderHeader = (): React.ReactNode => {
        return (
            <TreeSelect
                className={styles.select}
                // allowClear
                defaultValue={'Непроверенные отчеты'}
                multiple
                placeholder={'Выберите опции для фильтра'}
                size={'middle'}
                showArrow
                treeData={this.treeSelectData}
                treeCheckable
                showCheckedStrategy={"SHOW_PARENT"}
            />
        );
    };

    private renderDefault = (): React.ReactNode => {
        return (
            <>
                <span className={styles.headerWrapper}>
                    <span className={styles.titleWrapper}>
                        <BorderlessTableOutlined />
                        <Text mark strong className={styles.title}>{'Выполненные работы'}</Text>
                    </span>
                    <span>
                        {this.renderHeader()}
                    </span>
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