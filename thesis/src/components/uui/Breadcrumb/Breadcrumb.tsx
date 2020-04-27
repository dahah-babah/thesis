import React from 'react';
import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { UserOutlined, DoubleRightOutlined } from '@ant-design/icons';
import './Breadcrumb.module.less';
import { User, Student, Teacher } from '../../../types/types';
import { inject, observer } from 'mobx-react';

interface Route {
    user: User | Student | Teacher;
    path?: string;
    breadcrumbName?: string;
    children?: Array<{ 
        path: string, 
        breadcrumpName: string 
    }>;
}

const { Item } = BreadcrumbAntd;

@inject('userStore')
@observer
export class Breadcrumb extends React.Component<Route | any> {
    //use dropdowns in courses->[coursenames]->works->[worknames] 
    // home for student = not completed course

    private renderItems = (): React.ReactNode => {
        if (this.props.userStore.user) {
            return (
                <Item href={`/user/${this.props.userStore.user.id}/home`}>
                    <UserOutlined />
                    <span>
                        {this.props.userStore.user.username}    
                    </span>
                </Item>
            );
        } else {
            return null;
        }
    };

    render(): React.ReactChild {
        return (
            <BreadcrumbAntd
                separator={<DoubleRightOutlined />}
            >
                {this.renderItems()}
            </BreadcrumbAntd>
        );
    }
}