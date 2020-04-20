import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import styles from './UserPage.module.less';
import { Header } from '../../uui/Header/Header';
import { CustomSider } from '../../uui/Sider/Sider';
import { Breadcrumb } from '../../uui/Breadcrumb/Breadcrumb';
import { User, Student, Teacher } from '../../../types/types';

// interface Props {
//     userStore?: UserStore;
// }

const { Content } = Layout;

@inject('userStore')
@observer
export class UserPage extends React.Component<any> {

    @observable user!: User | Teacher | Student;

    componentDidMount = (): void => {
        // this.user = this.props.userStore.findUser('admin', 'admin'); //admin
        this.user = this.props.userStore.findUser('dahah@babah.gmail.com', 'Student_Password'); //student
        // this.user = this.props.userStore.findUser('Teacher_Username', 'Teacher_Password'); //teacher

        //todo
        //перенос выборку юзера в авторизацию
    };

    private formTitle = (): string => {
        if (this.props.userStore.user) {
            if (this.props.userStore.user.role === 'admin') {
                return 'Administrator';
            } else {
                return `${this.props.userStore.user.info.name} 
                        ${this.props.userStore.user.info.lastname}`;
            }
        } else {
            return 'Undefined';
        }
    };

    private formSubtitle = (): string => {
        if (this.props.userStore.user) {
            if (this.props.userStore.user.role === 'student') {
                return `${this.props.userStore.user.info.group}`;
            } else {
                return '';
            }
        } else {
            return 'Undefined';
        }
    };

    private renderHeader = (): React.ReactNode => {   
        // this.props.userStore.getUser('admin', 'admin');
        // const userName = this.props.userStore.user.username; 
            
        return (
            <Header 
                title={this.formTitle()}
                subtitle={this.formSubtitle()}
                username={this.props.userStore.user
                ? this.props.userStore.user.username
                : 'undefined'}
            />
        );
    };

    private renderSider = (): React.ReactNode => {
        return (
            <CustomSider
            />
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
                <p className={styles.temp}>
                    {'Content'}
                </p>
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