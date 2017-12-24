import {UPDATE_USER_LIST} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState.users, action) {
  let newState;

  switch (action.type) {

    case UPDATE_USER_LIST:
      let byId = Object.assign({}, state.byId);
      let allIds = [...state.allIds];
      action.users.map(user => {
        if(!state.byId[user._id]){
          allIds.push(user._id);
        }
        byId[user._id] = user;
      })
      newState = objectAssign({}, state, { byId: byId, allIds: allIds});
      return newState;

    default:
      return state;
  }
}
