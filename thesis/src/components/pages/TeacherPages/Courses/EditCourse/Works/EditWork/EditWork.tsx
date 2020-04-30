import React from 'react';
import { Work } from '../../../../../../../types/types';

interface Props {
    work?: Work;
}

export class EditWork extends React.Component<Props> {

    render (): React.ReactChild {
        const { work } = this.props;                
        
        return (
            <h1>EditWork -workId-</h1> //how to get work?
        );
    }
}