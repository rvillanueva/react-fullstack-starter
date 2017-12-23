import {START_LOGIN, FINISH_LOGIN, UPDATE_MY_PROFILE, LOGOUT} from '../constants/actionTypes';
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
    case START_LOGIN:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {isAuthenticating: true});

    case FINISH_LOGIN:
      newState = objectAssign({}, state);
      newState.isAuthenticating = false;
      return newState;

    case UPDATE_MY_PROFILE:
      newState = objectAssign({}, state);
      newState.user = action.user;
      return newState;

    case LOGOUT:
      return objectAssign({}, state, { user: null });

    default:
      return state;
  }
}
