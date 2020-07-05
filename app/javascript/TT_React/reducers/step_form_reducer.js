import { STEP_FORM } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case STEP_FORM: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
