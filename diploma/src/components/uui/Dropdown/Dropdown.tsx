import React from 'react';
import { Menu as AntdMenu, Dropdown as AntdDropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface Props {
    menuItems: string[];
    className?: any;
}

export class Dropdown extends React.Component<Props> {
    
    render(): React.ReactChild {
        const menu = (
            <AntdMenu>
                {this.props.menuItems.map((menuItem: string) => 
                    <AntdMenu.Item key={menuItem}>
                        {menuItem}
                    </AntdMenu.Item>
                )}
            </AntdMenu>
        );

        return (
            <AntdDropdown overlay={menu} className={this.props.className}>
                <Button>
                    Choose <DownOutlined />
                </Button>
            </AntdDropdown>
        );
    }
}
