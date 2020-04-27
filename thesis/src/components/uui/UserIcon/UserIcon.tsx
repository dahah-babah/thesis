import React from 'react';
import { Avatar } from 'antd';
import { Badge } from '../Badge/Badge';

interface Props {
    userId: string;
    userRole: string;
    username: string;
    // icon?: React.ReactNode;
    // src?: string;
    shape?: 'circle' | 'square';
    size?: number | 'large' | 'small' | 'default';
}

export class UserIcon extends React.Component<Props> {

    private getBadgeCount = (): number => {
        // temporary mock
        
        // reauest to user (student or teacher)
        // S: count not comleted works
        // T: count not comleted reports
        // if exists then count -> this number
        // else return 0
        return 0;
    };

    private renderAvatar = (): React.ReactNode => {
        const { username, shape, size } = this.props;
        return (
            <>
                <Avatar
                    shape={shape}
                    size={size}
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
                        count={this.getBadgeCount()}
                    />
                </span>
            </>
        );
    }
}