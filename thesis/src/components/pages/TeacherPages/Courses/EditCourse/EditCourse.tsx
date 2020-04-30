import React from 'react';
import { Course } from '../../../../../types/types';

interface Props {
    course?: Course;
}

export class EditCourse extends React.Component<Props> {
    render (): React.ReactChild {
        const { course } = this.props;
        return (
            <h1>EditCourse {course ? course.id : null}</h1>
        );
    }
}