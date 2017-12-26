import * as types from '../constants/actionTypes';
import fetchAuth from '../utils/fetch-auth';
import { history } from '../store/configureStore';
import cookie from 'js-cookie';

function parseResponse(){
    return function(res){
      if(res.status >= 400){
        throw new Error(res.error);
      }
      try {
        return Promise.resolve(JSON.parse(res._bodyText));
      } catch(e){
        return Promise.resolve(res._bodyText)
      }
    }
}

function handleError(err, cb){
  console.log(err)
  if(typeof cb === 'function'){
    cb(err);
  }
}

export function getThings(){
  return function(dispatch){
    return new Promise((resolve, reject) => {
      fetchAuth('/api/things')
      .then(parseResponse())
      .then(things => {
        dispatch({
          type: types.MERGE_THING_LIST,
          things
        })
      })
      .catch(err => handleError(err, reject))
    })
  }
}

export function deleteById(thingId){
  return function(dispatch){
    return new Promise((resolve, reject) => {
      fetchAuth(`/api/things/${thingId}`, {
        method: 'DELETE'
      })
      .then(parseResponse())
      .then(res => {
        dispatch({
          type: types.DELETE_THING,
          id: thingId
        })
      }, err => handleError(err, reject))
    })
  }
}
