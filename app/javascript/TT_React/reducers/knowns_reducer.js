import { FETCH_KNOWNS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_KNOWNS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
