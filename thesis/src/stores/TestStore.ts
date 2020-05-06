import { observable, action, runInAction } from "mobx";
import Axios from "axios";
import { PATH } from "../routes/paths";
import { Test } from "../types/types";

class TestStore {
    @observable test!: Test;
    @observable studentCompleted: any = [];
    @observable allCompleted: any = [];

    @action.bound
    public fetchStudentCompleted(userId: string) {
        Axios.get(`${PATH.SERVER}/users/${userId}/studentCourses`)
        .then((courses) => {
            runInAction(() => {
                this.studentCompleted = courses.data;                
            });
        })
        .catch(error => console.log(error))
    }

    @action.bound
    public fetchAllCompleted() {
        Axios.get(`${PATH.SERVER}/studentCourses`)
        .then((courses) => {
            runInAction(() => {
                this.allCompleted = courses.data;                
            });
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
    }


    
    @action
    private setTest = (test: Test) => {
        this.test = test;                
    };

    @action
    public getTest = (): Test => {
        return this.test;
    };

}

export default TestStore;