import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Typography } from 'antd';
import styles from './Sider.module.less';

import { Menu } from '../Menu/Menu';
import { Dropdown } from '../Dropdown/Dropdown';
import { User, Teacher, Student } from '../../../types/types';

interface Props {
    mode?: 'light' | 'dark';
    user: User | Teacher | Student;
}

const { Sider } = Layout;
// const { Title } = Typography;

@inject('userStore', 'siderStore', 'courseStore')
@observer
export class CustomSider extends React.Component<Props | any> {

    componentDidMount = (): void => {
        this.props.courseStore.fetchCourses(this.props.userStore.user);
    };

    private renderMenuHeader = (): React.ReactNode => {
       return (
            <Dropdown 
                className={styles.menuHeader}
                menuItems={['Courses', 'Statistic']} 
            />
       );
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
                {this.renderMenuHeader()}
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