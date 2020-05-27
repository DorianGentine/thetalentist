import { FETCH_SECTORS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_SECTORS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
