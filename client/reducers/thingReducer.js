import {MERGE_THING_LIST, DELETE_THING} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState.things, action) {
  let newState;
  let patch;

  switch (action.type) {

    case MERGE_THING_LIST:
      patch = {
        byId: Object.assign({}, state.byId),
        allIds: [...state.allIds]
      }
      action.things.map(thing => {
        if(!state.byId[thing._id]){
          patch.allIds.push(thing._id);
        }
        patch.byId[thing._id] = thing;
      })
      return objectAssign({}, state, patch);

    case DELETE_THING:
      patch = {
        byId: objectAssign({}, state.byId, {[action.id]: null}),
        allIds: state.allIds.filter(id => {
          return id != action.id;
        })
      }
      return objectAssign({}, state, patch);

    default:
      return state;
  }
}
