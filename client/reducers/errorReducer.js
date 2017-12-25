import {ADD_ERROR, CLEAR_ERROR, CLEAR_ALL_ERRORS} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function errorReducer(state = initialState.errors, action) {
  let newState;
  let patch;
  switch (action.type) {

    case ADD_ERROR:
      patch = {};
      patch[action.errorType] = action.message;
      newState = objectAssign({}, state, patch);
      return newState;

    case CLEAR_ERROR:
      patch = {};
      patch[action.errorType] = null;
      newState = objectAssign({}, state, patch);
      return newState;

    case CLEAR_ALL_ERRORS:
      return {};

    default:
      return state;
  }
}
