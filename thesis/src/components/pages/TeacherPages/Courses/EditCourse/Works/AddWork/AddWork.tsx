import React from 'react';
import { Course, Work } from '../../../../../../../types/types';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { BorderlessTableOutlined, DoubleRightOutlined, InboxOutlined } from '@ant-design/icons';
import { Typography, Upload, Card } from 'antd';
import styles from './AddWork.module.less';

const { Text, Paragraph, Title } = Typography;
const { Dragger } = Upload;

interface Props {
    course?: Course;
}

@inject('workStore')
@observer
export class AddWork extends React.Component<Props | any> {

    @observable work!: Work;
    private courseId = this.props.courseStore.courses[0].id;

    private renderTitle = (): React.ReactNode => {
        const course = this.props.courseStore.courses[0];          
        return (
            <span>
                <BorderlessTableOutlined />
                <Text mark strong className={styles.title}>{course?.name}</Text>
                <DoubleRightOutlined />
                {/* editable */}
                <Text editable strong className={styles.title}>
                    {'Dfault TaskName'}
                </Text> 
            </span>
        );
    };

    private renderDescription = (): React.ReactNode => {
        return (
            <span>
                <Text strong>Description</Text>
                <Paragraph editable>
                    {'Default description'}
                </Paragraph>
            </span>
        );
    };

    private renderDeadline = (): React.ReactNode => {        
        return (
            <div className={styles.deadline}>
                <Text strong className={styles.marginRight10}>Deadline:</Text>
                {/* editable  */}
                <Paragraph type='danger' editable>
                    {'No deadline'}
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

    
    render(): React.ReactChild {
        return (
            <>
                {this.renderTitle()}
                <div className={styles.margin}>
                    {this.renderDescription()}
                </div>
                {this.renderDeadline()}
                {this.renderFiles()}
                {/* <ul className={styles.partWrapper}>
                    {this.renderParts()}
                    <li key={'addPart'} className={styles.li}>
                        {this.renderAddPartCard()}
                    </li>
                </ul> */}
            </>
        );
    }
}