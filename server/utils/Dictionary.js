export default class Dictionary {
  constructor() {
    this.index = {};
    this.list = [];
  }
  define(key, definition) {
    this.index[key] = definition;
    this.list.push(key);
  }
  remove(key) {
    Reflect.deleteProperty(this.index, key);
    this.list = this.list.filter(listedKey => listedKey === key);
  }
  getDefinition(key) {
    return this.index[key];
  }
  getAllDefinitions() {
    return this.list.map(key => this.getDefinition(key));
  }
  getKeys() {
    return this.list.map(key => key);
  }
}
