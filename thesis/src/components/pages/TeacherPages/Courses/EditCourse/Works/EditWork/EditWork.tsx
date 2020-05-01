import React from 'react';
import { Course, Work } from '../../../../../../../types/types';
import styles from './EditWork.module.less';
import { Typography, Collapse } from 'antd';
import { BorderlessTableOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface Props {
    course?: Course;
}

@inject('workStore')
@observer
export class EditWork extends React.Component<Props | any> {

    @observable work!: Work;
    private courseId = this.props.courseStore.courses[0].id;

    async componentDidMount() {
        const workId = this.props.match.params.workId;

        await this.props.workStore.fetchWorks(this.courseId);
        this.work = this.props.workStore.getWork(workId);
        
    }

    async componentDidUpdate() {
        const workId = this.props.match.params.workId;

        this.work = this.props.workStore.getWork(workId);
    }

    private renderTitle = (): React.ReactNode => {
        const course = this.props.courseStore.courses[0];          
        return (
            <span>
                <BorderlessTableOutlined />
                <Text mark strong className={styles.title}>{course?.name}</Text>
                <DoubleRightOutlined />
                {/* editable */}
                <Text strong className={styles.title}>
                    {this.work
                    ?   this.work.title
                    :   null}
                </Text> 
            </span>
        );
    };

    private renderDescription = (): React.ReactNode => {
        const course = this.props.courseStore.courses[0];
        return (
            <Collapse
                bordered={true}
            >
                <Panel 
                    key={course ? course.id : 'def'} 
                    header='Description'
                >
                    {/* !not work yet: request to server + state (store) */}
                    <Paragraph editable>
                        {this.work
                        ?   this.work.description
                        :   null}
                    </Paragraph>
                </Panel>
            </Collapse>
        );
    };

    private renderDeadline = (): React.ReactNode => {        
        return (
            <div className={styles.deadline}>
                <Text className={styles.marginRight10}>Deadline:</Text>
                {/* editable  */}
                <Paragraph type='danger' editable>
                    {this.work
                    ?   this.work.deadline 
                        ?   this.work.deadline 
                        :   'no deadline'
                    :   ''}
                </Paragraph>
            </div>
        );
    };

    private renderFiles = (): React.ReactNode => {
        return (
            <div>
                <Text className={styles.marginRight10}>Files:</Text>
                {/* upload component */}
                {this.work
                // render files in column
                ?   this.work.files
                :   'no files'}
            </div>
        );
    };

    private renderParts = (): React.ReactNode => {
        // render parts [#title - type(editable)]
        return (
            null
        );
    };

    render (): React.ReactChild {                        
        return (
            <>
                {this.renderTitle()}
                <div className={styles.margin}>
                    {this.renderDescription()}
                </div>
                {this.renderDeadline()}
                {this.renderFiles()}
                <ul>{this.renderParts()}</ul>
            </>
        );
    }
}