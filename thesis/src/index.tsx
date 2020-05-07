import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import 'antd/dist/antd.css';
import './components/style.module.less';

import App from './components/App';
import UserStore from './stores/UserStore';
import CourseStore from './stores/CourseStore';
import SiderStore from './stores/SiderStore';
import WorkStore from './stores/WorkStore';
import TestStore from './stores/TestStore';
import ChartStore from './stores/ChartStore';

ReactDOM.render(
    <Provider   userStore={new UserStore()}
                courseStore={new CourseStore()}
                siderStore={new SiderStore()}   
                workStore={new WorkStore()}     
                testStore={new TestStore()}  
                chartStore={new ChartStore()}  
    >
        <App />
    </Provider>,
    document.getElementById('root')
);
