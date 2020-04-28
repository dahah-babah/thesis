import React from 'react';
import { Typography } from 'antd';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Teacher, Course, Work } from '../../../../types/types';
import { BorderlessTableOutlined } from '@ant-design/icons';
import styles from './MainPage.module.less';
import { Collapse } from '../../../uui/Collapse/Collapse';

const { Text } = Typography;

interface Props {
    user: Teacher;
}

@inject('courseStore')
@observer
export class TeacherMainPage extends React.Component<Props | any> {
        
    @observable courses: Course[] = [];

    componentDidMount() {        
        this.props.courseStore.fetchTeacherCourses(this.props.user);
        this.courses = this.props.courseStore.getCourses();        
    };

    private renderUnverifiedReports = (works: Work[], course: Course): React.ReactNode => {
        console.log(this.props.user);
        
        return (
            works.map((work: Work) =>
                <Collapse
                    key={work.id}
                    title={`${course.name} - ${work.title}`}
                    content={work}
                    user={this.props.user}
                    courseId={course.id}
                />
            )
        );
    };

    private renderCourses = (): React.ReactNode => {
        return this.courses.map((course: Course) => 
        course.works
        ?   this.renderUnverifiedReports(course.works, course)
        :   `You already completed all works on ${course.name} course! Great job!`
    );
    };
        
    render(): React.ReactChild {        
        return (
            // wrap main page content in switch
            <section>
                <span className={styles.titleWrapper}>
                    <BorderlessTableOutlined />
                    <Text mark strong className={styles.title}>{'Unverified reports'}</Text>
                </span>
                {this.renderCourses()}
            </section>
        );
    }
}