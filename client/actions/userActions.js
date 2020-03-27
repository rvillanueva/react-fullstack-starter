import * as types from '../constants/actionTypes';
import axios from 'axios';
import {handleErrorWithLogout} from '../utils/error';

export function get() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      axios.get('/api/users')
        .then(response => dispatch({
          type: types.MERGE_USERS,
          items: response.data
        }))
        .catch(handleErrorWithLogout(reject, dispatch));
    });
  };
}

export function updateMyProfile(patch) {
  return async function(dispatch) {
    try {
      const {data: user} = await axios({
        method: 'PATCH',
        url: '/api/users/me',
        data: patch
      });
      dispatch({
        type: types.MERGE_USERS,
        items: [user]
      });
    } catch(err) {
      console.error(err);
    }
  };
}
