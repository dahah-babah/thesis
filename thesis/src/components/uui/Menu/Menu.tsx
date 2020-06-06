import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import { Course, Work, User, Student, Teacher } from '../../../types/types';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Badge } from '../Badge/Badge';
import styles from'./Menu.module.less';

interface Props {
    courses: Course[];
    works: Work[];
    userId: string;
}

const { SubMenu, Item } = AntdMenu;

@inject('userStore', 'badgeStore')
@observer
export class Menu extends React.Component<Props | any> {

    @observable user!: User | Teacher | Student;

    componentDidMount() {
        this.user = this.props.userStore.getUser();
        
        if (this.props.userStore.user) {
            this.props.badgeStore.getCompletedTasks(this.props.userStore.user.id);
            this.props.badgeStore.calcIsCourseCompleted(this.props.works);
        }
    };

    componentDidUpdate() {
        if (this.props.userStore.user && this.props.badgeStore.completedTasks.length === 0) {
            this.props.badgeStore.getCompletedTasks(this.props.userStore.user.id);
            this.props.badgeStore.calcIsCourseCompleted(this.props.works);
        }
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
                        content={name}
                        dot
                        offset={[10, 7]}
                        status={this.props.badgeStore.isCourseCompleted ? 'success' : 'default'}
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

    private renderBadge = (work: Work): React.ReactNode => {
        if (this.props.userStore.user.role === 'student') {
            return (
                <Badge 
                    content={`ЛР №${work.id}`} 
                    dot 
                    offset={[10, 5]}
                    status={this.props.badgeStore.isTaskCompleted(work.id) 
                        ?   this.props.badgeStore.getLabStatus(work.id)
                        :   'default'}
                />
            );
        } else if (this.props.userStore.user.role === 'teacher') {
            return (
                <span>
                    {`ЛР №${work.id}`}
                </span>
            );
        }
    };

    private renderItems = (course: Course): React.ReactNode => {
        const { works } = this.props;
        if (works && this.props.userStore.user) {
            return (
                works.map((work: Work) => 
                    <Item 
                        key={work.id} 
                        className={styles.item}
                    >
                        <Link
                            to={this.props.userStore.user.role === 'student'
                                ?   `/user/${this.props.userStore.user.id}/courses/${course.id}/works/${work.id}/do`
                                :   `/user/${this.props.userStore.user.id}/courses/${course.id}/works/${work.id}/edit`}
                        >
                            {this.renderBadge(work)}
                        </Link>
                    </Item>
                )
            );
        } else return null;
    };

    private renderMenuItems = (): React.ReactNode => {
        const { courses } = this.props;        
        if (courses && this.props.userStore.user) {            
            return (
                courses.map((menuItem: Course) => 
                    <SubMenu
                        key={menuItem.id}
                        title={
                            <Link to={this.props.userStore.user.role === 'student'
                                ?   `/user/${this.props.userStore.user.id}/courses/${menuItem.id}`
                                :   `/user/${this.props.userStore.user.id}/courses/${menuItem.id}/edit`}
                            >
                                {this.renderCourseName(menuItem.shortName, this.props.userStore.user.role)}
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
                defaultOpenKeys={['1']}
            >
                {this.renderMenuItems()}
            </AntdMenu>
        );
    }
}