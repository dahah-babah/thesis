import { observable, action, runInAction } from "mobx";
import { Work } from "../types/types";
import Axios from "axios";
import { PATH } from "../routes/paths";

class WorkStore {
    @observable
    works: Work[] = [];

    @action.bound
    public fetchWorks(courseId: string) {
        Axios.get(`${PATH.SERVER}/courses?id=${courseId}`)
        .then((course) => {
            runInAction(() => {
                this.setWorks(
                    course.data[0].works) 
            })
            
        })
        .catch(error => console.log(error))
    }
    
    @action
    private setWorks = (works: Work[]) => {
        this.works = works;
        console.log(this.works);
        
    };

    @action
    public getWork = (workId: string): Work | undefined => {              
        return this.works.find((work: Work) => work.id === workId);
    }; 

    @action
    public getWorks = (): Work[] => {
        return this.works;
    };

}

export default WorkStore;