import * as types from '../constants/actionTypes';
import fetchAuth from '../utils/fetch-auth';
import fetch from 'cross-fetch';
import { history } from '../store/configureStore';
import cookie from 'js-cookie';

function parseResponse(){
  return function(res){
      return res.json();
  }
}

export function login(credentials){
  return function(dispatch){
    dispatch({
      type: types.START_LOGIN,
      credentials
    });
    return fetch('/auth/local', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(parseResponse())
    .then(json => {
      if(json.token){
        history.push('/about')
        cookie.set('token', json.token);
        dispatch(finishLogin())
        dispatch(updateMyProfile())
      } else {
        dispatch(handleLoginError())
      }
    })
  }
}

function finishLogin(){
  return function(dispatch){
    dispatch({
      type: types.FINISH_LOGIN
    })
  }
}

export function logout(){
  return function(dispatch){
    cookie.remove('token');
    history.push('/');
    dispatch({
      type: types.LOGOUT
    });
  }
}

export function handleLoginError(msg){
  return function(dispatch){
    return dispatch({
      type: types.HANDLE_LOGIN_ERROR,
      msg
    })
  }
}

export function updateMyProfile(){
  return function(dispatch){
    return fetchAuth('/api/users/me')
    .then(parseResponse())
    .then(user => dispatch({
      type: types.UPDATE_MY_PROFILE,
      user
    }))
  }
}
