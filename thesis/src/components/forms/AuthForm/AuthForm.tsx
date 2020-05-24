import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './AuthForm.module.less';
import { inject, observer } from 'mobx-react';
import { User, Student, Teacher } from '../../../types/types';

@inject('authStore', 'userStore')
@observer
export class AuthForm extends React.Component<any> {

    private onSubmit = (values: any): void => {
        this.validateUser(values);
    };

    async validateUser(data: any) {
        console.log(data);        
        await this.props.authStore.findUser(data.username, data.password);

        if (this.props.authStore.user) {

            if (data.remember) {
                this.props.authStore.setIsRememberedTrue();
            }

            this.setUser(this.props.authStore.user);        
        }
    };

    private setUser = (user: User | Student | Teacher): void => {
        //set user in userStore
        this.props.userStore.setUser(user);
    };

    private renderFormItems = (): React.ReactNode => {
        return (
            <>
                <Form.Item
                    name='username'
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input 
                        prefix={ <UserOutlined /> }
                        placeholder='Username'
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={ <LockOutlined /> }
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
                        <Link to={`/user/${this.props.userStore.user ? this.props.userStore.user.id : null}/home`}>
                            Log in
                        </Link>
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