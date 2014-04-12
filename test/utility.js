var assert = require('assert'),
	expand = require('../');

describe('Testing library utility functions', function(){

	describe('Validation of the \'add()\' function', function(){

		it('should add a prototype function to an object', function(next){
			expand.add(Object, 'protoFunc', function(){
				return 'This is the protoFunc!';
			}, {
				configurable:true,
				enumerable:false,
				writable:true
			});
			assert.equal({}.protoFunc(), "This is the protoFunc!");
			next();
		});

		it('should add a prototype value to an object', function(next){
			expand.add(Object, 'protoVal', 'This is the protoVal!', {
				configurable:true,
				enumerable:false,
				writable:true
			});
			assert.equal({}.protoVal, "This is the protoVal!");
			next();
		});

	});

	describe('Validation of the \'remove()\' function', function(){

		it('should remove a prototype function from an object', function(next){
			expand.delete(Object, 'protoFunc');
			assert.equal({}.protoFunc, undefined);
			next();
		});

		it('should remove a prototype value from an object', function(next){
			expand.add(Object, 'protoVal');
			assert.equal({}.protoVal, undefined);
			next();
		});

	});

});