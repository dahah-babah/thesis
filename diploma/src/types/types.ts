export interface IdName {
    id: string;
    name: string;
}

export interface User extends IdName {
    role: string;
}

export interface Student extends User {
    name: string;
    lastname: string;
    level: string;
    year: string;
}

export interface Teacher extends User {
    name: string;
    lastname: string;
    level: string;
}