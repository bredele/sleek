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
var model = require('sleek');

var user = model({
	name: 'beep'
});

user('name');
// => beep

user('github', 'bredele');

```
