import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Teacher, Course } from '../../../../types/types';

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

    private renderCourses = (): React.ReactNode => {
        return this.courses.map((course: Course) => 
            <ul key={course.id}>
                <li>{course.name}</li>
            </ul>
        );
    };
        
    render(): React.ReactChild {        
        return (
            <section>
                {'Not comleted reports'}
                {this.renderCourses()}
            </section>
        );
    }
}