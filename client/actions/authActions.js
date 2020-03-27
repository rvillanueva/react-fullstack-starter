import * as types from '../constants/actionTypes';
import axios from 'axios';
import { history } from '../store/configureStore';
import {setAuthorizationHeader, removeAuthorizationHeader, getToken} from '../utils/axiosConfig';
import {trackEvent, identifyUser} from './trackingActions';
import {SIGNUP, LOGIN_SUCCESS, LOGIN_FAILED} from '../constants/trackingTypes';
import {push} from './routerActions';

export function login(credentials) {
  return async function(dispatch) {
    try {
      dispatch({
        type: types.START_LOGIN,
        credentials
      });
      const {data} = await axios.post('/auth/local', credentials);
      dispatch(trackEvent(LOGIN_SUCCESS));
      if(data.token) {
        setAuthorizationHeader(data.token);
        await dispatch(getMyProfile());
      } else {
        dispatch(logout());
      }
    } catch(err) {
      dispatch(trackEvent(LOGIN_FAILED));
      dispatch(finishLogin());
      throw err;
    }
  };
}

export function signup({name, email, password}, redirectTo) {
  return async function(dispatch) {
    try {
      const {data} = await axios.post('/api/users', {name, email, password});
      if(data.token) {
        dispatch(push(redirectTo));
        setAuthorizationHeader(data.token);
        dispatch(trackEvent(SIGNUP));
        return dispatch(getMyProfile());
      } else {
        throw new Error('No token provided.');
      }
    } catch(err) {
      dispatch(finishLogin());
      throw err;
    }
  };
}

export function verifyUserEmail(userId, verificationCode) {
  return async function(dispatch) {
    try {
      await axios({
        method: 'POST',
        url: `/api/users/${userId}/verify`,
        data: verificationCode
      });
    } catch(err) {
      dispatch(finishLogin());
      throw err;
    }
  };
}

function finishLogin() {
  return function(dispatch) {
    dispatch({
      type: types.FINISH_LOGIN
    });
  };
}

export function logout() {
  return function(dispatch) {
    removeAuthorizationHeader();
    history.push('/login');
    dispatch({
      type: types.LOGOUT
    });
  };
}

export function getMyProfile() {
  return async function(dispatch) {
    try {
      if(!getToken()) return null;
      const {data: user} = await axios.get('/api/users/me');
      dispatch({
        type: types.GET_MY_PROFILE,
        user
      });
      dispatch(identifyUser(user._id, user));
      dispatch(finishLogin());
      return user;
    } catch(err) {
      if(err.response && err.response.status === 401) {
        return null;
      } else {
        console.error(err);
      }
    }
  };
}

export function changeMyPassword(oldPassword, newPassword) {
  return async function() {
    try {
      return axios.put('/api/users/me/password', {oldPassword, newPassword});
    } catch(err) {
      console.error(err);
      if(err.response.status === 403) {
        throw new Error('Old password is incorrect.');
      } else {
        throw err;
      }
    }
  };
}

export function requestPasswordReset(email) {
  return async function() {
    return axios({
      method: 'POST',
      url: '/api/users/password/request',
      params: {email}
    });
  };
}

export function resetPassword(userId, token, newPassword) {
  return async function() {
    return axios({
      method: 'POST',
      url: '/api/users/password/reset',
      params: {userId, token},
      data: {newPassword}
    });
  };
}

export function verifyResetToken(userId, token) {
  return async function() {
    await axios({
      method: 'GET',
      url: '/api/users/password/verify-token',
      params: {userId, token}
    });
    return;
  };
}

export function handlePostAuthRedirect(redirectTo) {
  return function(dispatch, getState) {
    const user = getState().auth.user;
    const activeAccountId = getState().auth.activeAccountId;
    let nextLocation = '/';
    if(!user) {
      nextLocation = '/login';
    } else if(user && !activeAccountId) {
      nextLocation = '/account/create';
    } else if(redirectTo) {
      nextLocation = redirectTo;
    }
    history.push(nextLocation);
  };
}
