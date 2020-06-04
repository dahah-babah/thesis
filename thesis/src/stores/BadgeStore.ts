import { observable, runInAction, action } from 'mobx';
import Axios from 'axios';

import { PATH } from '../routes/paths';
import { Work } from '../types/types';

class BadgeStore {
    @observable isCourseCompleted: boolean = false;
    @observable completedTasks: any = [];

    @action
    private setCourseCompleted = (bool: boolean): void => {
        this.isCourseCompleted = bool;        
    };

    @action
    private setCompletedTasks = (data: any): void => {
        this.completedTasks = data;        
    };;

    @action.bound
    public getCompletedTasks(userId: string) {
        Axios.get(`${PATH.SERVER}/studentCourses?userId=${userId}`)
        .then((tasks) => {         
           runInAction(() => {
               this.setCompletedTasks(tasks.data)
           });
        })
        .catch(error => console.log(error))
    };

    @action
    public isTaskCompleted = (workId: string): boolean => {        
        return this.completedTasks.find((task) => task.workId === workId);
    };

    @action
    public calcIsCourseCompleted = (works: Work[]): void => {
        if (this.completedTasks.length !== 0 && this.completedTasks.length === works.length) {            
            this.setCourseCompleted(true);
        }
    };

    public getLabStatus = (workId: string): 'success' | 'error' | 'warning' => {
        const rate = this.completedTasks.find((task) => task.workId === workId).rate;
                
        if (rate <= 54) return 'error';
        else if (rate >= 55 && rate <= 69) return 'warning';
        else return 'success';
    };

}

export default BadgeStore;
