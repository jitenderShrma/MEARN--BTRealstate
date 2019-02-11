import { GET_ALL_INQUIRY, INQUIRY_STATUS, INQUIRY_DELETED } from '../actions/types';
const initialState = {
  success: false,
  inquiry: []
}
export default function(state=initialState, actions){
  switch(actions.type){
    default: return [];
    case INQUIRY_STATUS : return {
      success:actions.payload
    }
    case GET_ALL_INQUIRY: return actions.payload;
    case INQUIRY_DELETED: return actions.payload;
  }
}