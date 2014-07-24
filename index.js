
/**
 * Module dependencies
 */

var Store = require('datastore');


/**
 * Expose 'sleek'
 */

module.exports = sleek;


/**
 * sleek constructor.
 * @api public
 */

function sleek(data) {

  var store = new Store(data);

  var model = function(key, value) {
    if(value === undefined) {
      if(typeof key === 'object') return model.set(key);
      return model.get(key);
    }
    else {
      if(typeof value === 'function') {
        if(store.has(key)) {
          store.format(key, value);
        } else {
          store.compute(key, value);
        }
        return model;
      }
      return model.set(key, value);
    }
  };

  model.emit = function() {
    store.emit.apply(store, arguments);
    return model;
  };

  model.on = function() {
    store.on.apply(store, arguments);
    return model;
  };

  model.set = function(key, value) {
    store.set(key, value);
    return model;
  };

  model.get = function(key) {
    return store.get(key);
  };

  return model;
}

