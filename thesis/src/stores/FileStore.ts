import { observable, action, runInAction } from "mobx";
import { File } from '../types/types';
import Axios from 'axios';
import { PATH } from "../routes/paths";

class FileStore {
    @observable files: File[] | File = [];

    @action
    public getFiles = (): File[] | File => {
        console.log(this.files);
        return this.files;
    };

    @action
    public setFiles = (files: File[] | File): void => {
        this.files = files;
        console.log(this.files);
        
    };

    @action.bound
    public getAllFilesbyCourseId(courseId: string) {
        Axios.get(`${PATH.SERVER}/files?courseId=${courseId}`)
        .then((files) => {  
            
            console.log(files.data);
            

            runInAction(() => {
                this.setFiles(files.data) 
            });
            
        })
        .catch(error => console.log(error))
    };

}

export default FileStore;