import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  browserHistory
} from 'react-router-dom';
import App from '../App';

const Root = () => {
  return (
    <Router history={browserHistory}>
      <div>
        <Switch>
          <Route path="/" component={App} exact />
        </Switch>
      </div>
    </Router>
  );
};

export default Root;
