import {START_LOGIN, FINISH_LOGIN, GET_MY_PROFILE, LOGOUT, SET_ACTIVE_ACCOUNT_ID} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
  case START_LOGIN:
    return objectAssign({}, state, {isAuthenticating: true});

  case FINISH_LOGIN:
    return objectAssign({}, state, {isAuthenticating: false});

  case GET_MY_PROFILE:
    return objectAssign({}, state, {user: action.user});

  case SET_ACTIVE_ACCOUNT_ID:
    return Object.assign({}, state, {activeAccountId: action.id});

  case LOGOUT:
    return initialState.auth;

  default:
    return state;
  }
}
