import { FETCH_CONVERSATION_ACTIVE } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CONVERSATION_ACTIVE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
