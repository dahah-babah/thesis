import React from 'react';
import { Typography, Select, Card, Button, Modal, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
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

    @observable isModalVisible = false;

    UNSAFE_componentWillMount() {
        this.props.userStore.fetchStudents();
    };

    private renderStudents = (): React.ReactNode => {
        return (
            this.props.userStore.students.map((student: Student | any) => 
                <Card
                    key={student.id}
                    className={styles.card}
                    title={<span className={styles.flexTitle}><Text strong editable>{student.lastname} {student.name}</Text><CloseOutlined /></span>}
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
                    {/* <div className={styles.width}>
                        Семестр
                        <Text strong editable>  {student.semester}</Text>
                    </div>                    */}
                </Card>
            )
        );
    };

    private openModal = (): void => {
        console.log(123);
        
        this.toogleModal();
    };

    private toogleModal = (): void => {        
        this.isModalVisible = !this.isModalVisible;
    };

    private renderAddStudent = (): React.ReactNode => {
        return (
            <Card
                className={styles.add}
            >
                <Button type={'dashed'} onClick={this.openModal}>+ ДОБАВИТЬ СТУДЕНТА</Button>                   
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

    private renderModalContent = (): React.ReactNode => {
        return (
            <article>
                <Input
                    className={styles.marginBottom20}
                    placeholder={'Введите имя студента'}
                />
                <Input
                    className={styles.marginBottom20}
                    placeholder={'Введите фамилию студента'}
                />
                <div className={styles.flexSelect}>
                <Select
                    className={styles.select}
                    // defaultValue={'2'}
                    placeholder={'Выберите курс'}
                >
                    <Option key={'2'} value={'2'}>2</Option>
                </Select>
                <Select
                    className={styles.select}
                    // defaultValue={'1'}
                    placeholder={'Выберите группу'}
                >
                    <Option key={'1'} value={'1'}>ГРУППА-1</Option>
                    <Option key={'2'} value={'2'}>ГРУППА-2</Option>
                </Select>
                </div>
            </article>
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
                <Modal
                    title={'Добавить студента'} 
                    visible={this.isModalVisible}
                >
                    {this.renderModalContent()}
                </Modal>
            </section>
        );
    }
}