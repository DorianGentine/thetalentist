import { FETCH_TALENTS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TALENTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
