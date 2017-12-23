import {REQUEST_LOGIN, COMPLETE_LOGIN} from '../constants/actionTypes';
import {necessaryDataIsProvidedToCalculateSavings, calculateSavings} from '../utils/fuelSavings';
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
    case REQUEST_LOGIN:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {isLogginIn: true});

    case COMPLETE_LOGIN:
      newState = objectAssign({}, state);
      newState.isAuthenticating = false;
      newState.isAuthenticated = action.token ? true : false;
      return newState;

    default:
      return state;
  }
}
