import React from 'react';
import { PageHeader } from 'antd';
import styles from './Header.module.less';
import { UserIcon } from '../UserIcon/UserIcon';

interface Props {
    title: string;
    subtitle?: string;
    username: string;
}

export class Header extends React.Component<Props> {

    private renderUserInfo = (): React.ReactNode => {
        const { username } = this.props;
        return (
            <span className={styles.userWrapper}>
                <p className={styles.username}>{username}</p>
                <UserIcon username={'User'} />
            </span>
        );
    };

    render(): React.ReactChild {
        const { title, subtitle } = this.props;
        return (
            <PageHeader
                // onBack={() => history.back()}
                title={title}
                subTitle={subtitle}
            >
                {this.renderUserInfo()}
            </PageHeader>
        );
    }
}