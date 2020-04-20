import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Course, Work } from '../../../types/types';

interface Props {
    menuItems: Course[];
}

const { SubMenu, ItemGroup, Item } = AntdMenu;

export class Menu extends React.Component<Props> {

    private renderParts = (parts: any): React.ReactNode => {
        return (
            parts.map((part: any) => 
                <Item key={part.id}>{part.title}</Item>
            )
        );
    };

    private renderItemGroups = (course: Course): React.ReactNode => {
        if (course.works) {
            return (
                course.works.map((work: Work) => 
                    work.parts.length
                    ?   <ItemGroup 
                            key={work.id} 
                            title={work.title}
                        >
                            {this.renderParts(work.parts)}
                        </ItemGroup>
                    :   <Item key={work.id}>{work.title}</Item>
                )
            );
        } else return null;
    };

    private renderMenuItems = (): React.ReactNode => {
        const { menuItems } = this.props;        
        if (menuItems) {
            return (
                menuItems.map((menuItem: Course) => 
                    <SubMenu
                        key={menuItem.id}
                        title={
                            <span>
                                <ArrowRightOutlined />
                                <span>{menuItem.name}</span>
                            </span>
                        }
                    >
                        {this.renderItemGroups(menuItem)}
                    </SubMenu>
                )
            );
        } else {
            return null;
        }
    };

    render(): React.ReactChild {
        return (
            <AntdMenu
                mode='inline'
                theme='light'
            >
                {this.renderMenuItems()}
            </AntdMenu>
        );
    }
}