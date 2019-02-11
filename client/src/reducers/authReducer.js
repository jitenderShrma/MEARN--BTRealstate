import { GET_USER,
  CLEAR_CURRENT_USER
 } from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: {},
  users:[]
}

export default function(state= initialState, action){
  switch(action.type){
    default : return {
      ...state
    }
    case GET_USER: return {
      isAuthenticated: true,
      user: action.payload
    }
    case CLEAR_CURRENT_USER :
    return { ...state}
  }
}