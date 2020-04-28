import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './AuthForm.module.less';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { User, Teacher, Student } from '../../../types/types';

@inject('userStore')
@observer
export class AuthForm extends React.Component<any> {

    @observable user!: User | Teacher | Student;

    private onSubmit = (values: any): void => {
        console.log(values);
        this.validateUser(values);
    };

    private validateUser = (data: any): void => {
        // this.user = this.props.userStore.findUser('dahah@babah.gmail.com', 'Student_Password'); //student
        this.user = this.props.userStore.findUser(data.username, data.password);
        console.log(this.user);
        
    };

    private renderFormItems = (): React.ReactNode => {
        return (
            <>
                <Form.Item
                    name='username'
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input 
                        prefix={ <UserOutlined className='site-form-item-icon' /> }
                        placeholder='Username'
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={ <LockOutlined className='site-form-item-icon' /> }
                        type='password'
                        placeholder='Password' 
                    />
                </Form.Item>
                <Form.Item
                    name='remember'
                    valuePropName='checked'
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                    >
                        <Link to={`/user/${this.props.userStore.getUser() ? this.props.userStore.user.id : null}/home`}>Log in</Link>
                    </Button>
                </Form.Item>
            </>
        );
    };

    render(): React.ReactChild {
        return (
            <div className={styles.container}>
                <Form
                    name='login'
                    initialValues={{ remember: false }}
                    onFinish={this.onSubmit}
                >
                    {this.renderFormItems()}
                </Form>
            </div>
        );
    }
}