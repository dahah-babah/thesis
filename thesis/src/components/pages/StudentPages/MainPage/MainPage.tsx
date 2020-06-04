import React from 'react';
import { Typography } from 'antd';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Course, Student, Work } from '../../../../types/types';
import { Collapse } from '../../../uui/Collapse/Collapse';
import styles from './MainPage.module.less';
import { BorderlessTableOutlined } from '@ant-design/icons'; 
import { Switch, Route } from 'react-router';
import { PATH } from '../../../../routes/paths';
import { StudentStatistic } from '../Statistic/Statistic';
import { Courses } from '../Courses/Course';
import { WorkDo } from '../Courses/Works/WorkDo/WorkDo';

const { Text } = Typography;

interface Props {
    user: Student;
}

@inject('courseStore', 'workStore', 'testStore')
@observer
export class StudentMainPage extends React.Component<Props | any> {

    @observable courses: Course[] = [];
    @observable works: Work[] = [];
    @observable studentCompleted: any[] = [];
    @observable notCompletedTasks: Work[] = [];

    
    async UNSAFE_componentWillMount() {
        // get course id for student 
        const courseId: string | string[] = '1'; 
        
        // i can`t really undersand  WHY SUKA BITCH this request doesn`t work, blyat`        
        await this.props.testStore.fetchStudentCompleted(this.props.user.id);        
        this.studentCompleted = this.props.testStore.getStudentCompleted();
        // console.log(this.studentCompleted);

        await this.props.courseStore.fetchStudentCourses(this.props.user.id, courseId);
        this.courses = this.props.courseStore.getCourses();   
        // console.log(this.courses);

        await this.props.workStore.fetchWorks(courseId);        
        this.works = this.props.workStore.getWorks();
        // console.log(this.works);
        
        this.setValues();   
    };

    private setValues = (): void => {
        this.courses = this.props.courseStore.getCourses();
        this.works = this.props.workStore.getWorks();  
        this.studentCompleted = this.props.testStore.getStudentCompleted();             
        this.notCompletedTasks = this.getNotCompletedTasks();
    };

    // componentDidMount() {
    //     this.courses = this.props.courseStore.getCourses();
    //     this.works = this.props.workStore.getWorks();  
    //     this.studentCompleted = this.props.testStore.getStudentCompleted();             
    //     this.notCompletedTasks = this.getNotCompletedTasks();
    // };

    // componentDidUpdate() {
    //     this.courses = this.props.courseStore.getCourses();
    //     this.works = this.props.workStore.getWorks();  
    //     this.studentCompleted = this.props.testStore.getStudentCompleted();             
    //     this.notCompletedTasks = this.getNotCompletedTasks();
    // };

    private getNotCompletedTasks = (): Work[] => {
        // all course tasks 
        this.works = this.props.workStore.getWorks();
        
        // get completed tasks
        // doesn`t work
        this.studentCompleted = this.props.testStore.getStudentCompleted();  
        // console.log(this.studentCompleted);

        let notCompletedTasks = this.works;

        for (let i = 0; i < this.studentCompleted.length; i++) {
            if (this.works[i].id === this.studentCompleted[i].workId) {
                // works or not i dont know
                notCompletedTasks.splice(i, 1);
            }
        }

        return notCompletedTasks;
    };

    renderNotCompletedWorks = (course: Course): React.ReactNode => {
        // mock filter -> getStudentCompleted doesn`t work
        return this.notCompletedTasks
            .filter((work: Work) =>
                work.id > '3'
            )
            .map((work: Work) =>
            <li 
                key={work.id}
                className={styles.listElem}
            >
                <Collapse
                    key={work.id}
                    title={`${course.shortName} : ЛР№ ${work.id} - ${work.title}`}
                    content={work}
                    user={this.props.user}
                    courseId={course.id}
                    iconPosition={'right'}
                /> 
             </li>
        )
    };

    private renderCourses = (): React.ReactNode => {                        
        return ( 
            <ul className={styles.listWrapper}>
                {this.courses.map((course: Course) =>       
                    this.renderNotCompletedWorks(course)
                )}
            </ul>
        );
    };

    private renderDefault = (): React.ReactNode => {
        return (
            <>
                <span className={styles.titleWrapper}>
                    <BorderlessTableOutlined />
                    <Text mark strong className={styles.title}>{'Незавершенные работы'}</Text>
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
                        path={PATH.WORKDO}
                        render={(matchProps) => <WorkDo {...matchProps} {...this.props} />} 
                    />

                    <Route path={PATH.COURSE}>
                        <Courses {...this.props} />
                    </Route>

                    <Route path={PATH.STATISTIC}>
                        {this.props.user
                        ?   <StudentStatistic {...this.props} />
                        :   null}
                    </Route>

                </Switch>
            </section>
        );
    }
}