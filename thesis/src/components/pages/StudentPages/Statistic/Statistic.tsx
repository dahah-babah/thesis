import React from 'react';
import Chart from 'react-google-charts';
import { Select, Card, List, Table } from 'antd';
import { observable, toJS } from 'mobx';
import { Course, Work } from '../../../../types/types';
import { inject, observer } from 'mobx-react';
import styles from './Statistics.module.less'; 
import { reducer, findPer } from '../../../../utils/calculations';

const { Option } = Select;

@inject('testStore', 'courseStore', 'workStore', 'chartStore')
@observer
export class StudentStatistic extends React.Component<any> {

    @observable courseNames: string[] = [];
    @observable worksByCourseId: Work[] = [];
    @observable chartData: any = [];
    
    private tableData: any = [
        {
            key: `0_ВиМТ`,
            num: `1`,
            courseName: `ВиМТ`,
            numOfTasks: `8`,
            numOfCompletedTasks: `4`,
            completed: findPer(8, 4)
        }
    ];

    private options: any = {
        width: 1150,
        vAxis: { minValue: 0, maxValue: 100 } 
    };

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
            title: 'Всего работ',
            dataIndex: 'numOfTasks',
            key: 'numOfTasks'
        },
        {
            title: 'Выполнено работ',
            dataIndex: 'numOfCompletedTasks',
            key: 'numOfCompletedTasks'
        },
        {
            title: 'Завершено, %',
            dataIndex: 'completed',
            key: 'completed'
        }
    ];

    async UNSAFE_componentWillMount() {        
        await this.props.testStore.fetchStudentCompleted(this.props.user.id);
        await this.props.testStore.fetchAllCompleted('1');
        await this.props.workStore.fetchWorks('1');   
    }

    componentDidMount() {            
        // get course names for select
        this.courseNames = this.props.courseStore.courses.map((course: Course) => course.shortName);
        this.setTableData();        
    };

    private setTableData = (): void => {

        const courseLen = this.props.workStore.works.length;
        const completedLen = this.props.testStore.studentCompleted.length;
        
        for (let i = 0; i < this.courseNames.length; i++) {
            this.tableData.push(
                {
                    key: `${i + 1}_${this.courseNames[i]}`,
                    num: `${i + 1}`,
                    courseName: `${this.courseNames[i]}`,
                    numOfTasks: courseLen,
                    numOfCompletedTasks: completedLen,
                    completed: findPer(courseLen, completedLen)
                }
            )
        }

        // console.log(toJS(this.tableData));
        
    }; 

    private formChartArray = (): void => {
        this.props.chartStore.clearChart(); // clear store

        this.props.chartStore.addData(this.props.chartStore.chartAllHeader);
        
        for (let i = 0; i < this.courseNames.length; i++) {
            this.props.chartStore.addData(
                [ `${this.courseNames[i]}`, 
                this.props.testStore.getAvgUserRates(), 
                this.props.testStore.getAvgAllRates() ]
            );
        }
    
        this.chartData = this.props.chartStore.chartData;       
        // console.log(this.chartData); 
    };

    private fromArrayofCourse = (): void => {
        this.props.chartStore.clearChart(); // clear store

        // get works 
        this.worksByCourseId = this.props.workStore.works;
        // set course header
        this.props.chartStore.addData(this.props.chartStore.chartCourseHeader);
        // console.log(this.props.chartStore.chartData);
        
        // lab names
        let courseTaskNames = this.worksByCourseId.map((work: any) => [work.id, work.title]);    
        // console.log(courseTaskNames);
            
        let userRates = this.props.testStore.studentCompleted.map((work: any) => [work.workId, work.rate]);
        // console.log(userRates);
        
        let avgRates = this.props.testStore.allCompleted.map((work: any) => [work.workId, work.rate]);
        // console.log(avgRates);      
        
        
        for (let i = 0; i < courseTaskNames.length; i++) {  
            let userRate = 0;
            let allRate = 0;

            if (userRates.find((idRate: any) => idRate[0] === courseTaskNames[i][0])) {
                userRate = Number(userRates.find((idRate: any) => idRate[0] === courseTaskNames[i][0])[1]);
            } 

            if (avgRates.filter((idRate: any) => idRate[0] === courseTaskNames[i][0]).length) {
                allRate = avgRates
                // group results by task id
                .filter((idRate: any) => idRate[0] === courseTaskNames[i][0])
                // string -> number
                .map((idRate: any) => Number(idRate[1]))
                // find avg
                .reduce(reducer, 0) / avgRates.filter((idRate: any) => idRate[0] === courseTaskNames[i][0]).length;
            }
            
            if (userRate || allRate) {
                this.props.chartStore.addData([
                    courseTaskNames[i][1], 
                    userRate, 
                    allRate
                ]);
            }
        }     

        this.chartData = this.props.chartStore.chartData; 
        console.log(this.chartData);
               
    };

    private onChange = (value: any) => {  
        this.chartData.length = 0; // clear component

        if (value === 'all') {
            this.formChartArray();
            // this.renderChart();
        } else if (this.courseNames.find((name: string) => name === value)) {
            this.fromArrayofCourse();  
            // this.renderChart();     
        } else {
            // return notification message
        }
    }; 

    private renderChart = (): React.ReactNode => {                    
        return (
            <Chart
                height='600px'
                width='75%'
                chartType='ColumnChart'
                data={this.chartData}
                options={this.options}
                legendToggle
            />
        );
    };

    private renderTitle = (): React.ReactNode => {
        return (
            <div className={styles.titleWrapper}>
                {this.renderSelect()}
                {this.renderInfoCard()}
            </div>
        );
    };

    private renderSelect = (): React.ReactNode => {
        return (
            <Select 
                className={styles.select}
                showSearch
                style={{ width: 200 }}
                placeholder='Select a course'
                onSelect={this.onChange}
                optionFilterProp='children'
                defaultValue={'all'}
            >
                <Option key={'all'} value='all'>Все дисциплины</Option>
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

    private renderInfoCard = (): React.ReactNode => {
        return (
            <div>
                <Card
                    title={'Критерии оценивания'}
                >
                    <List>
                        <List.Item key='5'>
                            <List.Item.Meta description={'> 85 : отлично'} />
                        </List.Item>
                        <List.Item key='4'>
                            <List.Item.Meta description={'84 - 70 : хорошо'} />
                        </List.Item>
                        <List.Item key='3'>
                            <List.Item.Meta description={'69 - 55 : удовлетворительно'} />
                        </List.Item>
                        <List.Item key='2'>
                            <List.Item.Meta description={'< 54 : неудовлетворительно'} />
                        </List.Item>
                    </List>
                </Card>
            </div>
        );
    };

    render(): React.ReactChild {
        return (
            <section>
                <div className={styles.mainWrapper}>
                    {this.renderTitle()}
                    {this.chartData
                    ?   this.renderChart()
                    :   null}
                </div>
                <Table
                    dataSource={toJS(this.tableData)}
                    columns={this.columns}
                    size={'middle'}
                />
            </section>
        );
    }
}