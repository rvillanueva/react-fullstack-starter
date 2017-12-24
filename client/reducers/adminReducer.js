import {ADMIN_UPDATE_USER_ROLE} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState.auth, action) {
  let newState;

  switch (action.type) {

    case ADMIN_UPDATE_USER_ROLE:
      newState = objectAssign({}, state);
      newState.users.map(user => {
        if(user._id == action.userId){
          user.role = action.newRole;
        }
      })
      return newState;

    default:
      return state;
  }
}
