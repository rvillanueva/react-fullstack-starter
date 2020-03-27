import axios from 'axios';
import cookie from './cookie';

export function setAuthorizationHeader(token) {
  token = token || cookie.get('token');
  if(token) {
    cookie.set('token', token);
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  }
}

export function removeAuthorizationHeader() {
  cookie.remove('token');
  Reflect.deleteProperty(axios.defaults.headers.common, 'authorization');
}

export function getToken() {
  return cookie.get('token');
}
