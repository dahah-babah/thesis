import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import styles from './Sider.module.less';

import { Menu } from '../Menu/Menu';
import { User, Teacher, Student } from '../../../types/types';

interface Props {
    mode?: 'light' | 'dark';
    user: User | Teacher | Student;
}

const { Sider } = Layout;

@inject('userStore', 'siderStore', 'courseStore', 'workStore')
@observer
export class CustomSider extends React.Component<Props | any> {

    componentDidMount = (): void => {
        this.props.courseStore.fetchCourses(this.props.userStore.user);
        this.props.workStore.fetchWorks('1');        
    };

    private renderMenu = (): React.ReactNode => {
        return (
            <div className={styles.fixed}>
                <Menu
                    courses={this.props.courseStore.courses}
                    works={this.props.workStore.works}
                    userId={this.props.userStore.user ? this.props.userStore.user.id : null}
                />
            </div>
        );
    };

    render(): React.ReactChild {        
        return (
            <div className={styles.menuWrapper}>
                <Sider                    
                    theme='light'
                    collapsible
                    collapsed={this.props.siderStore.isSiderCollapsed}
                    onCollapse={this.props.siderStore.toggleSider}
                >
                    {this.renderMenu()}
                </Sider>
            </div>
        );
    }
}