import axios from 'axios';
import { PATH } from '../routes/paths';

export class APIService {
    public static getUsers = (): any => {
        axios.get(`${PATH.SERVER}/users`)
        .then((users) => 
            console.log(users)
        )
    };

    public static getUser = (id: string): any => {
        axios.get(`${PATH.SERVER}/users`)
        .then((users) => {
            for (let i = 0; i < users.data.length; i++) {
                if (users.data[i].id === id) {
                    console.log(users.data[i]);
                } 
            }
        })
        .catch(error => console.log(error))
    };
}