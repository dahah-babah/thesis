import { observable, action } from "mobx";

class ChartStore {

    public chartAllHeader = ['Дисциплина', 'Мой средний балл', 'Средний балл по курсу'];
    public chartCourseHeader = ['ЛР', 'Мой балл', 'Средний балл по курсу'];

    @observable isChartVisible = true;
    @observable chartData: any = [];

    @action
    public toggleChart = (): void => {
        this.isChartVisible = !this.isChartVisible;        
    };

    @action
    public addData = (data: any): void => {
        this.chartData.push(data);
    };

    @action
    public clearChart = (): void => {        
        this.chartData.length = 0;
    };

    //table
}

export default ChartStore;