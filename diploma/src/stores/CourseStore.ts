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

    @action
    public getCourses = (): Course[] => {
        return this.courses;
    };

    @action
    private setCourses = (courses: Course[]): void => {
        this.courses = courses;
    };
}

export default CourseStore;