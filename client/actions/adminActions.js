import * as types from '../constants/actionTypes';
import axios from 'axios';
import {handleError} from '../utils/error';

export function changeUserRole(userId, newRole) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/users/${userId}/role`, {
        role: newRole
      })
        .then(res => {
          if(res.status >= 400) {
            return Promise.reject(res.error);
          }
          dispatch({
            type: types.ADMIN_UPDATE_USER_ROLE,
            userId,
            newRole
          });
          resolve();
        })
        .catch(handleError(reject));
    });
  };
}

export function chargeDailyPayments() {
  return async function() {
    return axios.post('/api/jobs/payments');
  };
}

export function deleteUser(userId) {
  return async function(dispatch) {
    try {
      await axios({
        method: 'DELETE',
        url: `/api/users/${userId}`
      });
      dispatch({
        type: types.REMOVE_USER,
        id: userId
      });
    } catch(err) {
      console.error(err);
    }
  };
}

export function getAllCompanies() {
  return async function(dispatch) {
    try {
      const {data: items} = await axios.get('/api/accounts/');
      dispatch({
        type: types.MERGE_ACCOUNTS,
        items
      });
      return items;
    } catch(e) {
      console.error(e);
    }
  };
}
