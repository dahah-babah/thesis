import React from 'react';
import { Avatar } from 'antd';
import { Badge } from '../Badge/Badge';

interface Props {
    username: string;
    icon?: React.ReactNode;
    src?: string;
    shape?: 'circle' | 'square';
    size?: number | 'large' | 'small' | 'default';
}

export class UserIcon extends React.Component<Props> {

    private renderAvatar = (): React.ReactNode => {
        const { username } = this.props;
        return (
            <>
                <Avatar
                    shape={'square'}
                    size={'large'}
                > 
                    {username}
                </Avatar>
            </>
        );
    };

    render(): React.ReactChild {
        return (
            <>
                <span>
                    <Badge
                        content={this.renderAvatar()}
                        count={5}
                    />
                </span>
            </>
        );
    }
}