
/**
 * Test dependencies.
 */

var assert = require('assert');
var model = require('..');


describe("setter/getter", function() {
	var user;
	beforeEach(function() {
		user = model({
			beep: 'boop'
		});
	});

	it('should get exiting properties', function() {
		assert.equal(user('beep'), 'boop');
	});

	it('should set new property', function() {
		user('name', 'olivier');
		assert.equal(user('name'), 'olivier');
	});

	it('should update existing property', function() {
		user('beep', 'foo');
		assert.equal(user('beep'), 'foo');
	});

	it('should set multiple properties', function() {
		user({
			beep: 'bar',
			github: 'bredele'
		});
		assert.equal(user('beep'), 'bar');
		assert.equal(user('github'), 'bredele');
	});

	it('should allow ugly chaining', function() {
		user('beep', 'foo')('boop', 'bar');
		assert.equal(user('beep'), 'foo');
		assert.equal(user('boop'), 'bar');
	});
	
});

describe('emitter', function() {

	var user;
	beforeEach(function() {
		user = model({
			beep: 'boop'
		});
	});

	it('should listen events', function(done) {
		user.on('hello', done);
		user.emit('hello');
	});

	it('should listen once', function() {
		var called = 0;
		user
		  .once('hello', function() {
			  called++;
		  })
		  .emit('hello')
		  .emit('hello');

		assert.equal(called, 1);
	});

	it('should remove listener', function(done) {
		user
		  .on('hello', done)
		  .on('world', done)
		  .off()
		  .emit('hello', 'error')
		  .emit('world', 'error');

		done();
	});

});

describe("format/compute", function() {
	var user;
	beforeEach(function() {
		user = model({
			beep: 'boop'
		});
	});

	it('should format if property exist', function() {
		user('beep', function(str) {
			return str.toUpperCase();
		});

		assert.equal(user('beep'), 'BOOP');
	});

	it('should compute if property does not exist', function() {
		user('hello', function() {
			return this.beep + '!';
		});

		assert.equal(user('hello'), 'boop!');
	});
});

