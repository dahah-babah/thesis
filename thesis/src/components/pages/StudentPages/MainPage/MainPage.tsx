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

@inject('courseStore')
@observer
export class StudentMainPage extends React.Component<Props | any> {

    @observable courses: Course[] = [];

    UNSAFE_componentWillMount() {
        // get course id for student 
        const courseId: string | string[] = '';
        this.props.courseStore.fetchStudentCourses(courseId);
        this.courses = this.props.courseStore.getCourses();        
    };

    private renderNotCompletedWorks = (works: Work[], course: Course): React.ReactNode => {       
        return (
            works.map((work: Work) =>
                <Collapse
                    key={work.id}
                    title={`${course.name} - ${work.title}`}
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
            ?   this.renderNotCompletedWorks(course.works, course)
            :   `You already completed all works on ${course.name} course! Great job!`
        );
    };

    private renderDefault = (): React.ReactNode => {
        return (
            <>
                <span className={styles.titleWrapper}>
                    <BorderlessTableOutlined />
                    <Text mark strong className={styles.title}>{'Not comleted tasks'}</Text>
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