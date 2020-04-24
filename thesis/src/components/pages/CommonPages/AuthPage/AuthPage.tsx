import React from 'react';
import { Layout } from 'antd';
import './AuthPage.module.less';
import { AuthForm } from '../../../forms/AuthForm/AuthForm';

const { Content } = Layout;

export class AuthPage extends React.Component {
    render(): React.ReactChild {
        return (
            <Layout>
                <Content>
                    <AuthForm />
                </Content>
            </Layout>
        );
    }
}