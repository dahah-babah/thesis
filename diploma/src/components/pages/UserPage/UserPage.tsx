import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import styles from './UserPage.module.less';
import { Header } from '../../uui/Header/Header';
import { CustomSider } from '../../uui/Sider/Sider';
import { Breadcrumb } from '../../uui/Breadcrumb/Breadcrumb';

// interface Props {
//     userStore?: UserStore;
// }

const { Content } = Layout;

@inject('userStore')
@observer
export class UserPage extends React.Component<any> {

    // @observable user!: User;

    private renderHeader = (): React.ReactNode => {   
        const userName = this.props.userStore.user.username; 
            
        return (
            <Header 
                title='UserPage_Title'
                subtitle='UserPage_Subtitle'
                username={userName}
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
        this.props.userStore.getUser('admin', 'admin');
        return (
            <Content>
                <p className={styles.temp}>User: {this.props.userStore.user
                ? this.props.userStore.user.username
                : 'undefined'}</p>
            </Content>
        );
    };
        
    render(): React.ReactChild {        
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