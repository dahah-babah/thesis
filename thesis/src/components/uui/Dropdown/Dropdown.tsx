import React from 'react';
import { Menu as AntdMenu, Dropdown as AntdDropdown } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.less';

interface Props {
    content: React.ReactNode;
    links: string; //temp mock -> improve to links = string[]
    menuItems: string[];
    className?: any;
}

export class Dropdown extends React.Component<Props> {

    private onClick = ({ key }: any): void => {
        console.log('Click on ' + key);
        
    };
    
    render(): React.ReactChild {
        const { content, className, menuItems } = this.props;
        const menu = (
            <AntdMenu onClick={this.onClick}>
                {menuItems.map((menuItem: string) => 
                    <AntdMenu.Item key={menuItem}>
                        <Link to={this.props.links}>{menuItem}</Link>    
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
