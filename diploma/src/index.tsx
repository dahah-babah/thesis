import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import 'antd/dist/antd.css';
import './components/style.module.less';

import App from './components/App';
import UserStore from './store/UserStore';

ReactDOM.render(
    <Provider userStore={new UserStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);
