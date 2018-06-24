import axios from 'axios';

import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  GET_USER,
  REMOVE_AUTH_ERROR
} from './types';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function removeAuthError() {
  return {
    type: REMOVE_AUTH_ERROR
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function signinUser(values) {
  const { username, password } = values;
  return dispatch => {
    axios
      .post('/auth/signin', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
      })
      .catch(() => {
        dispatch(authError('Incorrect credentials'));
      });
  };
}

export function signupUser(values) {
  return dispatch => {
    axios
      .post('/auth/signup', values)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
      })
      .catch(error => {
        const errorMessage = error.response.data.error;
        dispatch(authError(errorMessage));
      });
  };
}

export function getUser() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/me', {
        headers: { authorization: localStorage.getItem('token') }
      });
      dispatch({
        type: GET_USER,
        payload: response.data
      });
    } catch (e) {
      localStorage.removeItem('token');
      dispatch({ type: UNAUTH_USER });
    }
  };
}
