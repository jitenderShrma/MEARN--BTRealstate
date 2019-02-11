import { GET_LISTS, LISTING_LOADING, GET_ERRORS, GET_LISTING, CUSTOMISED_LISTS, GET_LIST, TITLE_EXIST } from '../actions/types';
import axios from 'axios';



// get listing
export const getListing = () => dispatch => {
  dispatch(listingLoading());
  axios.get('/props/listing')
    .then(lists => {
      dispatch({
        type: GET_LISTING,
        payload: lists.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      })
    });
}

// get listing
export const getListingFromAdmin = () => dispatch => {
  dispatch(listingLoading());
  axios.get('/props/listing/adminuser')
    .then(lists => {
      dispatch({
        type: GET_LISTING,
        payload: lists.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      })
    });
}

// get latest three lists
export const getLists = () => dispatch => {
  dispatch(listingLoading());
  axios.get('/props/lists')
    .then(lists => {
      dispatch({
        type: GET_LISTS,
        payload: lists.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      })
    });
}


// filtering listing 
export const filterListing = newSearch => dispatch => {
  dispatch(listingLoading());
  axios.post('/props/listing/filter', newSearch)
    .then(lists => {
      dispatch({
        type: CUSTOMISED_LISTS,
        payload: lists.data
      })
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error
      })
    );
}

// to get list by its title
export const getList = title_name => dispatch => {
  dispatch(listingLoading());
  axios.get(`/props/title/${title_name}`)
    .then(lists => {
      dispatch({
        type: GET_LIST,
        payload: lists.data
      })
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
}

// add listing
export const addListing = (data, history) => dispatch => {
  dispatch(listingLoading());
  axios.post('/props/listing', data)
    .then((res) => {
      history.push('/admin/listingList');
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      })
    });
}

// add listing
export const saveUnpublish = (data) => dispatch => {
  dispatch(listingLoading());
  axios.post('/props/unpublish/save', data)
    .then(() => {
      //history.push('/admin/listingList');
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      })
    });
}
// title validation
export const titleValidate = (title) => dispatch => {
  axios.get(`/props/title/validate/${title}`)
    .then(res => {
      dispatch({
        type: TITLE_EXIST,
        payload: res.data
      });
    });
}

export const listingLoading = () => {
  return {
    type: LISTING_LOADING,
    payload: true
  }
}