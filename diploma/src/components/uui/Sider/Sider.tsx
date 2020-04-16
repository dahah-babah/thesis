import React from 'react';
import { Layout } from 'antd';
import './Sider.module.less';
import { Menu } from '../Menu/Menu';

interface Props {
    mode?: 'light' | 'dark';
}

const { Sider } = Layout;

export class CustomSider extends React.Component<Props> {

    state = { isSiderCollapsed: false };

    private onCollapse = (isSiderCollapsed: boolean): void => {
        this.setState({ isSiderCollapsed });
    };

    render(): React.ReactChild {
        return (
            <Sider
                theme='light'
                collapsible
                collapsed={this.state.isSiderCollapsed}
                onCollapse={this.onCollapse}
            >
                <Menu></Menu>
            </Sider>
        );
    }
}