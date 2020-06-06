import { observable, action, runInAction } from "mobx";
import Axios from "axios";

import { Course, Work } from "../types/types";
import { PATH } from "../routes/paths";

class CourseStore {
    @observable public courses: Course[] = [];
    public worksByCourseId: Work[] = [];
    @observable public completedReports: any[] = [];

    @action.bound
    public fetchWorksById(courseId: string) {       
        Axios.get(`${PATH.SERVER}/courses/${courseId}/works`)
        .then((works) => {
            runInAction(() => {
                this.worksByCourseId = works.data;
            })
        })
        .catch(error => console.log(error))
    };

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
    public getCourseSgortNameById = (courseId: string): string => {
        return this.courses.filter((course: Course) => 
            course.id = courseId
        )[0].shortName;
    };

    @action.bound
    public fetchStudentCourses(userId: string, courseId: string) {
        //make correct reauest
        Axios.get(`${PATH.SERVER}/users/${userId}/courses?id=${courseId}`)
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
        Axios.get(`${PATH.SERVER}/studentCourses`)
        .then((courses) => {
            console.log(courses.data);
            
            runInAction(() => {
                this.setcompletedReports(courses.data)
            })
        })
        .catch(error => console.log(error))
    }

    @action
    public getCourses = (): Course[] => {
        // console.log(this.courses);        
        return this.courses;
    };

    @action
    private setCourses = (courses: Course[]): void => {
        this.courses = courses;
        // console.log(this.courses);
        
    };

    @action
    private setcompletedReports = (data: any[]): void => {
        this.completedReports = data;
        console.log(this.completedReports);
    };

    @action
    public getSetcompletedReports = (): any[] => {
        console.log(this.completedReports);
        
        return this.completedReports;
    };
}

export default CourseStore;