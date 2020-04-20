import { observable, runInAction, action } from 'mobx';
import Axios from 'axios';

import { User, Student, Teacher } from '../types/types';
import { PATH } from '../routes/paths';

class UserStore {
    @observable 
    public user!: User | Student | Teacher ;

    // @observable 
    // public token: string = '';

    @action
    public getUsers = (): any => {
        Axios.get(`${PATH.SERVER}/users`)
        .then((users) => 
            console.log(users)
        )
    };

    @action.bound
    public getUser(username: string, password: string) {
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

    @action
    private setUser = (user: User | Student | Teacher): void => {
        this.user = user;
        console.log(this.user);
        
    };
}

export default UserStore;
