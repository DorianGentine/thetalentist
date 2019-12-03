import { UPDATE_FILTER } from '../actions/index';


export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_FILTER: {
      let filterUpdated = state
      if(state.includes(action.payload)){
        const indexMetier = filterUpdated.indexOf(action.payload)
        filterUpdated.splice(indexMetier, 1);
      }else{
        filterUpdated.push(action.payload)
      }
      return filterUpdated;
    }
    default: {
      return state;
    }
  }
}
