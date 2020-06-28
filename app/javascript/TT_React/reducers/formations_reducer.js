import { FETCH_FORMATIONS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_FORMATIONS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
