import {
  GET_REALTERS,
  REALTERS_LOADING,
  GET_ERRORS,
  GET_REALTER,
  NAME_EXIST
} from './types';
import Axios from 'axios';

// delete realter
export const deleteRealter = id => dispatch => {
  Axios.delete(`/realters/${id}`)
    .then(res => {
      // dispatch({
      //   type: DELETE_REALTER,
      //   payload: res.data
      // })
    }
    ).catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
}

// get realters
export const getRealters = () => dispatch => {
  dispatch({ type: REALTERS_LOADING });
  Axios.get('/realters')
    .then(realters => {
      dispatch({
        type: GET_REALTERS,
        payload: realters.data
      })
    })
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
}

// get realters by its name
export const getRealter = realter_name => dispatch => {
  // dispatch({
  //   type: REALTERS_LOADING,
  //   payload: true
  // });
  dispatch({ type: REALTERS_LOADING });
  Axios.get(`/realters/${realter_name}`)
    .then(realter => dispatch({
      type: GET_REALTER,
      payload: realter.data
    }))
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.data
    }));
}

// add realter
export const addRealter = (newRealter, history) => dispatch => {
  dispatch({ type: REALTERS_LOADING, payload: null });
  Axios.post('/realters', newRealter)
    .then(() => {
      history.push('/admin/realterList');
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
}

// add realter
export const realterNameValidate = (name) => dispatch => {
  Axios.get(`/realters/name/validate/${name}`)
    .then(res => {
      dispatch({
        type: NAME_EXIST,
        payload: res.data
      });
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
}

// add image not select error
export const addErrors = errors => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: errors
  });
}
