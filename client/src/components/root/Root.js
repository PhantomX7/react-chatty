import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  browserHistory
} from 'react-router-dom';
import RequireAuth from '../../hoc/require_auth';
import App from '../App';
import Signin from '../../containers/auth/Signin';
import Signup from '../../containers/auth/Signup';

const Root = () => {
  return (
    <Router history={browserHistory}>
      <div>
        <Switch>
          <Route path="/" component={RequireAuth(App)} exact />
          <Route path="/signin" component={Signin} exact />
          <Route path="/signup" component={Signup} exact />
        </Switch>
      </div>
    </Router>
  );
};

export default Root;
