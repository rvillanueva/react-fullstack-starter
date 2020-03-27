const DELIMITER = '__'; // double underscore

function flattenSchema(schema) {
  return getFlattened('', schema, {});
}

function getFlattened(prefix, object, flattenedSchema) {
  flattenedSchema = flattenedSchema || {};
  Object.keys(object).forEach(key => {
    if(isColumnDefinition(object[key])) {
      flattenedSchema[`${prefix}${key}`] = object[key];
    } else {
      flattenedSchema = getFlattened(`${prefix}${key}${DELIMITER}`, object[key], flattenedSchema);
    }
  });
  return flattenedSchema;
}

function isColumnDefinition(object) {
  if(isValidator(object)) {
    return true;
  } else if(object.type && isValidator(object.type)) {
    return true;
  }
  return false;
}

function isValidator(field) {
  const dataTypes = [
    'STRING',
    'CHAR',
    'TEXT',
    'TINYINT',
    'SMALLINT',
    'INTEGER',
    'DECIMAL',
    'FLOAT',
    'BOOLEAN',
    'JSONB',
    'BLOB',
    'ENUM',
    'DATE',
    'UUID',
    'UUIDV4'
  ];
  return dataTypes.indexOf(field.key) > -1;
}

function getNested(key) {
  return this.get(convertDotNotation(key), DELIMITER);
}

function setNested(key, value) {
  return this.set(convertDotNotation(key), value);
}

function getAllNested() {
  let nestedObject = {};
  Object.keys(this.toJSON()).forEach(key => {
    nestedObject = iterateGetNestedOneLevel(key.split(DELIMITER), nestedObject, this.get(key));
  });
  return nestedObject;
}

function convertDotNotation(key) {
  return key.replace(/\./g, DELIMITER);
}

function iterateGetNestedOneLevel(keys, currentObject, value) {
  if(!keys.length) {
    return value;
  }
  currentObject[keys[0]] = currentObject[keys[0]] || {};
  iterateGetNestedOneLevel(keys.splice(1), currentObject, value);
}

function convertNestedObject(nestedObject, prefix) {
  let flattenedObject = {};
  prefix = prefix || '';
  Object.keys(nestedObject).forEach(key => {
    if(isNestedField(nestedObject[key])) { // should really check schema column type
      flattenedObject = Object.assign(flattenedObject, convertNestedObject(nestedObject[key], `${prefix}${key}${DELIMITER}`));
    } else {
      flattenedObject[`${prefix}${key}`] = nestedObject[key];
    }
  });
  return flattenedObject;
}

function isNestedField(value) {
  return typeof value === 'object' && !(value instanceof Date);
}

function applyNestedPatch(object, patch) {
  const flattenedPatch = convertNestedObject(patch);
  return applyPatch(object, flattenedPatch);
}

function applyPatch(object, flattenedPatch) {
  Object.keys(flattenedPatch).forEach(key => {
    object.set(key, flattenedPatch[key]);
  });
  return object;
}

/* eslint-disable object-shorthand */
module.exports = {
  getNested: getNested,
  setNested: setNested,
  convertNestedObject: convertNestedObject,
  getAllNested: getAllNested,
  flattenSchema: flattenSchema,
  applyNestedPatch: applyNestedPatch,
  applyPatch: applyPatch
};
