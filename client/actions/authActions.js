import * as types from '../constants/actionTypes';
import fetch from 'cross-fetch'

// example of a thunk using the redux-thunk middleware
export function startLogin(credentials) {
  return function(dispatch){
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
    return dispatch({
      type: types.REQUEST_LOGIN,
      credentials
    });
  };
}

export function completeLogin(json){
  return function(dispatch){
    return dispatch({
      type: types.COMPLETE_LOGIN,
      json
    })
  }
}

export function fetchAuthToken(credentials){
  return function(dispatch){
    return fetch('/auth/local', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(completeLogin(json)))
  }
}
