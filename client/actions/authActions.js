import * as types from '../constants/actionTypes';
import fetchAuth from '../utils/fetch-auth';
import fetch from 'cross-fetch';
import { history } from '../store/configureStore';
import cookie from 'js-cookie';

function parseResponse(){
  return function(res, err){
    if(res.status >= 400){
      return Promise.reject(res.statusText);
    }
    try {
      return Promise.resolve(JSON.parse(res._bodyText));
    } catch(e){
      return Promise.resolve(res._bodyText)
    }
  }
}

function handleError(err, cb){
  console.error(err)
  if(typeof cb === 'function'){
    cb(err);
  }
}

export function login(credentials){
  return function(dispatch){
    return new Promise((resolve, reject) => {
      dispatch({
        type: types.START_LOGIN,
        credentials
      });
      fetch('/auth/local', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(parseResponse())
      .then(json => {
        if(json.token){
          history.push('/')
          cookie.set('token', json.token);
          dispatch(finishLogin())
          dispatch(getMyProfile())
        }
      })
      .catch(err => handleError(err, reject))
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

export function getMyProfile(){
  return function(dispatch){
    if(!cookie.get('token')){
      return dispatch({
        type: types.LOGOUT
      });
    }
    return fetchAuth('/api/users/me')
    .then(parseResponse())
    .then(user => dispatch({
      type: types.GET_MY_PROFILE,
      user
    }))
    .catch(err => handleError(err))
  }
}

export function changeMyPassword(oldPassword, newPassword){
  return function(dispatch, getStore){
    return new Promise((resolve, reject) => {
      var user = getStore().auth.user
      fetchAuth(`/api/users/${user._id}/password`, {
        method: 'PUT',
        body: JSON.stringify({oldPassword, newPassword}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if(res.status === 403){
          reject('Old password is incorrect.');
        } else if (res.status >= 400){
          reject('Something went wrong.');
        } else {
          resolve();
        }
      })
      .catch(err => reject('Something went wrong.'))
    })
  }
}
