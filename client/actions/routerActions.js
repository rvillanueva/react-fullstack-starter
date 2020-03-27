import {history} from '../store/configureStore';

export function push(pathname) {
  return function() {
    history.push(pathname);
  };
}

export function replace(pathname) {
  return function() {
    history.replace(pathname);
  };
}

export function goBack(pathname) {
  return function() {
    history.goBack(pathname);
  };
}
