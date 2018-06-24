import 'bootstrap/dist/css/bootstrap.css';
import '../assets/scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Root from './components/root/Root';
import { AUTH_USER } from './actions/types';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
};

render(Root);
