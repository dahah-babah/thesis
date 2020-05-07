import { observable, action } from "mobx";

class ChartStore {
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
}

export default ChartStore;