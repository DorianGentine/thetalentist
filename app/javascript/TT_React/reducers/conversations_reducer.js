import { FETCH_CONVERSATIONS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CONVERSATIONS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
