import { MODAL_CLOSED, MODAL_OPENED, FETCH_TALENTS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TALENTS: {
      return true;
    }
    case MODAL_CLOSED: {
      return false;
    }
    case MODAL_OPENED: {
      return true;
    }
    default: {
      return state;
    }
  }
}
