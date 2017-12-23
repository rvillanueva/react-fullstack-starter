import fetch from 'cross-fetch';
import cookie from 'js-cookie';

function fetchAuth(url, opts){
  var token = cookie.get('token');
  if(token){
    opts = opts || {};
    opts.headers = opts.headers || {};
    opts.headers.authorization = `Bearer ${token}`;
  }
  return fetch(url, opts);
}

export default fetchAuth;
