import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';

import { PATH } from '../routes/paths';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { UserPage } from './pages/UserPage/UserPage';
// import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const history = createBrowserHistory();

export class App extends React.Component {

    // private PrivateRoute = ({ children, ...rest }): React.ReactNode => {
    //     return (
    //         <Route
    //             {...rest}
    //             render={({ location }) => 
    //                 fakeAuth.isLoggedIn ? (
    //                     children
    //                 ) : (
    //                     <Redirect
    //                         to={{
    //                             pathname: '/login',
    //                             state: { from: location }
    //                         }}
    //                     />
    //                 )
    //             } 
    //         />
    //     );
    // };

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