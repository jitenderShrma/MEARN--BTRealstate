import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import listingReducer from './listingReducer';
import realterReducer from './realterReducer';
import inquiryReducer from './inquiryReducer';
// admin
import getUsers from './admin/getUsers';
import userReducer from './admin/userReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    listing: listingReducer,
    realters: realterReducer,
    inquiry: inquiryReducer,
    user: userReducer,
    userResponse: getUsers
  });
