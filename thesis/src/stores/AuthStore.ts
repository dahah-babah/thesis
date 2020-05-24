import { observable, runInAction, action } from 'mobx';
import Axios from 'axios';

import { User, Student, Teacher } from '../types/types';
import { PATH } from '../routes/paths';

class AuthStore {
    @observable public user!: User | Student | Teacher ;
    // @observable public token: string = '';
    @observable public isRemembered: boolean = false;
    @observable public isAuthorized: boolean = false;

    constructor() {
        if (localStorage.length) {
            this.isAuthorized = true;
        }
    };

    @action
    private setUser = (user: User | Student | Teacher): void => {
        this.user = user;
        localStorage.setItem('userId', this.user.id);
        console.log(this.user);
        
    };

    @action
    public getUser = (): User | Student | Teacher => {
        return this.user;
    };

    // admin stuff
    // @action
    // public getUsers = (): any => {
    //     Axios.get(`${PATH.SERVER}/users`)
    //     .then((users) => 
    //         console.log(users)
    //     )
    // };

    @action
    public setIsRememberedTrue = (): void => {
        this.isRemembered = true;
    };

    @action.bound
    public findUser(username: string, password: string) {
        Axios.get(`${PATH.SERVER}/users`)
        .then((users) => {
            for (let i = 0; i < users.data.length; i++) {                
                if (users.data[i].username === username &&
                    users.data[i].password === password) {

                    runInAction(() => {
                        this.setUser(users.data[i]);                        
                    })                    
                }
            }
        })
        .catch(error => console.log(error))
    };

}

export default AuthStore;
