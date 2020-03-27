export function applyPatch(entity, updates, options = {}) {
  let updatedValues = {};
  if(options.allowedKeys) {
    Object.keys(updates).forEach(key => {
      if(options.allowedKeys.indexOf(key) > -1) {
        updatedValues[key] = updates[key];
      }
    });
  } else {
    updatedValues = updates;
  }
  return entity.update(updatedValues);
}
