import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Test, Question, TestPoint } from '../../../../../../../types/types';
import { Input, Typography, Radio, Checkbox, Select, Form, Button } from 'antd';

const { Text } = Typography;

@inject('testStore')
@observer
export class TestComponent extends React.Component<any> {
    
    @observable test: Test = this.props.testStore.test;
    @observable testIsFinished = false;

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
                    <Radio value={point.text}>
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
                    <Checkbox value={point.text}>
                        <Text>{point.text}</Text>
                    </Checkbox> 
                )}
            </Checkbox.Group>
        );
    };

    private renderSelect = (question: Question): React.ReactNode => {
        return (
            <Select />
        );
    };

    private renderInputGroup = (point: TestPoint): React.ReactNode => {
        return (
            <Input />
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

    private onFinish = (values: any): void => {
        console.log(values);
        this.setTestFinished();
    };
    
    render(): React.ReactChild {                
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
    }
}