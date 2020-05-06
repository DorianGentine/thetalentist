import { MESSAGERIE_ACTIVE_MOBILE } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case MESSAGERIE_ACTIVE_MOBILE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
