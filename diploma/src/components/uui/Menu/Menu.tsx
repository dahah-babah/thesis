import React from 'react';
import { Menu as AntdMenu } from 'antd';

interface Props {
    menuItems?: string[]
}

const { SubMenu, Item } = AntdMenu;

export class Menu extends React.Component<Props> {

    private renderMenuItems = (): React.ReactNode => {
        // const { menuItems } = this.props;
        return (
            <>
                <SubMenu>
                    <Item>Option 1</Item>
                </SubMenu>
            </>
        );
    };

    render(): React.ReactChild {
        return (
            <AntdMenu
                mode='vertical-left'
                theme='light'
            >
                {/* {this.renderMenuItems()} */}
            </AntdMenu>
        );
    }
}