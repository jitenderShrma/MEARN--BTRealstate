import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  GET_USER,
  GET_ERRORS, CLEAR_CURRENT_USER,
  REMOVE_ERRORS
} from './types';
import authHeaderToken from '../helper/authHeaderToken';

// login admin
export const loginAdminUser = (data, history) => dispatch => {

  axios.post('/admin/login', data)
    .then(user => {
      const token = user.data.token;

      // save to localStorage
      localStorage.setItem('jwt_token', token);

      // set in header
      authHeaderToken(localStorage.getItem('jwt_token'));

      // dispatch user action
      const decoded = jwt_decode(token);
      dispatch(dispatchUser(decoded));
      history.push('/admin/home');
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    });
}

// login user 
export const loginUser = (data, history) => dispatch => {

  axios.post('/users/login', data)
    .then(user => {
      const token = user.data.token;

      // save to localStorage
      localStorage.setItem('jwt_token', token);

      // set in header
      authHeaderToken(localStorage.getItem('jwt_token'));

      // dispatch user action
      const decoded = jwt_decode(token);
      dispatch(dispatchUser(decoded));
      history.push('/dashboard');
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    });
}

// register user
export const registerUser = (data, history) => dispatch => {
  axios.post('/users/register', data)
    .then(() => history.push('/login'))
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    });
}

const logout = () => dispatch => {
  // clear current user
  dispatch({
    type: CLEAR_CURRENT_USER,
    payload: null
  });
  // remove token from localStorage
  localStorage.removeItem('jwt_token');
  // redirect to login router
}
// Logout user
export const logoutUser = () => {
  logout();
  window.location.href = "/login";
}
// Logout admin
export const logoutAdmin = () => {
  logout();
  window.location.href = "/admin";
}

// remove register user errors
export const removeErrors = () => dispatch => {
  dispatch({
    type: REMOVE_ERRORS,
    payload: {}
  });
}

const dispatchUser = function (data) {
  return {
    type: GET_USER,
    payload: data
  }
}