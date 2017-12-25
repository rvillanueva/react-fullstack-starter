import * as types from '../constants/actionTypes';
import fetchAuth from '../utils/fetch-auth';

function parseResponse(){
    return function(res){
      if(res.status >= 400){
        throw new Error(res.error);
      }
      return res.json();
    }
}

function handleError(err, cb){
  console.log(err)
  if(typeof cb === 'function'){
    cb();
  }
}

export function changeUserRole(userId, newRole){
  return function(dispatch){
    return new Promise((resolve, reject) => {
      fetchAuth(`/api/users/${userId}/role`, {
        method: 'PUT',
        body: JSON.stringify({role: newRole}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if(res.status >= 400){
          return Promise.reject(err);
        }
        dispatch({
          type: types.ADMIN_UPDATE_USER_ROLE,
          userId,
          newRole
        })
        resolve();
      })
      .catch(err => handleError(err, reject))
    })
  }
}
