import React from 'react';
import { Course, Work } from '../../../../../../../types/types';
import styles from './EditWork.module.less';
import { Typography, Collapse, Upload, Card } from 'antd';
import { BorderlessTableOutlined, DoubleRightOutlined, InboxOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import Title from 'antd/lib/typography/Title';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { Dragger } = Upload;

interface Props {
    course?: Course;
}

@inject('workStore')
@observer
export class EditWork extends React.Component<Props | any> {

    @observable work!: Work;
    private courseId = this.props.courseStore.courses[0].id;

    UNSAFE_componentWillMount() {
        const workId = this.props.match.params.workId;
        this.props.workStore.fetchWorks(this.courseId);
        this.work = this.props.workStore.getWork(workId);
        
    }

    componentDidUpdate() {
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
                <Text editable strong className={styles.title}>
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
                defaultActiveKey={course ? course.id : 'def'}
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
        // does not work 
        const props = {

        };

        return (
            <>
                <Dragger {...props}>
                    <p className={styles.icon}>
                        <InboxOutlined />
                    </p>
                    <p>Click or drag file to this area to upload</p>
                    <p>
                        Support for a single or bulk upload. 
                        Strictly prohibit from uploading company data or other band files
                    </p>
                </Dragger>
            </>
        );
    };

    private renderAddPartCard = (): React.ReactNode => {
        return (
            <Card hoverable>
                <Title className={styles.addPartCardTitle} level={4} type='secondary'>
                    + ADD PART TO TASK
                </Title>
            </Card>
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
            </>
        );
    }
}