export const PATH = {
    // COMMON PATHS
    SERVER: 'http://localhost:3333',
    LOGIN: '/login',
    USER: '/user/:userId',
    STATISTIC: '/user/:userId/statistic',
    // COURSES: '/user/:userId/courses',
    // TASKS: '/user/:userId/courses/:courseId/works',
    
    // STUDENT PATHS
    WORKDO: '/user/:userId/courses/:courseId/works/:workId/do',
    WORKVIEW: '/user/:userId/courses/:courseId/works/:workId/',
    COURSE: '/user/:userId/courses/:courseId',
    
    // TEACHER PATHS
    WORKEDIT: '/user/:userId/courses/:courseId/works/:workId/edit',
    WORKADD: '/user/:userId/courses/:courseId/works/new',
    COURSEEDIT: '/user/:userId/courses/:courseId/edit',
    
    // ADMIN PATHS
};

// student - course - display all works this course with statistic
// teacher - course - display all works as dropdowns (in work - statistic)
