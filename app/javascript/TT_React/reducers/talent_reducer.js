import { FETCH_TALENT } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TALENT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}