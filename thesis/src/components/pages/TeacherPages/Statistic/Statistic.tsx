import React from 'react';
import { Table, Divider, Card, Select, TreeSelect, Button } from 'antd';
import { toJS, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import styles from './Statistic.module.less';
import { Course } from '../../../../types/types';

const { Option } = Select;

@inject('testStore', 'courseStore')
@observer
export class TeacherStatistic extends React.Component<any> {

    @observable courseNames: string[] = [];

    private tableData: any = [
        {
            key: `0_ВиМТ`,
            num: `1`,
            courseName: `ВиМТ`,
            avg: Math.round(this.props.testStore.getAvgAllRates())
        }
    ];

    private columns: any = [
        {
            title: '№',
            dataIndex: 'num',
            key: 'num'
        },
        {
            title: 'Дисциплина',
            dataIndex: 'courseName',
            key: 'courseName'
        },
        {
            title: 'Средний балл',
            dataIndex: 'avg',
            key: 'avg'
        }
    ];

    UNSAFE_componentWillMount() {
        this.props.testStore.fetchAllCompleted('1');
    };

    componentDidMount() {
        this.courseNames = this.props.courseStore.courses.map((course: Course) => course.shortName);
    };

    private renderReportDivider = (): React.ReactNode => {
        return (
            <Divider>
                Параметры отчета
            </Divider>
        );
    };

    private renderCourseOption  = (): React.ReactNode => {
        return (
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                defaultValue={'ВиМТ'}
            >
                <Option key={'all'} value="all">Все дисциплины</Option>
                {this.courseNames.map((courseName: string) => 
                    <Option 
                        key={courseName} 
                        value={`${courseName}`}
                    >
                        {courseName}
                    </Option>
                )}
            </Select>
        );
    };

    private renderGroupOption = (): React.ReactNode => {

        const treeData = [
            {
              title: 'Все',
              value: '0-0',
            },
            {
              title: 'Группы',
              value: '0-1',
              children: [
                {
                  title: 'ГРУППА-1',
                  value: '0-1-1',
                },
                {
                  title: 'ГРУППА-2',
                  value: '0-1-2',
                },
              ],
            },
          ];

        return (
            <TreeSelect
                style={{ width: 200 }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                treeDefaultExpandAll
                defaultValue={'0-0'}
            />
        );
    };

    private renderSortOptions = (): React.ReactNode => {
        return (
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                defaultValue={'abc'}
            >
                <Option key={'abc'} value="all">По алфавиту</Option>
                <Option key={'rate'} value="all">По среднему баллу</Option>
            </Select>
        );
    };

    private renderReportOptions = (): React.ReactNode => {
        return (
            <article className={styles.optionsWrapper}>
                <div className={styles.optionItem}>
                    <p className={styles.name}>
                        Выберите дисциплину
                    </p> 
                    {this.renderCourseOption()}
                </div >
                <div className={styles.optionItem}>
                    <p className={styles.name}>
                        Выберите группы
                    </p> 
                    {this.renderGroupOption()}
                </div>
                <div className={styles.optionItem}>
                    <p className={styles.name}>
                        Сортировать
                    </p> 
                    {this.renderSortOptions()}
                </div>
            </article>
        );
    };

    private renderManageButtons = (): React.ReactNode => {
        return (
            <div className={styles.buttonWrapper}>
                <Button type={'primary'}>ОТКРЫТЬ</Button>
                <Button type={'default'}>СКАЧАТЬ</Button>
            </div>
        );
    };
    
    render(): React.ReactChild {
        return (
            <section className={styles.section}>
                <Card className={styles.mainWrapper}>
                    {this.renderReportDivider()}
                    <div className={styles.cardContent}>
                        {this.renderReportOptions()}
                        {this.renderManageButtons()}
                    </div>
                </Card>
                <Table
                    className={styles.mainWrapper}
                    dataSource={toJS(this.tableData)}
                    columns={this.columns}
                    size={'middle'}
                    bordered
                />
            </section>
        );
    }
}