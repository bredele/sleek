
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

describe("format/compute", function() {
	var user;
	beforeEach(function() {
		user = model({
			beep: 'boop'
		});
	});

	it('should format if property exist', function() {
		user('beep', function(str) {
			console.log(str);
			return str.toUpperCase();
		});

		assert.equal(user('beep'), 'BOOP');
	});
});

