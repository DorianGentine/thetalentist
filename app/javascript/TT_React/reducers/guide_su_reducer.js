import { GUIDE_SU } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case GUIDE_SU: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
