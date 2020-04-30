import { observable, action, runInAction } from "mobx";
import Axios from "axios";

import { Course } from "../types/types";
import { PATH } from "../routes/paths";

class CourseStore {
    @observable
    public courses!: Course[];

    @action.bound
    public fetchCourses() {       
        Axios.get(`${PATH.SERVER}/courses`)
        .then((courses) => {
            runInAction(() => {
                this.setCourses(courses.data)
            })
        })
        .catch(error => console.log(error))
    };

    @action.bound
    public fetchStudentCourses(userId: string) {
        //make correct reauest
        Axios.get(`${PATH.SERVER}/courses`)
        .then((courses) => {
            runInAction(() => {
                this.setCourses(courses.data)
            })
        })
        .catch(error => console.log(error))
    }

    @action.bound
    public fetchTeacherCourses(courseId: string) {
        //make correct request for several course id
        Axios.get(`${PATH.SERVER}/courses`)
        .then((courses) => {
            runInAction(() => {
                this.setCourses(courses.data)
            })
        })
        .catch(error => console.log(error))
    }

    @action
    public getCourses = (): Course[] => {
        return this.courses;
    };

    @action
    private setCourses = (courses: Course[]): void => {
        this.courses = courses;
        // console.log(this.courses);
        
    };
}

export default CourseStore;