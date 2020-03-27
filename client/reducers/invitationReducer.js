import {MERGE_INVITATIONS, MERGE_MY_INVITATIONS, REMOVE_INVITATION, MERGE_CONTACTS, LOGOUT} from '../constants/actionTypes';
import initialState from './initialState';
import {mergeItems, removeItem, denormalize} from '../utils/normalize';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function invitationReducer(state = initialState.invitations, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.invitations;
  case MERGE_MY_INVITATIONS:
    const items = action.items.map(item => {
      item.isInvitee = true;
      return item;
    });
    return mergeItems(state, items);
  case MERGE_INVITATIONS:
    return mergeItems(state, action.items);
  case REMOVE_INVITATION:
    return removeItem(state, action.id);
  case MERGE_CONTACTS:
    const invitations = denormalize(action.items, 'invitation');
    return mergeItems(state, invitations);
  default:
    return state;
  }
}
