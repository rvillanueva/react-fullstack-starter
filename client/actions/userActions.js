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

function handleError(err, cb){
  console.log(err)
  if(typeof cb === 'function'){
    cb();
  }
}

export function getUsers(userId, newRole){
  return function(dispatch){
    return new Promise((resolve, reject) => {
      fetchAuth('/api/users')
      .then(parseResponse())
      .then(users => {
        dispatch({
          type: types.UPDATE_USER_LIST,
          users
        })
      })
      .catch(err => handleError(err, reject))
    })
  }
}
