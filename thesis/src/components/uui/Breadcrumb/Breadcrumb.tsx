import React from 'react';
import { Breadcrumb as BreadcrumbAntd } from 'antd';
import './Breadcrumb.module.less';

interface Route {
    path?: string;
    breadcrumbName?: string;
    children?: Array<{ path: string, breadcrumpName: string }>;
}

const { Item } = BreadcrumbAntd;

export class Breadcrumb extends React.Component<Route> {

    render(): React.ReactChild {
        return (
            <BreadcrumbAntd>
                <Item>Breadcrumb</Item>
            </BreadcrumbAntd>
        );
    }
}