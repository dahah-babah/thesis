import React from 'react';
import { Menu as AntdMenu, Dropdown as AntdDropdown } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.less';

interface Props {
    content: React.ReactNode;
    menuItems: string[];
    className?: any;
}

export class Dropdown extends React.Component<Props> {
    
    render(): React.ReactChild {
        const { content, className, menuItems } = this.props;
        
        const menu = (
            <AntdMenu>
                {menuItems.map((menuItem: string) => 
                    <AntdMenu.Item key={menuItem}>
                        <Link to={menuItem}>{menuItem}</Link>    
                    </AntdMenu.Item>
                )}
            </AntdMenu>
        );

        return (
            <AntdDropdown overlay={menu} className={className}>
                <div className={styles.hover}>
                    {content}
                </div>
            </AntdDropdown>
        );
    }
}
