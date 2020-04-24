export interface IdName {
    id: string;
    name: string;
}

export interface User extends IdName {
    role: 'admin' | 'student' | 'teacher';
}

export interface Student extends User {
    name: string;
    lastname: string;
    group: string;
    level: 'bachelor' | 'master';
    year: string;
    semester: string;
}

export interface Teacher extends User {
    name: string;
    lastname: string;
    level: string;
    courses: string[]; //temporary mock
}

export interface Work extends IdName {
    type: 'Lab' | 'Practic' | 'Theory';
    status: 'Not started' | 'In propgress' | 'Done';
    title: string;
    description: string;
    deadline: Date;
    date: Date;
    mark: string;
    parts: object[]; //temporary mock
}

export interface Course extends IdName {
    works: Work[];
}