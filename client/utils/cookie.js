import cookie from 'js-cookie';
import URL from 'url-parse';

const {hostname: domain} = new URL(process.env.DOMAIN);
const secure = process.env.NODE_ENV === 'production' && (process.env.FORCE_HTTPS !== 'false' || process.env.FORCE_HTTPS !== false);
const options = { domain, secure };
export function set(name, value) {
  return cookie.set(name, value, options);
}

export function get(name) {
  return cookie.get(name);
}

export function remove(name) {
  cookie.remove(name);
  return cookie.remove(name, options);
}

export default { get, set, remove };
