import { FETCH_COMPANY_TYPES } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_COMPANY_TYPES: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
