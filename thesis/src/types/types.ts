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

export interface File {
    filename: string;
    path: string;
}

export interface Work extends IdName {
    completed?: boolean;
    title: string;
    description: string;
    deadline: Date;
    files: File[]; // mock
    type: 'lab' | 'test' | string; //mock
}

export interface Course extends IdName {
    works: Work[];
    id: string;
    shortName: string;
    description: any;
}

export interface Test {
    id: string;
    courseId: string;
    workId: string;
    questions: Question[];
}

export interface Question {
    id: string;
    title: string;
    type: 'radio' | 'checkbox' | 'text' | 'select';
    points: TestPoint[];
    isCorrectId: string | string[];
}

export interface TestPoint {
    id: string;
    text: string;
}

export interface Report {
    userId: string;
    files?: File[];
}