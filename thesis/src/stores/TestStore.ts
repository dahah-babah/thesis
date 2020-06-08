import { observable, action, runInAction, toJS, computed } from "mobx";
import Axios from "axios";
import { PATH } from "../routes/paths";
import { Test } from "../types/types";
import { reducer } from "../utils/calculations";

class TestStore {

    @observable test!: Test;
    @observable studentCompleted: any = [];
    @observable allCompleted: any = [];
    // avg this user lab rates
    @observable avgUserRates: number = 0;
    // avg all user rates
    @observable avgRates: number = 0;
    @observable correctAnswers: any = [];
    @observable testIsFinished = false;

    @action
    private setTest = (test: Test) => {
        this.test = test;                
    };

    @action
    public getTest = (): Test => {
        return this.test;
    };

    @action
    public getStudentCompleted = (): any[] => {
        // console.log(this.studentCompleted);
        
        return this.studentCompleted;
    };

    @action
    private setStudentCompleted = (data: any): void => {
        this.studentCompleted = data;
        // console.log(this.studentCompleted);
        
    };

    private getAllCompletedRates = () => {        
        return this.allCompleted.map((item: any) => Number(item.rate)); 
    };

    private getStudentCompletedRates = () => {        
        return this.studentCompleted.map((item: any) => Number(item.rate)); 
    };

    private getAvgUserRates = () => {
        return this.getStudentCompletedRates().reduce(reducer, 0) / this.studentCompleted.length;
    };

    private getAvgAllRates = () => {        
        return this.getAllCompletedRates().reduce(reducer, 0) / this.allCompleted.length;
    };

    // fetch this user completed tasks
    @action.bound
    public fetchStudentCompleted(userId: string) {
        Axios.get(`${PATH.SERVER}/users/${userId}/studentCourses`)
        .then((courses) => {
            // console.log(courses.data);
            
            runInAction(() => {
                this.setStudentCompleted(courses.data);                
            });
            
            this.getAvgUserRates();
        })
        .catch(error => console.log(error))
    }

    // fetch all users who completed tasks
    @action.bound
    public fetchAllCompleted(courseId: string) {
        Axios.get(`${PATH.SERVER}/courses/${courseId}/studentCourses`)
        .then((courses) => {
            // console.log(courses.data);

            runInAction(() => {
                this.allCompleted = courses.data;                
            });

            this.getAvgAllRates();
        })
        .catch(error => console.log(error))
    }

    @action.bound
    public fetchTest(courseId: string, workId: string) {
        Axios.get(`${PATH.SERVER}/tests?courseId=${courseId}&workId=${workId}`)
        .then((test) => {
            runInAction(() => {
                this.setTest(test.data);
            })
            
        })
        .catch(error => console.log(error))
    }

    @action.bound
    public postCompletedTest(userId: string, courseId: string, workId: string, rate: string) {
        Axios.post(`${PATH.SERVER}/users/${userId}/studentCourses`, {
            courseId: `${courseId}`,
            workId: `${workId}`,
            completed: true,
            rate: `${rate}`
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    };

    private getCorrectAnswers = (): any => {
        if (this.test) {               
            return this.correctAnswers = this.test[0].questions.map((question) => 
                question.isCorrectId
            );
        }
    };

    public setTestFinished = (): void => {
        this.testIsFinished = true;
    };

    public calculateSuccess = (answers: any): boolean[] => {
        this.correctAnswers = this.getCorrectAnswers();

        const testLen = this.correctAnswers.length;
        
        let success: boolean[] = [];        

        for (let i = 0; i < testLen; i++) {
            if (typeof answers[i] === 'string') {
                success.push(toJS(this.correctAnswers[i]) === answers[i]);
                
            } else if (typeof answers[i] === 'object') {
                const coorectLen = toJS(this.correctAnswers[i]).length;
                answers[i].sort();

                let isCorrect = true;
                
                for (let k = 0; k < coorectLen; k++) {                    
                    if (!(toJS(this.correctAnswers[i])[k].id === answers[i][k])) {
                        isCorrect = false;
                    }
                }                

                success.push(isCorrect);
            }
        }
        
        return success;        
    };

    public calculateRate = (success: boolean[]): number => {        
        const numOfAnswers = success.length;
        const weight = (100 / numOfAnswers).toFixed(2);
        const numNotFailed = success.filter((bool: boolean) => bool === true).length;
        return Number(weight) * numNotFailed;
    };

    public calculateTime = (): void | Date => {
        console.log('calculated time');
        //time start
        //time finished
    };

}

export default TestStore;