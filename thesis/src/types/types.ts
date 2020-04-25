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
    status: 'Not started' | 'In propgress' | 'Done';
    title: string;
    description: string;
    deadline: Date;
    parts: Part[]; 
}

export interface Course extends IdName {
    works: Work[];
}

export interface Part extends IdName {
    title: string;
    type: string; //mock
    content: any; //mock
}