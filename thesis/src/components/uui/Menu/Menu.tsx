import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import { Course, Work, User, Student, Teacher } from '../../../types/types';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Badge } from '../Badge/Badge';
import './Menu.module.less';

interface Props {
    menuItems: Course[];
}

const { SubMenu, Item } = AntdMenu;

@inject('userStore')
@observer
export class Menu extends React.Component<Props | any> {

    @observable user!: User | Teacher | Student;

    componentDidMount() {
        this.user = this.props.userStore.getUser();
    };


    private renderAddWorkButton = (courseId: string): React.ReactNode => {
        if (this.props.userStore.user) {
            return (
                <Item key={courseId}>
                    <Link to={`/user/${this.props.userStore.user.id}/courses/${courseId}/works/new`}>+ ADD TASK</Link>
                </Item>
            );
        } else return null;
    };

    private renderCourseName = (name: string, role: string): React.ReactNode => {
        if (role === 'student') {
            return (
                <span>
                    <ArrowRightOutlined />
                    <Badge
                        content={<span>{name}</span>}
                        dot
                        offset={[10, 0]}
                        // status
                        // title
                    />
                </span>
            );
        } else {
            return (
                <span>
                    {name}
                    <EditOutlined />
                </span>
            );
        }
    };

    private renderBadge = (workTitle: string): React.ReactNode => {
        if (this.props.userStore.user.role === 'student') {
            return (
                <Badge 
                    content={workTitle} 
                    dot 
                    offset={[10, 0]}
                    // status
                    // title
                />
            );
        } else if (this.props.userStore.user.role === 'teacher') {
            return (
                <span>
                    {workTitle}
                    <EditOutlined />
                </span>
            );
        }
    };

    private renderItems = (course: Course): React.ReactNode => {
        if (course.works && this.props.userStore.user) {
            return (
                course.works.map((work: Work) => 
                    <Item key={work.id}>
                        <Link
                            to={this.props.userStore.user.role === 'student'
                                ?   `/user/${this.props.userStore.user.id}/courses/${course.id}/works/${work.id}/do`
                                :   `/user/${this.props.userStore.user.id}/courses/${course.id}/works/${work.id}/edit`}
                        >
                            {this.renderBadge(work.title)}
                        </Link>
                    </Item>
                )
            );
        } else return null;
    };

    private renderMenuItems = (): React.ReactNode => {
        const { menuItems } = this.props;        
        if (menuItems && this.props.userStore.user) {            
            return (
                menuItems.map((menuItem: Course) => 
                    <SubMenu
                        key={menuItem.id}
                        title={
                            <Link to={this.props.userStore.user.role === 'student'
                                ?   `/user/${this.props.userStore.user.id}/courses/${menuItem.id}`
                                :   `/user/${this.props.userStore.user.id}/courses/${menuItem.id}/edit`}
                            >
                                {this.renderCourseName(menuItem.name, this.props.userStore.user.role)}
                            </Link>
                        }
                    >
                        {this.renderItems(menuItem)}
                        {this.props.userStore.user.role === 'teacher'
                        ?   this.renderAddWorkButton(menuItem.id)
                        :   null}
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
                multiple={false}
                selectable={true}
            >
                {this.renderMenuItems()}
            </AntdMenu>
        );
    }
}