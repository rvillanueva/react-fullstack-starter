export function toArray(obj, options){
  options = options || {};
  var listKey = options.listKey || 'allIds';
  var indexKey = options.indexKey || 'byId';
  return obj[listKey].map(item => {
    return obj[indexKey][item]
  });
}
