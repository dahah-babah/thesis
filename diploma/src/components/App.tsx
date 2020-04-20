import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';

import { PATH } from '../routes/paths';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { UserPage } from './pages/UserPage/UserPage';

const history = createBrowserHistory();

class App extends React.Component {

    render(): React.ReactChild {        
        return (            
            <Router history={history}>
                <Switch>
                    <Redirect exact from='/' to={PATH.LOGIN} />
                    <Route path={PATH.LOGIN}>
                        <AuthPage />
                    </Route>
                    <Route path={PATH.USER}>
                        <UserPage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;