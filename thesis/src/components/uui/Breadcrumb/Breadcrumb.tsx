import React from 'react';
import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Breadcrumb.module.less';
import { User, Student, Teacher } from '../../../types/types';
import { inject, observer } from 'mobx-react';
import { breadcrumbNameMap } from './BreadcrumbMap';
import { pathToRegexp } from 'path-to-regexp';

interface Route {
    user: User | Student | Teacher;
    path?: string;
    breadcrumbName?: string;
    children?: Array<{ 
        path: string, 
        breadcrumpName: string 
    }>;
}

const { Item, Separator } = BreadcrumbAntd;

@inject('userStore')
@observer
export class Breadcrumb extends React.Component<Route | any> {
    //DO dropdowns in courses->[coursenames]->works->[worknames] 

    // FIX breadcrumb + breadcrumbNameMap
    // works only after reload

    // FIX key property

    private renderDynamicItems = (): React.ReactNode => {
        const location = window.location;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems: any[] = [];

        pathSnippets.forEach((_, index: number) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            
            Object.keys(breadcrumbNameMap).forEach((item: string) => {
                
                if (pathToRegexp(item).test(url)) { 
                    console.log(breadcrumbNameMap[item]);
                                     
                    extraBreadcrumbItems.push(
                        <Item key={url} href={url}>
                            {breadcrumbNameMap[item]}
                        </Item>
                    );
                }
            });
        });

        const breadcrumbItems = [(
            <>
            </>
        )].concat(extraBreadcrumbItems);
        
        return (
            <>
                {breadcrumbItems}
            </>
        );
    };

    private renderItems = (): React.ReactNode => {
        if (this.props.userStore.user) {
            return (
                <>
                    <Item key={'home'} href={`/user/${this.props.userStore.user.id}/home`}>
                        <UserOutlined />
                        <span>
                            {this.props.userStore.user.username}    
                        </span>
                    </Item>
                    <Separator>:</Separator>
                    {this.renderDynamicItems()}
                </>
            );
        } else {
            return null;
        }
    };

    render(): React.ReactChild {
        return (
            <BreadcrumbAntd
                separator={""}
            >
                {this.renderItems()}
            </BreadcrumbAntd>
        );
    }
}