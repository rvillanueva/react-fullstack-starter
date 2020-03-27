import { combineReducers } from 'redux';
import auth from './authReducer';
import users from './userReducer';
import accounts from './accountReducer';
import memberships from './accountPermissionReducer';
import integrations from './integrationReducer';
import customers from './customerReducer';
import payments from './paymentReducer';
import overlay from './overlayReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history => combineReducers({
  auth,
  users,
  accounts,
  memberships,
  integrations,
  payments,
  customers,
  overlay,
  router: connectRouter(history)
});

export default rootReducer;
