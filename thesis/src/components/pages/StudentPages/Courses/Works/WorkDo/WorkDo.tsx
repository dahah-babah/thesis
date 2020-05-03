import React from 'react';
import { Course, Work, Part } from '../../../../../../types/types';
import { BorderlessTableOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Typography, Collapse, Card } from 'antd';
import styles from '../Work/Work.module.less';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

@inject('workStore')
@observer
export class WorkDo extends React.Component<any> {

    @observable work!: Work;
    private course: Course = this.props.courseStore.courses[0];

    UNSAFE_componentWillMount() {
        const workId = this.props.match.params.workId;
        this.props.workStore.fetchWorks(this.course.id);
        this.work = this.props.workStore.getWork(workId);
    }

    componentDidUpdate() {
        const workId = this.props.match.params.workId;
        this.work = this.props.workStore.getWork(workId);
    }

    private renderTitle = (): React.ReactNode => {          
        return (
            <span>
                <BorderlessTableOutlined />
                <Text mark strong className={styles.title}>{this.course.name}</Text>
                <DoubleRightOutlined />
                <Text strong className={styles.title}>
                    {this.work
                    ?   this.work.title
                    :   null}
                </Text> 
            </span>
        );
    };

    private renderDescription = (): React.ReactNode => {
        return (
            <Collapse
                bordered={true}
            >
                <Panel 
                    key={this.course ? this.course.id : 'def'} 
                    header='Description'
                >
                    <Paragraph>
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
                <Paragraph type='danger'>
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
        if (this.work) {
            return (
                this.work.files.map((file: any) =>
                 <p>{file}</p> 
                )
            );
        } else return null;
    };

    private renderParts = (): React.ReactNode => {
        if (this.work) {
            return (
                this.work.parts.map((part: Part) =>
                    <li key={part.id} className={styles.li}>
                        <Card hoverable>
                            {`${part.title} - ${part.type}`}
                        </Card>
                    </li>
                )
            );
        } else return null;
    };

    render(): React.ReactChild {
        return(
            <>
                {this.renderTitle()}
                <div className={styles.margin}>
                    {this.renderDescription()}
                </div>
                {this.renderDeadline()}
                {this.renderFiles()}
                <ul className={styles.partWrapper}>
                    {this.renderParts()}
                </ul>
            </>
        );
    }
}