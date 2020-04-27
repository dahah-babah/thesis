import React from 'react';
import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Breadcrumb.module.less';
import { User, Student, Teacher } from '../../../types/types';
import { inject, observer } from 'mobx-react';

interface Route {
    user: User | Student | Teacher;
    path?: string;
    breadcrumbName?: string;
    children?: Array<{ path: string, breadcrumpName: string }>;
}

const { Item } = BreadcrumbAntd;

@inject('userStore')
@observer
export class Breadcrumb extends React.Component<Route | any> {

    private renderItems = (): React.ReactNode => {
        return (
            <>
                <Item href=''>
                    <UserOutlined />
                    <span>
                        {this.props.userStore.user ? this.props.userStore.user.username : null}    
                    </span>
                </Item>
            </>
        );
    };

    render(): React.ReactChild {
        return (
            <BreadcrumbAntd>
                {this.renderItems()}
            </BreadcrumbAntd>
        );
    }
}