import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';

import { PATH } from '../routes/paths';
import { AuthPage } from './pages/CommonPages/AuthPage/AuthPage';
import { UserPage } from './pages/CommonPages/UserPage/UserPage';

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
                    <Redirect exact from={PATH.USER} to={`${PATH.USER}/home`} />
                    <Route path={`${PATH.USER}`}>
                        <UserPage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;