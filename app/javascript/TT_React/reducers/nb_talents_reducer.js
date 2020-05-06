import { NB_TALENTS } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case NB_TALENTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
