import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import auth from './authReducer';
import users from './userReducer';
import things from './thingReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  auth,
  users,
  things,
  routing: routerReducer
});

export default rootReducer;
