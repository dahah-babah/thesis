import { observable, action, runInAction } from "mobx";
import { Work } from "../types/types";
import Axios from "axios";
import { PATH } from "../routes/paths";

class WorkStore {
    @observable
    works: Work[] = [];
    worksById: any;

    @action.bound
    public fetchWorkByUserIdCourseId(userId: string, courseId: string) {
        Axios.get(`${PATH.SERVER}/users/${userId}/studentCourses?courseId=${courseId}`)
        .then((work) => {
            runInAction(() =>{
                this.worksById = work.data;
            });
        })
    };

    @action.bound
    public fetchWorks(courseId: string) {
        Axios.get(`${PATH.SERVER}/courses/${courseId}/works`)
        .then((works) => {            
            runInAction(() => {
                this.setWorks(works.data) 
            })
            
        })
        .catch(error => console.log(error))
    }
    
    @action
    private setWorks = (works: Work[]) => {
        this.works = works;      
        // console.log(this.works);
          
    };

    @action
    public getWork = (workId: string): Work | undefined => {              
        return this.works.find((work: Work) => work.id === workId);
    }; 

    @action
    public getWorks = (): Work[] => {
        // console.log(this.works);
        return this.works;
    };

}

export default WorkStore;