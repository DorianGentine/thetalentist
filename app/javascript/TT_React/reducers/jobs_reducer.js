import { FETCH_JOBS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_JOBS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
