import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Typography } from 'antd';
import styles from './Sider.module.less';

import { Menu } from '../Menu/Menu';
import { Dropdown } from '../Dropdown/Dropdown';

interface Props {
    mode?: 'light' | 'dark';
}

const { Sider } = Layout;
const { Title } = Typography;

@inject('siderStore', 'courseStore')
@observer
export class CustomSider extends React.Component<Props | any> {

    componentDidMount = (): void => {
        this.props.courseStore.fetchCourses();
    };

    private renderMenuHeader = (): React.ReactNode => {
        // select is around of Title
       return (
            <Dropdown 
                className={styles.menuHeader}
                menuItems={['Courses']} 
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