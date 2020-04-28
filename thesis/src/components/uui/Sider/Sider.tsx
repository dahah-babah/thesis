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

@inject('userStore', 'siderStore', 'courseStore')
@observer
export class CustomSider extends React.Component<Props | any> {

    componentDidMount = (): void => {
        this.props.courseStore.fetchCourses(this.props.userStore.user);
    };

    private renderMenu = (): React.ReactNode => {
        return (
            <Menu
                menuItems={this.props.courseStore.courses}
            />
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