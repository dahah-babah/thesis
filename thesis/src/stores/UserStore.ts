import { observable, runInAction, action } from 'mobx';
import Axios from 'axios';

import { User, Student, Teacher } from '../types/types';
import { PATH } from '../routes/paths';

class UserStore {
    @observable 
    public user!: User | Student | Teacher ;

    @observable
    public students: Student[] = [];

    @action
    private setUser = (user: User | Student | Teacher): void => {
        this.user = user;
        console.log(this.user);
        
    };

    @action
    public getUser = (): User | Student | Teacher => {
        return this.user;
    };

    @action
    private setStudents = (data: Student[]): void => {
        this.students = data;
    };

    @action
    public getStudents = (): Student[] => {
        return this.students;
    };

    @action.bound
    public getUserById(userId: string) {
        Axios.get(`${PATH.SERVER}/users?id=${userId}`)
        .then((user) => {
            runInAction(() => {
                this.setUser(user.data);
            });
        })
        .catch(error => console.log(error))
    };

    @action.bound
    public fetchStudents() {
        Axios.get(`${PATH.SERVER}/users?role=student`)
        .then(student => {
            runInAction(() => {
                this.setStudents(student.data);
            });
        })
        .catch(error => console.log(error))
    };

    @action
    public findUserDataById = (userId: string): Student => {
        return this.students.filter((student: Student) => student.id === userId)[0];
    };

    //add all fatchers from database by userId

    // replace to AuthStore
    // not include in report (cause it is for mock auth)
    @action.bound
    public findUser(username: string, password: string) {
        Axios.get(`${PATH.SERVER}/users`)
        .then((users) => {
            for (let i = 0; i < users.data.length; i++) {                
                if (users.data[i].username === username &&
                    users.data[i].password === password) {

                    runInAction(() => {
                        this.setUser(users.data[i]);                        
                    });               
                } 
            }
        })
        .catch(error => console.log(error))
    };

}

export default UserStore;
