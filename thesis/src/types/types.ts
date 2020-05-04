export interface IdName {
    id: string;
    name: string;
}

export interface User extends IdName {
    role: 'admin' | 'student' | 'teacher';
}

export interface Student extends User {
    lastname: string;
    group: string;
    level: 'bachelor' | 'master';
    year: string;
    semester: string;
    courses: Course[];
}

export interface Teacher extends User {
    name: string;
    lastname: string;
    level: string;
    courses: Course[]; 
}

export interface Work extends IdName {
    status?: 'not started' | 'in propgress' | 'done';
    title: string;
    description: string;
    deadline: Date;
    parts: Part[]; 
    files?: any; // mock
}

export interface Course extends IdName {
    works: Work[];
    description: any;
}

export interface Part extends IdName {
    title: string;
    type: 'lab' | 'test' | string; //mock
    content: any; //mock
}