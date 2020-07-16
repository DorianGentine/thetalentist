import { FETCH_STARTUPS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_STARTUPS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
