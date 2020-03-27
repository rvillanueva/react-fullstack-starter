import {MERGE_PROVIDERS} from '../constants/actionTypes';
import initialState from './initialState';
import {mergeItems} from '../utils/normalize';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function invitationReducer(state = initialState.providers, action) {
  switch (action.type) {
  case MERGE_PROVIDERS:
    return mergeItems(state, action.items);
  default:
    return state;
  }
}
