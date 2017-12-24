import * as types from '../constants/actionTypes';
import fetchAuth from '../utils/fetch-auth';
import { history } from '../store/configureStore';
import cookie from 'js-cookie';

function parseResponse(){
    return function(res){
      if(res.status >= 400){
        throw new Error(res.error);
      }
      try{
        return res.json();
      } catch(e){
        throw new Error(e);
      }
    }
}

function handleSystemError(error){
  return function(dispatch){
    console.error(error);
    dispatch({
      type: types.HANDLE_SYSTEM_ERROR,
      error
    })
  }
}

export function getUsers(userId, newRole){
  return function(dispatch){
    return fetchAuth('/api/users')
    .then(parseResponse())
    .then(users => {
      dispatch({
        type: types.UPDATE_USER_LIST,
        users
      })
    })
    .catch(err => dispatch(handleSystemError(err)))
  }
}
