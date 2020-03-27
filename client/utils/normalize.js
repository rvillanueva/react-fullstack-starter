import { fromJS, Map, List } from 'immutable';

export function toArray(obj) {
  return obj.allIds.map(id => obj.byId[id]);
}

export function initializeNormalState() {
  return {
    allIds: [],
    byId: {}
  };
}

export function initializeNormalStateWithCounter() {
  return {
    allIds: [],
    byId: {},
    counter: 0
  };
}


export function mergeItems(state, items, options) {
  options = options || {};
  let newState = fromJS(state);
  items.forEach(item => {
    let counter = newState.get('counter');
    if(typeof item._id === 'undefined' && typeof counter === 'number') {
      item._id = String(counter);
      newState = newState.set('counter', counter + 1);
    }
    if(!state.byId[item._id]) {
      if(options.insertAt === 'start') {
        newState = newState.update('allIds', list => list.insert(0, item._id));
      } else {
        newState = newState.update('allIds', list => list.push(item._id));
      }
    }
    let mergedItem;
    if(options.overwrite === false) {
      mergedItem = item;
    } else {
      let original = newState.getIn(['byId', item._id]) || new Map();
      mergedItem = original.merge(item);
    }
    newState = newState.setIn(['byId', item._id], mergedItem);
  });
  if(options.indexes) {
    options.indexes.forEach(index => {
      items.forEach(item => {
        newState = addToIndex(newState, index, item);
      });
    });
  }
  return newState.toJS();
}

export function removeItem(state, id, options) {
  options = options || {};
  let newState = fromJS(state);
  let itemLocation = state.allIds.indexOf(id);
  if(itemLocation === -1) {
    return state;
  }
  const item = state.byId[id];
  if(item && options.indexes) {
    options.indexes.forEach(index => {
      newState = removeFromIndex(newState, index, item);
    });
  }
  newState = newState.deleteIn(['byId', id]);
  newState = newState.deleteIn(['allIds', itemLocation]);

  return newState.toJS();
}

export function removeItemData(state, id) {
  let newState = fromJS(state);
  newState = newState.setIn(['byId', id], { _id: id });
  return newState.toJS();
}

export function denormalize(items, key) {
  return items
    .map(item => (item[key] ? item[key] : null))
    .filter(a => a);
}

export function removeDenormalized(items, keys) {
  let newItems = items.map(a => a);
  keys.forEach(key => {
    let objectKey;
    let idKey;
    if(typeof key === 'string') {
      objectKey = key;
      idKey = `${key}Id`;
    } else {
      objectKey = key.objectKey;
      idKey = key.idKey;
    }
    newItems = newItems
      .map(item => {
        let patch = item[objectKey] && item[objectKey]
          ? {[idKey]: item[objectKey]._id}
          : {};
        return Object.assign({}, item, patch);
      })
      .filter(a => a)
      .map(item => {
        Reflect.deleteProperty(item, objectKey);
        return item;
      });
  });
  return newItems;
}

function addToIndex(newState, index, item) {
  const indexLocation = [index.name, item[index.field]];
  if(!newState.getIn(indexLocation)) {
    newState = newState.setIn(indexLocation, new List());
  }
  if(newState.getIn(indexLocation).indexOf(item._id) === -1) {
    const newList = newState.getIn(indexLocation).push(item._id);
    newState = newState.setIn(indexLocation, newList);
  }
  return newState;
}

function removeFromIndex(newState, index, item) {
  const indexLocation = [index.name, item[index.field]];
  const list = newState.getIn(indexLocation);
  if(list) {
    const newList = list.filter(itemId => itemId !== item._id);
    newState = newState.setIn(indexLocation, newList);
  }
  return newState;
}

export function removeMatchingValuesByKey(state, key, value) {
  let newState = fromJS(state);
  state.allIds.forEach(id => {
    if(state.byId[id][key] === value) {
      newState = newState.setIn(['byId', id, key], null);
    }
  });
  return newState.toJS();
}
