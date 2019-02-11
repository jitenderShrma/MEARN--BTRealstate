import { GET_REALTERS,
  REALTERS_LOADING,
  GET_REALTER, 
  DELETE_REALTER,
  NAME_EXIST
} from '../actions/types';
const initialState = {
  realters: [],
  realter: {},
  loading: false
}
export default function(state = initialState, action){
  switch(action.type){
    default : return {
      ...state
    }
    case REALTERS_LOADING: return {
      loading: true,
      realters: [],
      realter:{}
    }
    case GET_REALTERS: return {
      loading: false,
      realter:{},
      realters: action.payload
    }
    case GET_REALTER: return {
      loading: false,
      realters:[],
      realter: action.payload
    }
    case DELETE_REALTER: return {
      success:action.payload,
      loading: true,
      realters:[]
    }
    case NAME_EXIST: return action.payload;
  }
}