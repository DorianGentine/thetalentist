import { FETCH_NOTIFICATIONS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
