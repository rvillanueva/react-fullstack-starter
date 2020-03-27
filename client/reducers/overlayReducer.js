import {LOGOUT, OPEN_OVERLAY, CLOSE_OVERLAY} from '../constants/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.auth;
  case OPEN_OVERLAY:
    return {
      isVisible: true,
      type: action.overlay,
      data: Object.assign({}, action.data)
    };
  case CLOSE_OVERLAY:
    return {
      isVisible: false,
      type: null,
      data: {}
    };
  default:
    return state;
  }
}
