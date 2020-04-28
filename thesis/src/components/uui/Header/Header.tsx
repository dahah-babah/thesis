import React from 'react';
import { PageHeader } from 'antd';
import styles from './Header.module.less';
import { UserIcon } from '../UserIcon/UserIcon';
import { Dropdown } from '../Dropdown/Dropdown';

interface Props {
    user: any;
}

export class Header extends React.Component<Props> {

    private renderUserIcon = (): React.ReactNode => {
        return (
            <UserIcon 
                username={this.firstLetter(this.props.user.username)}
                userRole={this.props.user.role}
                userId={this.props.user.id} 
                shape={'square'}
                size={'large'}
            />
        );
    };

    private firstLetter = (username: string): string => {
        return username[0];
    };

    private formTitle = (): string => {
        if (this.props.user) {
            if (this.props.user.role === 'admin') {
                return 'Administrator';
            } else {
                return `${this.props.user.name} 
                        ${this.props.user.lastname}`;
            }
        } else {
            return 'Undefined';
        }
    };

    private formSubtitle = (): string => {
        if (this.props.user) {
            if (this.props.user.role === 'student') {
                return `${this.props.user.group}`;
            } else if (this.props.user.role === 'teacher') {
                return `${this.props.user.level}`;
            } else {
                return '';
            }
        } else {
            return 'Undefined';
        }
    };

    private renderUserInfo = (): React.ReactNode => {
        return (
            this.props.user 
            ?   <span className={styles.userWrapper}>
                    <p className={styles.username}>{this.props.user.username}</p>
                    <Dropdown
                        content={this.renderUserIcon()}
                        menuItems={['Statistic']}
                        links={`user/${this.props.user.id}/statistic`}
                    />
                </span>
            : null
        );
    };

    render(): React.ReactChild {
        return (
            <PageHeader
                // onBack={() => history.back()}
                title={this.formTitle()}
                subTitle={this.formSubtitle()}
            >
                {this.renderUserInfo()}
            </PageHeader>
        );
    }
}