import { UPDATE_FILTER } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_FILTER: {
      let filterUpdated
      if(state.includes(action.payload)){
        filterUpdated = state.filter(index => index !== action.payload)
      }else{
        filterUpdated = state.concat(action.payload)
      }
      return filterUpdated
    }
    default: {
      return state;
    }
  }
}
