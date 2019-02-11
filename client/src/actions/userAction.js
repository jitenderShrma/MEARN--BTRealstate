import axios from 'axios';
import {
  GET_USERS,
  GET_ERRORS,
  GET_RESPONSE
} from './types';
// get all  users
export const getAllUsers = () => dispatch => {
  axios.get('/users/all')
    .then(user => dispatch({
      type: GET_USERS,
      payload: user.data
    })
    )
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
    );
}

// register user from admin
export const registerUserFromAdmin = data => dispatch => {
  dispatch({type: GET_ERRORS, payload: {}});
  axios.post('/users/register', data)
    .then(res => {
      dispatch({
        type: GET_RESPONSE,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    });
}

