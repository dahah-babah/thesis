import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Course, Student } from '../../../../types/types';
import { Collapse } from '../../../uui/Collapse/Collapse';

interface Props {
    user: Student;
}

@inject('courseStore')
@observer
export class StudentMainPage extends React.Component<Props | any> {

    @observable courses: Course[] = [];

    componentDidMount() {        
        this.props.courseStore.fetchStudentCourses(this.props.user);
        this.courses = this.props.courseStore.getCourses();        
    };

    private renderCourses = (): React.ReactNode => {
        return this.courses.map((course: Course) => 
            <Collapse 
                key={course.id}
                title={course.name}
            />
        );
    };
        
    render(): React.ReactChild {        
        return (
            <section>
                {'Not comleted courses'}
                {this.renderCourses()}
            </section>
        );
    }
}