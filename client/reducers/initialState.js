import {initializeNormalState} from '../utils/normalize';

export default {
  auth: {
    isAuthenticating: false,
    user: null,
    activeAccountId: null
  },
  users: initializeNormalState(),
  accounts: initializeNormalState(),
  integrations: initializeNormalState(),
  customers: initializeNormalState(),
  payments: initializeNormalState(),
  memberships: initializeNormalState(),
  overlay: {
    isVisible: false,
    type: null,
    data: {}
  }
};
