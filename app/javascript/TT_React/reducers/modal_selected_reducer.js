import { MODAL_CLOSED, MODAL_OPENED, FETCH_TALENTS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case MODAL_CLOSED: {
      return null;
    }
    case MODAL_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
