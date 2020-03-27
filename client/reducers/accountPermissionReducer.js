import {MERGE_ACCOUNT_PERMISSIONS, REMOVE_ACCOUNT_PERMISSION, LOGOUT} from '../constants/actionTypes';
import initialState from './initialState';
import {mergeItems, removeItem} from '../utils/normalize';
import {normalize, AccountPermission} from '../normalize';
// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function membershipReducer(state = initialState.memberships, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.memberships;
  case MERGE_ACCOUNT_PERMISSIONS:
    return mergeItems(state, normalize(action.items, [AccountPermission]).toArray('accountPermissions'));
  case REMOVE_ACCOUNT_PERMISSION:
    return removeItem(state, action.id);
  default:
    return state;
  }
}
