import { GET_LISTS, LISTING_LOADING, GET_LISTING, CUSTOMISED_LISTS, GET_LIST, TITLE_EXIST } from '../actions/types';
const initiatState = {
  lists: [],
  list: {},
  loading: false
};

export default function (state = initiatState, action) {
  switch (action.type) {
    default: return { ...state }
    case GET_LISTING: return {
      loading: false,
      lists: action.payload,
      heading: 'Latest Listing'
    }
    case LISTING_LOADING: return {
      loading: true,
      lists: []
    }
    case GET_LISTS: return {
      loading: false,
      lists: action.payload,
    }
    case CUSTOMISED_LISTS: return {
      loading: false,
      lists: action.payload,
      heading: 'Search Result'
    }
    case GET_LIST: return {
      loading: false,
      list: action.payload,
      lists: []
    }
    case TITLE_EXIST: return action.payload;
  }
}