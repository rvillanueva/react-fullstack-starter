import {schema as schemaTypes} from 'normalizr';
const {Entity} = schemaTypes;

export default class Normalizer {
  constructor() {
    this.schemas = [];
    this.schemaMap = {};
  }
  import(definition) {
    return definition(this);
  }
  define(key, model, options = {}) {
    options.idAttribute = options.idAttribute || '_id';
    const schema = new Entity(key, {}, options);
    this.schemaMap[key] = schema;
    this.schemas.push({
      key,
      model
    });
    return schema;
  }
  init() {
    this.schemas.forEach(({key, model}) => {
      const mappedModel = {};
      Object.keys(model).forEach(modelKey => {
        if(typeof model[modelKey] === 'string') {
          const schema = this.schemaMap[model[modelKey]];
          mappedModel[modelKey] = schema;
        } else {
          const schema = this.schemaMap[model[modelKey][0]];
          mappedModel[modelKey] = [schema];
        }
      });
      this.schemaMap[key].define(mappedModel);
    });
  }
}
