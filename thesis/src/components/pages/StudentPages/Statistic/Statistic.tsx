import React from 'react';
import Chart from 'react-google-charts';
import { Select } from 'antd';
import { observable } from 'mobx';
import { Course } from '../../../../types/types';
import { inject, observer } from 'mobx-react';

const { Option } = Select;

@inject('testStore')
@observer
export class StudentStatistic extends React.Component<any> {

    @observable courseNames: string[] = [];
    @observable userRates: number[] = [];
    @observable avgRates: number[] | number = 0;

    private data: any = [
        ['Course', 'My rate', 'Average rate'],
        ['MockCourse', 30, 66]
    ];

    private options: any = {
        vAxis: { minValue: 0, maxValue: 100 } 
    };

    componentDidMount() {
        this.props.testStore.fetchStudentCompleted(this.props.user.id);
        this.props.testStore.fetchAllCompleted();

        const numOfComleted = this.props.testStore.allCompleted.length;        

        //get course names (props.courseStore.courses)
        this.courseNames = this.props.courseStore.courses.map((course: Course) => course.name);
        console.log(this.courseNames);
        
        //get user rates (testStore)        
        this.userRates = this.props.testStore.studentCompleted.map((item: any) => item.rate);
        console.log(this.userRates);
        
        //get avgRates
        const reducer = (accum: number, current: number) => accum += current;
        const allCompletedRate = this.props.testStore.allCompleted.map((item: any) => Number(item.rate));
        this.avgRates = allCompletedRate.reduce(reducer, 0) / numOfComleted;
        console.log(this.avgRates);
        
    }

    private formChartArray = (): void => {
        for (let i = 0; i < this.courseNames.length; i++) {
            this.data.push([`${this.courseNames[i]}`, this.userRates[i], this.avgRates]);
        }
    };

    private onChange = (value: any) => {
        console.log(value);
        
    };

    private onSearch = (value: any) => {
        console.log(value);
        
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
                        onChange={this.onChange}
                        onSearch={this.onSearch}
                        optionFilterProp='children'
                    >
                        <Option value='all'>All</Option>
                        <Option value='MiVT'>/MiVT/</Option>
                    </Select>
                </div>
            </div>
        );
    };

    private renderChart = (): React.ReactNode => {
        return (
            <Chart
                height='600px'
                width='80%'
                chartType='ColumnChart'
                data={this.data}
                options={this.options}
                legendToggle
            />
        );
    };

    render(): React.ReactChild {
        this.formChartArray();
        return (
            <section>
                {this.renderTitle()}
                {this.renderChart()}
            </section>
        );
    }
}