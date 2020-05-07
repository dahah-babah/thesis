import React from 'react';
import Chart from 'react-google-charts';
import { Select } from 'antd';
import { observable } from 'mobx';
import { Course, Work } from '../../../../types/types';
import { inject, observer } from 'mobx-react';

const { Option } = Select;

@inject('testStore', 'courseStore', 'workStore', 'chartStore')
@observer
export class StudentStatistic extends React.Component<any> {

    @observable courseNames: string[] = [];
    @observable avgUserRates: number = 0;
    @observable avgRates: number = 0;
    @observable worksByCourseId: Work[] = [];
    @observable chartData: any = [];

    private chartAllHeader = ['Course', 'My rate', 'Average rate'];
    private chartCourseHeader = ['Task', 'My rate', 'Average rate'];

    private options: any = {
        vAxis: { minValue: 0, maxValue: 100 } 
    };

    private reducer = (accum: number, current: number) => accum += current;

    componentDidMount() {       
        this.props.testStore.fetchStudentCompleted(this.props.user.id);
        this.props.testStore.fetchAllCompleted('1');
        this.props.workStore.fetchWorks('1');        

        const numOfComleted = this.props.testStore.allCompleted.length;
        const numOfUserCompleted = this.props.testStore.studentCompleted.length;
        const allCompletedRate = this.props.testStore.allCompleted.map((item: any) => Number(item.rate)); 
        const userCompletedRate = this.props.testStore.studentCompleted.map((item: any) => Number(item.rate));       

        this.courseNames = this.props.courseStore.courses.map((course: Course) => course.name);
        this.avgUserRates = userCompletedRate.reduce(this.reducer, 0) / numOfUserCompleted;
        this.avgRates = allCompletedRate.reduce(this.reducer, 0) / numOfComleted;
        this.worksByCourseId = this.props.workStore.works;
        // this.formChartArray(); //enable this str to render all: remove - to render MiVT
    };

    private formChartArray = (): void => {
        this.chartData.length = 0;
        this.props.chartStore.clearChart();

        this.props.chartStore.addData(this.chartAllHeader);
        for (let i = 0; i < this.courseNames.length; i++) {
            this.props.chartStore.addData([`${this.courseNames[i]}`, this.avgUserRates, this.avgRates]);
        }

        this.chartData = this.props.chartStore.chartData;                
    };

    private fromArrayofCourse = (): void => {
        this.props.chartStore.clearChart();
        this.props.chartStore.addData(this.chartCourseHeader);

        let courseTaskNames = this.worksByCourseId.map((work: any) => [work.id, work.title]);        
        let userRates = this.props.testStore.studentCompleted.map((work: any) => [work.workId, work.rate]);
        let avgRates = this.props.testStore.allCompleted.map((work: any) => [work.workId, work.rate]);

        let taskIds: any = [];
        for (let i = 0; i < courseTaskNames.length; i++) {
            taskIds.push(courseTaskNames[i][0]);
        }        
        
        for (let i = 0; i < taskIds.length; i++) {           
            this.props.chartStore.addData([
                courseTaskNames[i][1], 
                Number(userRates.find((idRate: any) => idRate[0] === taskIds[i])[1]), 
                avgRates
                .filter((idRate: any) => idRate[0] === taskIds[i])
                .map((idRate: any) => Number(idRate[1]))
                .reduce(this.reducer, 0) / avgRates.filter((idRate: any) => idRate[0] === taskIds[i]).length
            ]);
        }

        this.chartData = this.props.chartStore.chartData;        
    };

    private onChange = (value: any) => {        
        if (value === 'all') {
            this.formChartArray();
        } else if (this.courseNames.find((name: string) => name === value)) {
            this.fromArrayofCourse();       
        }
    }; 

    private renderChart = (): React.ReactNode => {            
        return (
            <Chart
                height='600px'
                width='80%'
                chartType='ColumnChart'
                data={this.chartData}
                options={this.options}
                legendToggle
            />
        );
    };

    private renderTitle = (): React.ReactNode => {
        return (
            <div>
                Enjoy your statistic
                <div>
                    <Select 
                        showSearch
                        style={{ width: 200 }}
                        placeholder='Select a course'
                        onSelect={this.onChange}
                        optionFilterProp='children'
                        defaultValue={'all'}
                    >
                        <Option key={'all'} value='all'>All</Option>
                        {this.courseNames.map((courseName: string) => 
                            <Option 
                                key={courseName} 
                                value={`${courseName}`}
                            >
                                {courseName}
                            </Option>
                        )}
                    </Select>
                </div>
            </div>
        );
    };

    render(): React.ReactChild {
        return (
            <section>
                {this.renderTitle()}
                {this.chartData
                ?   this.renderChart()
                :   null}
            </section>
        );
    }
}