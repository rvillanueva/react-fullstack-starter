import {MERGE_PAYMENTS, REMOVE_PAYMENT, LOGOUT} from '../constants/actionTypes';
import initialState from './initialState';
import {mergeItems, removeItem} from '../utils/normalize';
import {normalize, Payment} from '../normalize';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function paymentReducer(state = initialState.payments, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.payments;
  case MERGE_PAYMENTS:
    return mergeItems(state, normalize(action.items, [Payment]).toArray('payments'));
  case REMOVE_PAYMENT:
    return removeItem(state, action.id);
  default:
    return state;
  }
}
