import React from 'react';
import { Course } from '../../../../../../../types/types';

interface Props {
    course: Course;
}

export class AddWork extends React.Component<Props> {
    render(): React.ReactChild {
        return (
            <p>add work page</p>
        );
    }
}