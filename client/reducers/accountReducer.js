import {
  MERGE_ACCOUNTS,
  MERGE_ACCOUNT_PERMISSIONS,
  MERGE_CUSTOMERS,
  LOGOUT,
  REMOVE_ACCOUNT
} from '../constants/actionTypes';
import initialState from './initialState';
import {mergeItems, removeItem} from '../utils/normalize';
import {normalize, AccountPermission, Customer} from '../normalize';
// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function accountReducer(state = initialState.accounts, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.accounts;
  case MERGE_ACCOUNTS:
    return mergeItems(state, action.items);
  case MERGE_ACCOUNT_PERMISSIONS:
    return mergeItems(state, normalize(action.items, [AccountPermission]).toArray('accounts'));
  case REMOVE_ACCOUNT:
    return removeItem(state, action.id);
  case MERGE_CUSTOMERS:
    return mergeItems(state, normalize(action.items, [Customer]).toArray('accounts'));
  default:
    return state;
  }
}
