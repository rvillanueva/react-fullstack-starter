import {MERGE_CUSTOMERS, MERGE_PAYMENTS, REMOVE_CUSTOMER, LOGOUT} from '../constants/actionTypes';
import initialState from './initialState';
import {mergeItems, removeItemData} from '../utils/normalize';
import {normalize, Customer, Payment} from '../normalize';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function customerReducer(state = initialState.customers, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.customers;
  case MERGE_CUSTOMERS:
    return mergeItems(state, normalize(action.items, [Customer]).toArray('customers'));
  case MERGE_PAYMENTS:
    return mergeItems(state, normalize(action.items, [Payment]).toArray('customers'));
  case REMOVE_CUSTOMER:
    return removeItemData(state, action.id);
  default:
    return state;
  }
}
