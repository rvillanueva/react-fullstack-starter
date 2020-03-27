import {MERGE_INTEGRATIONS, REMOVE_INTEGRATION, LOGOUT} from '../constants/actionTypes';
import initialState from './initialState';
import {mergeItems, removeItem} from '../utils/normalize';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function integrationReducer(state = initialState.integrations, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.integrations;
  case MERGE_INTEGRATIONS:
    return mergeItems(state, action.items);
  case REMOVE_INTEGRATION:
    return removeItem(state, action.id);
  default:
    return state;
  }
}
