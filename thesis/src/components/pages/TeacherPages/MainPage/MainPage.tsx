import React from 'react';
import { Typography } from 'antd';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Teacher, Course, Work } from '../../../../types/types';
import { BorderlessTableOutlined } from '@ant-design/icons';
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

@inject('courseStore')
@observer
export class TeacherMainPage extends React.Component<Props | any> {
        
    @observable courses: Course[] = [];

    UNSAFE_componentWillMount() {        
        //get course id for teacher
        const courseId: string | string[] = ''; //mock => get from store
        this.props.courseStore.fetchTeacherCourses(courseId);
        this.courses = this.props.courseStore.getCourses();                
    };

    private formCollapseTitle = (course: Course, work: Work): string => {
        // mock
        return `${course.shortName} - ${work.title} - student_group - student_lastname`;
    }

    private renderUnverifiedReports = (works: Work[], course: Course): React.ReactNode => {
        return (
            works.map((work: Work) =>
                <Collapse
                    key={work.id}
                    title={this.formCollapseTitle(course, work)}
                    content={work}
                    user={this.props.user}
                    courseId={course.id}
                    iconPosition={'right'}
                />
            )
        );
    };

    private renderCourses = (): React.ReactNode => {
        return this.courses.map((course: Course) => 
            course.works
            ?   this.renderUnverifiedReports(course.works, course)
            :   `You already verified all reports! Great job!`
        );
    };

    private renderDefault = (): React.ReactNode => {
        return (
            <>
                <span className={styles.titleWrapper}>
                    <BorderlessTableOutlined />
                    <Text mark strong className={styles.title}>{'Unverified reports'}</Text>
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
                    
                    <Route path={PATH.COURSEEDIT}>
                        <EditCourse
                            course={this.courses[0]}
                            user={this.props.user} 
                        />
                    </Route>

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