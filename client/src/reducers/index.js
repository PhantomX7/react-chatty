import { combineReducers } from 'redux';
import testReducer from './testreducer';

export default combineReducers({
  test: testReducer
});
