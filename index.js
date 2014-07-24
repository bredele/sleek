
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
          store.format(key, value);
        } else {
          store.compute(key, value);
        }
        return model;
      } else if(type === 'object' && value) {
        return model.reset(key);
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

  model.off = function() {
    store.off.apply(store, arguments);
    return model;
  };

  model.once = function() {
    store.once.apply(store, arguments);
    return model;
  };

  model.set = function(key, value) {
    store.set(key, value);
    return model;
  };

  model.get = function(key) {
    return store.get(key);
  };

  model.del = function(key) {
    store.del(key);
    return model;
  };

  model.reset = function(data) {
    store.reset(data);
    return model;
  };

  model.use = function() {
    store.use.apply(model, arguments);
    return model;
  };

  return model;
}

