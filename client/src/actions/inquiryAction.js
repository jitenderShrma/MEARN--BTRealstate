import { INQUIRY_STATUS, GET_ERRORS, GET_ALL_INQUIRY} from './types';
import axios from 'axios';


// Get All Inquiry by a user
export const getAllInquiry = user_email => dispatch => {
  dispatch({ type: GET_ERRORS, payload: {} });
  axios.get(`/inquiry/${user_email}`)
    .then(res => {
      dispatch({
        type: GET_ALL_INQUIRY,
        payload: res.data
      })
    }).catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    });
}


// Get Inquiry
export const getInquiry = newInquiry => dispatch => {
  dispatch({ type: GET_ERRORS, payload: {} });
  axios.post('/inquiry', newInquiry)
    .then(res => {
      dispatch({
        type: INQUIRY_STATUS,
        payload: res.data.success
      })
    }).catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
}

// Get All Inquiry by a user
export const getAllUserInquiry = () => dispatch => {
  //dispatch({ type: GET_ERRORS, payload: {} });
  axios.get('/inquiry/all/inquirys')
    .then(res => {
      dispatch({
        type: GET_ALL_INQUIRY,
        payload: res.data
      })
    }).catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    });
}

// delete inquiry
export const deleteInquiry = id => dispatch => {
  axios.delete(`/inquiry/${id}`)
}