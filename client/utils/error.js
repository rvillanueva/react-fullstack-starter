import {logout} from '../actions/authActions';

export function handleError(cb) {
  return function(err) {
    console.error(err);
    if(typeof cb === 'function') {
      return cb();
    }
    return;
  };
}

export function handleErrorWithLogout(cb, dispatch) {
  return function(err) {
    console.error(err);
    if(dispatch && err.response && err.response.status === 401) {
      dispatch(logout());
    }
    if(typeof cb === 'function') {
      return cb();
    }
    return;
  };
}

export function extractErrorMessage(err) {
  let errorMessage = 'Sorry, something went wrong. Please try again.';
  const isAxiosError = err && err.response && err.response.status;
  if(typeof err === 'string') {
    errorMessage = err;
  } else if(isAxiosError && err.response.data && typeof err.response.data === 'string') {
    errorMessage = err.response.data;
  } else if(!isAxiosError && err && typeof err.message === 'string') {
    errorMessage = err.message;
  }
  return errorMessage;
}
