import { FETCH_LANGUAGES } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_LANGUAGES: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
