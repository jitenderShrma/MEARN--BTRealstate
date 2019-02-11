import { GET_USERS } from '../../actions/types';
const initialState = {
  users: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return {
      ...state
    }
    case GET_USERS: return { users: action.payload }
  }
}