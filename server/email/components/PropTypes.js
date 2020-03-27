export const string = PropType('string');
export const func = PropType('func');
export const bool = PropType('bool');
export const object = PropType('object');

export function validateProps(props, propTypes) {
  Object.keys(propTypes).forEach(key => {
    const isValid = propTypes[key].validate(props[key]);
    if(!isValid) {
      throw new Error(`Prop ${key} is not valid. Expected ${propTypes[key].type}, received ${typeof props[key]}.`);
    }
  });
}

function PropType(type) {
  return {
    type,
    validate: prop => !validatePresenceOf(prop) || validateType(type),
    isRequired: {
      type,
      validate: prop => validatePresenceOf(prop) && validateType(type)
    }
  };
}

function validateType(type) {
  return function(prop) {
    switch (type) {
    case 'string':
      return typeof prop === 'string';
    case 'func':
      return typeof prop === 'function';
    case 'object':
      return typeof prop === 'object';
    case 'bool':
      return typeof prop === 'boolean';
    default:
      throw new Error(`Could not validate type ${type}.`);
    }
  };
}

function validatePresenceOf(prop) {
  return (typeof prop !== 'number' || !isNaN(Number(prop)))
    && (typeof prop === 'number' || prop)
    && (typeof prop !== 'string' || prop.length);
}

export default { string, func, bool, object, validateProps };
