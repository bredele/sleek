sleek
=====

  A stylish version of [datastore](http://github.com/bredele/datastore).

## Installation

with [component](http://component.io):

    $ component install bredele/sleek

with [nodejs](http://nodejs.org):

    $ npm install sleek

## Usage

```js
var sleek = require('sleek');

var user = sleek();

user('github', 'component');
user('path', function() {
 return 'http://github.com/' + this.github;
});
user('path');
// http://github.com/component

user('github', 'bredele');
user('path');
// http://github.com/bredele
```

## API

### constructor

  Create a new sleek store with optional `data`.

```js
var sleek = require('sleek');

var user = sleek({
	name: 'bredele'
});
```

### set

 Set an attribute `name`.

```js
user('name','olivier');
```

  > alias `user.set` (see [datastore](http://github.com/bredele/datastore))

### get

 Get an attribute `name`.

```js
user('name');
```

  > alias `user.get` (see [datastore](http://github.com/bredele/datastore))

### update

 Set multiple attributes.

```js
user({
  github: 'bredele',
  city: 'calgary'	
});
// name is still there
```

  > alias `user.set` (see [datastore](http://github.com/bredele/datastore))


### .reset(data)

  Reset store with `data` (Object or Array).

```js
user({
  github: 'bredele',
  city: 'calgary'	
}, true);
// name has been erase
```

  > alias `user.reset` (see [datastore](http://github.com/bredele/datastore))

### format

 Format existing property.

```js
user('name', function(str) {
	return str.toUpperCase();
});
```

  > alias `user.format` (see [datastore](http://github.com/bredele/datastore))

### compute

 Compute new property with existing properties.

```js
user('nickname', function() {
	return this.name + ' bang!';
});
```

  A computed property is automatically updated.

  > alias `user.compute` (see [datastore](http://github.com/bredele/datastore))


### plugin

 Mixin store with [plugins](#plugins)

```js
user(function(store, str) {
	store.hello = function() {};
}, 'hello');
```

  > alias `user.use` (see [datastore](http://github.com/bredele/datastore))

### del

 Delete a store attribute.

```js
user.del('nickname');
```

### .on(name, fn)

  Listen events on Store.

```js
user.on('change', function(name, val, previous) {
  ...
});
```

## Plugins

Here's a list of availaible plugins:

  - [mirror](http://github.com/bredele/store-mirror)

to get real time updates from a store in server side.

```js
  store.use(mirror('mychannel'));
  store.set('hello', 'world');
```
  
  - [path](http://github.com/bredele/store-path)

to access nested data easily:

```js
  store.path('country.canada'); //get
  store.path('country.canada.city', 'calgary');//set
```

  - [supplant](http://github.com/bredele/store-supplant)

to create template engines on both client/server sides:

```js
  store.filter('upper', function(str) {
    return str.toUpperCase();
  });
  store.supplant('my name is {{name} | upper}');
```

  - [queue](http://github.com/bredele/emitter-queue)

to queue events.

```js
  store.queue('hello', 'world');
  store.on('hello', function(val) {
    //world
  });
```

## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich <olivier.wietrich@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
