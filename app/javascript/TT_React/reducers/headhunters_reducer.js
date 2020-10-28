import { FETCH_HEADHUNTERS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_HEADHUNTERS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
