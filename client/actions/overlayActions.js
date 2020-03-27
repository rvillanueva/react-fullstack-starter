import * as types from '../constants/actionTypes';
import {FORM_MODAL} from '../constants/overlayTypes';

export function open(overlayType, data) {
  return async function(dispatch) {
    dispatch({
      type: types.OPEN_OVERLAY,
      overlay: overlayType,
      data
    });
  };
}

export function openFormModal(data) {
  return async function(dispatch) {
    dispatch({
      type: types.OPEN_OVERLAY,
      overlay: FORM_MODAL,
      data
    });
  };
}

export function close() {
  return async function(dispatch) {
    dispatch({
      type: types.CLOSE_OVERLAY
    });
  };
}
