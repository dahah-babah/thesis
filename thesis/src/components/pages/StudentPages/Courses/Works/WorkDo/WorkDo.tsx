import React from 'react';
import { Course, Work } from '../../../../../../types/types';
import { BorderlessTableOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Typography, Collapse, Button } from 'antd';
import styles from '../../Works/Work.module.less';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { TestForm } from '../../../../../forms/TestForm/Test';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

@inject('workStore')
@observer
export class WorkDo extends React.Component<any> {

    @observable work!: Work;
    @observable testEnabled = false;
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
        if (this.work && !this.testEnabled) {
            return <p>file</p>
        } else return null;
    };

    private renderManagePanel = (): React.ReactNode => {
        if (this.work) {
            if (this.work.type === 'test') {
                return (
                    <div>
                        {!this.testEnabled
                        ?   <Button 
                                type='primary' 
                                onClick={this.enableTest}
                            >
                                START TEST
                            </Button>
                        :   null}
                    </div>
                );
            }
        }
    };

    private enableTest = (): boolean => {
        //check deadline
        //if deadline -> if overdue -> render smth 
        //else -> normal
        //start timer
        return this.testEnabled = !this.testEnabled; //true
    };

    private renderTest = (): React.ReactNode => {        
        if (this.work) {
            if (this.testEnabled) {
                return (
                    <div className={styles.margin}>
                        <TestForm {...this.props} />
                    </div>
                );
            }
        }
    };

    render(): React.ReactChild {
        return(
            <>
                {this.renderTitle()}
                <div className={styles.margin}>
                    {this.renderDescription()}
                </div>
                {this.renderDeadline()}
                {/* {this.renderFiles()} */}
                {this.renderManagePanel()}
                {this.renderTest()}
            </>
        );
    }
}