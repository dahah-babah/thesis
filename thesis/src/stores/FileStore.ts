import { observable, action } from "mobx";
import { File } from '../types/types';

class FileStore {
    // @observable files: File[] | File = [];
    @observable fileProps: object = {};

    constructor() {
    };

    // @action
    // public getFiles = (): File[] | File => {
    //     return this.files;
    // };

    // @action
    // public setFiles = (files: File[] | File): void => {
    //     this.files = files;
    // };

}

export default FileStore;