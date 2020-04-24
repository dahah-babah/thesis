import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import 'antd/dist/antd.css';
import './components/style.module.less';

import App from './components/App';
import UserStore from './stores/UserStore';
import CourseStore from './stores/CourseStore';
import SiderStore from './stores/SiderStore';

ReactDOM.render(
    <Provider   userStore={new UserStore()}
                courseStore={new CourseStore()}
                siderStore={new SiderStore()}            
    >
        <App />
    </Provider>,
    document.getElementById('root')
);
