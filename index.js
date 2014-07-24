
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

  function storify(name) {
    model[name] = function() {
      store[name].apply(store, arguments);
      return model;
    };
  }

  for(var l = handlers.length; l--;) {
    storify(handlers[l]);
  }

  model.get = function(key) {
    return store.get(key);
  };

  model.use = function() {
    store.use.apply(model, arguments);
    return model;
  };

  return model;
}

