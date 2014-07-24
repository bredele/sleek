
/**
 * Module dependencies
 */

var Store = require('datastore');
var handlers = [
  'loop',
  'pipe',
  'del',
  'reset',
  'format',
  'compute',
  'emit',
  'on',
  'once',
  'off',
  'set'
];


/**
 * Sleek factory.
 *
 * @param {Object|Array} data
 * @return {Function}
 * @api public
 */

module.exports = function(data) {

  /**
   * Data store.
   * @type {Store}
   * @api private
   */
  
  var store = new Store(data);


  /**
   * Sleek store.
   *
   * A sleek store is a convenient function
   * to set, get, update, reset, format, compute
   * or mixin your data.
   * 
   * Examples:
   *
   *   user('name'); //get
   *   user('name', 'olivier'); //set
   * 
   * @api public
   */
  
  var model = function(key, value) {
    var type = typeof key;
    if(type === 'function') {
      model.use.apply(model, arguments);
      return model;
    }
    if(value === undefined) {
      if(type === 'object') return model.set(key);
      return model.get(key);
    }
    else {
      if(typeof value === 'function') {
        if(store.has(key)) {
          model.format(key, value);
        } else {
          model.compute(key, value);
        }
        return model;
      } else if(type === 'object' && value) {
        return model.reset(key);
      }
      return model.set(key, value);
    }
  };


  // mixins
  
  model.get = function(key) {
    return store.get(key);
  };

  model.use = function() {
    store.use.apply(model, arguments);
    return model;
  };

  // todo:use looping
  
  for(var l = handlers.length; l--;) {
    storify(handlers[l]);
  }

  function storify(name) {
    model[name] = function() {
      store[name].apply(store, arguments);
      return model;
    };
  }

  return model;
};

