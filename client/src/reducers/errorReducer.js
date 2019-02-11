import { GET_ERRORS, REMOVE_ERRORS } from '../actions/types';
const initiatState = {}

export default function(state = initiatState, action){
  switch(action.type){
    default: {
      return state
    }
    case GET_ERRORS: {
      return action.payload
    }
    case REMOVE_ERRORS: return {};
  }
}