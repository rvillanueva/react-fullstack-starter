import {MERGE_USERS, MERGE_ACCOUNT_PERMISSIONS, LOGOUT, REMOVE_USER} from '../constants/actionTypes';
import {mergeItems, removeItem} from '../utils/normalize';
import {normalize, AccountPermission} from '../normalize';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState.users, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.users;
  case MERGE_USERS:
    return mergeItems(state, action.items);
  case MERGE_ACCOUNT_PERMISSIONS:
    return mergeItems(state, normalize(action.items, [AccountPermission]).toArray('users'));
  case REMOVE_USER:
    return removeItem(state, action.id);

  default:
    return state;
  }
}
