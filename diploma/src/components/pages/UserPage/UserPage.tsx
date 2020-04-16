import React from 'react';
import { Layout } from 'antd';
import styles from './UserPage.module.less';
import { APIService } from '../../../services/APIService';
import { Header } from '../../uui/Header/Header';
import { CustomSider } from '../../uui/Sider/Sider';
import { Breadcrumb } from '../../uui/Breadcrumb/Breadcrumb';

const { Content } = Layout;

export class UserPage extends React.Component {

    private getUsername = (): void => {
        const user = APIService.getUser('123');
    }

    private renderHeader = (): React.ReactNode => {
        return (
            <Header 
                title='UserPage_Title'
                subtitle='UserPage_Subtitle'
                username={'username'}
            />
        );
    };

    private renderSider = (): React.ReactNode => {
        return (
            <CustomSider />
        );
    };

    private renderBreadcrumb = (): React.ReactNode => {
        return (
            <Breadcrumb />
        );
    };

    private renderContent = (): React.ReactNode => {
        return (
            <Content>
                <p className={styles.temp}>UserPage</p>
            </Content>
        );
    };

    render(): React.ReactChild {
        this.getUsername();
        return (
            <>
                <Layout>
                    {this.renderSider()}
                    <Layout>
                        {this.renderHeader()}
                        {this.renderBreadcrumb()}
                        {this.renderContent()}
                    </Layout>
                </Layout>
            </>
        );
    }
}