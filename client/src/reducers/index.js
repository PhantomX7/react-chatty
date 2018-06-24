import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import testReducer from './testreducer';
import authReducer from './auth_reducer';

export default combineReducers({
  form: formReducer,
  test: testReducer,
  auth: authReducer
});
