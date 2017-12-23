import * as types from '../constants/actionTypes';
import fetchAuth from '../utils/fetch-auth';
import fetch from 'cross-fetch';
import { history } from '../store/configureStore';
import cookie from 'js-cookie';

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
    .then(res => res.json(),
      error => console.log('An error occurred.', error)
    )
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

export function finishLogin(){
  return function(dispatch){
    return dispatch({
      type: types.FINISH_LOGIN
    })
  }
}

export function handleLoginError(json){
  return function(dispatch){
    return dispatch({
      type: types.HANDLE_LOGIN_ERROR,
      json
    })
  }
}

export function updateMyProfile(){
  return function(dispatch){
    return fetchAuth('/api/users/me')
    .then(response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(user => dispatch({
      type: types.UPDATE_MY_PROFILE,
      user
    }))
  }
}
