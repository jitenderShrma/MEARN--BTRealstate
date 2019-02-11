import { GET_RESPONSE } from '../../actions/types';
const initialState = {
  response:null
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return {
      ...state
    }
    case GET_RESPONSE: return action.payload;
  }
}