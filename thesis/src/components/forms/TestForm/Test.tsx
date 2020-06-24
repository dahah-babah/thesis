import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Test, Question, TestPoint } from '../../../types/types';
import { Input, Typography, Radio, Checkbox, Select, Form, Button, Result } from 'antd';
import { DoubleRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './Test.module.less';

const { Text } = Typography;

@inject('testStore')
@observer
export class TestForm extends React.Component<any> {
    
    @observable test: Test = this.props.testStore.test;
    @observable rate: string = '';

    private courseId = this.props.match.params.courseId;
    private workId = this.props.match.params.workId;

    UNSAFE_componentWillMount() {
        this.props.testStore.fetchTest(this.courseId, this.workId);       
    };

    componentDidUpdate() {
        this.test = this.props.testStore.getTest();
    };

    private renderRadioGroup = (question: Question): React.ReactNode => {
        return (
            <Radio.Group className={styles.questionWpapper}>
                {question.points.map((point) => 
                    <Radio key={point.id} value={point.id} disabled={this.props.testStore.testIsFinished}>
                        <Text>{point.text}</Text>
                    </Radio>
                )}
            </Radio.Group>
        );
    };

    private renderCheckboxGroup = (question: Question): React.ReactNode => {
        return (
            <Checkbox.Group className={styles.questionWpapper}>
                {question.points.map((point) =>
                    <Checkbox key={point.id} value={point.id} disabled={this.props.testStore.testIsFinished}>
                        <Text>{point.text}</Text>
                    </Checkbox> 
                )}
            </Checkbox.Group>
        );
    };

    private renderSelect = (question: Question): React.ReactNode => {
        return (
            <Select disabled={this.props.testStore.testIsFinished} />
        );
    };

    private renderInputGroup = (point: TestPoint): React.ReactNode => {
        return (
            <Input disabled={this.props.testStore.testIsFinished} />
        );
    };

    private renderQuestions = (): React.ReactNode => {        
        if (this.test) {
            return (
                this.test[0].questions.map((question) =>
                    <Form.Item 
                        key={question.id}
                        label={question.title} 
                        name={question.id}
                        rules={[{ required: true, message: 'Все поля обязательны для заполнения!' }]}
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

    private onFinish = (values: any): void => {
        //finish timer here
        
        this.props.testStore.calculateTime();
        this.props.testStore.setTestFinished();
        this.rate = 
        (Math.round
        (this.props.testStore.calculateRate
        (this.props.testStore.calculateSuccess(values))))
        .toString();

        //  add time + form reporttt aaaaaa

        // this.props.testStore.postCompletedTest(
        //     this.props.match.params.userId,
        //     this.courseId,
        //     this.workId,
        //     this.rate
        // );
    };

    private seeStatistics = (): React.ReactNode => {
        return (
            <Link to={`/user/${this.props.match.params.userId}/statistic`}>
                На страницу успеваемости <DoubleRightOutlined />
            </Link>
        );
    };

    private renderReporButton = (): React.ReactNode => {
        return (
            <Link to=''>
                <Button type={'link'}>ОТЧЕТ</Button>
            </Link>
        );
    };
    
    render(): React.ReactChild {            
        if (!this.props.testStore.testIsFinished) {
            return (
                <Form 
                    onFinish={this.onFinish}
                    className={styles.formWrapper}
                >
                    {this.renderQuestions()}
                    <Form.Item>
                        <div className={styles.btnStop}>
                            <Button 
                                type='primary' 
                                htmlType='submit'
                                disabled={this.props.testStore.testIsFinished}
                            >
                                ЗАКОНЧИТЬ ТЕСТ
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            );
        } else {
            return (
                <section className={styles.resultsWrapper}>
                    <Result
                        icon={<CheckOutlined />}
                        title={`Тест окончен! Вы набрали ${this.rate}% правильных ответов!`}
                        subTitle={this.seeStatistics()}
                        extra={this.renderReporButton()}
                    />
                </section>
            );
        }
    }
}