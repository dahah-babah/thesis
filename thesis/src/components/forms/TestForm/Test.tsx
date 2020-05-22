import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { Test, Question, TestPoint } from '../../../types/types';
import { Input, Typography, Radio, Checkbox, Select, Form, Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './Test.module.less';

const { Text } = Typography;

@inject('testStore')
@observer
export class TestForm extends React.Component<any> {
    
    @observable test: Test = this.props.testStore.test;
    @observable correctAnswers: any = [];
    @observable testIsFinished = false;
    @observable rate: string = '';

    private courseId = this.props.match.params.courseId;
    private workId = this.props.match.params.workId;

    UNSAFE_componentWillMount() {
        this.props.testStore.fetchTest(this.courseId, this.workId);       
    };

    componentDidUpdate() {
        this.test = this.props.testStore.getTest();
    };

    private setTestFinished = (): void => {
        this.testIsFinished = true;
    };

    private renderRadioGroup = (question: Question): React.ReactNode => {
        return (
            <Radio.Group>
                {question.points.map((point) => 
                    <Radio value={point.id} disabled={this.testIsFinished}>
                        <Text>{point.text}</Text>
                    </Radio>
                )}
            </Radio.Group>
        );
    };

    private renderCheckboxGroup = (question: Question): React.ReactNode => {
        return (
            <Checkbox.Group>
                {question.points.map((point) =>
                    <Checkbox value={point.id} disabled={this.testIsFinished}>
                        <Text>{point.text}</Text>
                    </Checkbox> 
                )}
            </Checkbox.Group>
        );
    };

    private renderSelect = (question: Question): React.ReactNode => {
        return (
            <Select disabled={this.testIsFinished} />
        );
    };

    private renderInputGroup = (point: TestPoint): React.ReactNode => {
        return (
            <Input disabled={this.testIsFinished} />
        );
    };

    private renderQuestions = (): React.ReactNode => {        
        if (this.test) {
            return (
                this.test[0].questions.map((question) =>
                    <Form.Item 
                        label={question.title} 
                        name={question.id}
                        rules={[{ required: true, message: 'Please, fill all fields!' }]}
                    >
                        {
                            question.type === 'radio'
                            ?   this.renderRadioGroup(question)
                            :   question.type === 'checkbox'
                                ?   this.renderCheckboxGroup(question)
                                :   question.type === 'select'
                                    ?   this.renderSelect(question)
                                    :   this.renderInputGroup(question.points[0])
                        }
                    </Form.Item>
                )
            );
        }
    };

    private getCorrectAnswers = (): any => {
        if (this.test) {   
            console.log('correct answers');
            
            console.log(this.correctAnswers = this.props.testStore.test[0].questions.map((question) => 
            question.isCorrectId));
            
            return this.correctAnswers = this.props.testStore.test[0].questions.map((question) => 
                question.isCorrectId
            );
        }
    };

    private calculateSuccess = (answers: any): boolean[] => {
        this.correctAnswers = this.getCorrectAnswers();

        const testLen = this.correctAnswers.length;
        
        let success: boolean[] = [];

        for (let i = 0; i < testLen; i++) {
            if (typeof answers[i] === 'string') {
                success.push(toJS(this.correctAnswers[i]) === answers[i]);
                
            } else if (typeof answers[i] === 'object') {
                const coorectLen = toJS(this.correctAnswers[i]).length;
                answers[i].sort();

                let isCorrect = true;
                
                for (let k = 0; k < coorectLen; k++) {                    
                    if (!(toJS(this.correctAnswers[i])[k].id === answers[i][k])) {
                        isCorrect = false;
                    }
                }

                success.push(isCorrect);
            }
        }
        
        return success;        
    };

    private calculateRate = (success: boolean[]): number => {        
        const numOfAnswers = success.length;
        const weight = (100 / numOfAnswers).toFixed(2);
        const numNotFailed = success.filter((bool: boolean) => bool === true).length;
        return Number(weight) * numNotFailed;
    };

    private onFinish = (values: any): void => {
        //finish timer 
        this.calculateTime();
        this.setTestFinished();
        this.rate = (Math.round(this.calculateRate(this.calculateSuccess(values)))).toString();   
        // this.props.testStore.postCompletedTest(
        //     this.props.match.params.userId,
        //     this.courseId,
        //     this.workId,
        //     this.rate
        // );
    };

    private calculateTime = (): void | Date => {
        console.log('calculated time');
        //time start
        //time finished
    };
    
    render(): React.ReactChild {            
        if (!this.testIsFinished) {
            return (
                <Form onFinish={this.onFinish}>
                    {this.renderQuestions()}
                    <Form.Item>
                        <Button 
                            type='primary' 
                            htmlType='submit'
                            disabled={this.testIsFinished}
                        >
                            FINISH TEST
                        </Button>
                    </Form.Item>
                </Form>
            );
        } else {
            return (
                <section className={styles.resultsWrapper}>
                    <Text>Test is finished! Your result is {this.rate}!</Text>
                    {this.rate === '100' ? 'You r the BEST' : null}
                    <Text>TIME: /calculated time/</Text>
                    <Text>
                        <Link to={`/user/${this.props.match.params.userId}/statistic`}>
                            See your statistic <DoubleRightOutlined />
                        </Link>
                    </Text> 
                </section>
            );
        }
    }
}