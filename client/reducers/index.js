import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import auth from './authReducer';
import users from './userReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  auth,
  users,
  routing: routerReducer
});

export default rootReducer;
