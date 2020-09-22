import { FETCH_TECHNOS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TECHNOS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
