import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import styles from './UserPage.module.less';
import { Header } from '../../../uui/Header/Header';
import { CustomSider } from '../../../uui/Sider/Sider';
import { Breadcrumb } from '../../../uui/Breadcrumb/Breadcrumb';
import { User, Student, Teacher } from '../../../../types/types';
import { StudentMainPage } from '../../StudentPages/MainPage/MainPage';
import { TeacherMainPage } from '../../TeacherPages/MainPage/MainPage';

const { Content } = Layout;

@inject('userStore')
@observer
export class UserPage extends React.Component<any> {

    @observable user!: User | Teacher | Student;

    componentDidMount = (): void => {
        // this.user = this.props.userStore.findUser('123', '321'); //admin
        this.user = this.props.userStore.findUser('Ivanov_Ivan', '123'); //student
        // this.user = this.props.userStore.findUser('Poshposh_Poashka', '321'); //teacher

        this.user = this.props.userStore.getUser();
    };

    private formTitle = (): string => {
        if (this.props.userStore.user) {
            if (this.props.userStore.user.role === 'admin') {
                return 'Administrator';
            } else {
                return `${this.props.userStore.user.name} 
                        ${this.props.userStore.user.lastname}`;
            }
        } else {
            return 'Undefined';
        }
    };

    private formSubtitle = (): string => {
        if (this.props.userStore.user) {
            if (this.props.userStore.user.role === 'student') {
                return `${this.props.userStore.user.group}`;
            } else if (this.props.userStore.role === 'teacher') {
                return `${this.props.userStore.user.level}`;
            } else {
                return '';
            }
        } else {
            return 'Undefined';
        }
    };

    private renderHeader = (): React.ReactNode => {               
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
                user={this.props.userStore.user
                    ?   this.props.userStore.user
                    :   null}
            />
        );
    };

    private renderBreadcrumb = (): React.ReactNode => {
        return (
            <Breadcrumb />
        );
    };

    private renderUserContent = (): React.ReactNode => {
        {/* if S: render ALL not comleted works <StudentMainPage /> 
        else T: render ALL not comleted reports <TeacherMainPage /> */}
        if (this.props.userStore.user) {
            if (this.props.userStore.user.role === 'teacher') {
                return <TeacherMainPage />;
            } else if (this.props.userStore.user.role === 'student') {
                return <StudentMainPage user={this.props.userStore.user} />
            } else return 'Admin';
        } else return null;
    };

    private renderContent = (): React.ReactNode => {
        return (
            <Content>
                <article className={styles.temp}>
                    {this.renderUserContent()}
                </article>
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