import {denormalize as normalizrDenormalize, normalize as normalizrNormalize} from 'normalizr';
import Normalizer from './Normalizer';
import {user, accountPermission, account, customer, payment} from './models.js';


const normalizer = new Normalizer();
export const User = normalizer.import(user);
export const AccountPermission = normalizer.import(accountPermission);
export const Account = normalizer.import(account);
export const Customer = normalizer.import(customer);
export const Payment = normalizer.import(payment);

normalizer.init();

export function denormalize(data, state, targetSchema) {
  const entities = {};
  Object.keys(state).forEach(key => {
    if(state[key].byId) {
      entities[key] = state[key].byId;
    }
  });
  const denormalizedObject = normalizrDenormalize(data, targetSchema, entities);
  return new Denormalized(denormalizedObject);
}

export function normalize(data, targetSchema) {
  if(typeof data === 'object') {
    data = Object.assign({}, data);
  } else {
    data = data.concat();
  }
  const normalizedObject = normalizrNormalize(data, targetSchema);
  return new Normalized(normalizedObject);
}

class Normalized {
  constructor(normalizedObject) {
    if(!normalizedObject) throw new Error('Must instantiate with normal object.');
    this.normalized = normalizedObject;
  }
  toArray(key) {
    if(!this.normalized.entities[key]) return [];
    return Object.keys(this.normalized.entities[key]).map(id => this.normalized.entities[key][id]);
  }
  toJSON() {
    return Object.assign({}, this.normalized);
  }
}

class Denormalized {
  constructor(denormalizedObject) {
    this.denormalized = denormalizedObject;
  }
  toArray(key) {
    return Object.assign({}, this.denormalized[key]);
  }
  toJSON() {
    return Object.assign({}, this.denormalized);
  }
}
