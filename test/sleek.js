
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

	it('should be an emitter', function(done) {
		user.on('hello', done);
		user.emit('hello');
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

