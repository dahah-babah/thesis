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

export interface Work extends IdName {
    type: 'Lab' | 'Practic' | 'Theory';
    status: 'Not started' | 'In propgress' | 'Done';
    title: string;
    description: string;
    deadline: Date;
    date: Date;
    mark: string;
    parts: string[]; //temporary mock
}

export interface Course extends IdName {
    works: Work[];
}