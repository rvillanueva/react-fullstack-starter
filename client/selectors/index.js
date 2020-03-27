import { toArray } from '../utils/normalize';

export const selectUsers = state => toArray(state.users);

export const selectActiveUser = state => state.auth.user;
