import React from 'react';
import { Typography, Select, Card, Button } from 'antd';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { User, Student } from '../../../types/types';
import styles from './MainPage.module.less';

const { Option } = Select;
const { Text } = Typography;

interface Props {
    user: User;
}

@inject('userStore')
@observer
export class AdminMainPage extends React.Component<Props | any> {

    UNSAFE_componentWillMount() {
        this.props.userStore.fetchStudents();
    };

    private renderStudents = (): React.ReactNode => {
        return (
            this.props.userStore.students.map((student: Student | any) => 
                <Card
                    key={student.id}
                    className={styles.card}
                    title={<Text strong editable>{student.lastname} {student.name}</Text>}
                >
                    <div className={styles.width}>
                        Логин
                        <Text strong editable>  {student.username}</Text>
                    </div>
                    <div className={styles.width}>
                        Группа
                        <Text strong editable>  {student.group}</Text>
                    </div>
                    <div className={styles.width}>
                        Курс
                        <Text strong editable>  {student.year}</Text>
                    </div>
                    <div className={styles.width}>
                        Семестр
                        <Text strong editable>  {student.semester}</Text>
                    </div>                   
                </Card>
            )
        );
    };

    private renderAddStudent = (): React.ReactNode => {
        return (
            <Card
                className={styles.add}
            >
                <Button type={'dashed'}>+ ДОБАВИТЬ СТУДЕНТА</Button>                   
            </Card>
        );
    };

    private renderSelect = (): React.ReactNode => {
        return (
            <Select
                className={styles.select}
                defaultValue={'students'}
            >
                <Option key={'students'} value={'students'}>Студенты</Option>
                <Option key={'teachers'} value={'teachers'}>Преподаватели</Option>
                <Option key={'courses'} value={'courses'}>Дисциплины</Option>
            </Select>
        );
    };
            
    render(): React.ReactChild {        
        return (
            <section>
                {this.renderSelect()}
                <div className={styles.flex}>
                    {this.renderStudents()}
                    {this.renderAddStudent()}
                </div>
            </section>
        );
    }
}