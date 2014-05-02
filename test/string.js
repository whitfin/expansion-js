var assert = require('assert');

describe('Testing library prototypes of the String object', function(){

	describe('Validation of the \'capitalize()\' function', function(){

		it('should capitalize a single word', function(next){
			assert.equal("word".capitalize(), "Word");
			next();
		});

		it('should capitalize only the first word in a string', function(next){
			assert.equal("word in a string".capitalize(), "Word in a string");
			next();
		});

		it('should capitalize every word in a string', function(next){
			assert.equal("word in a string".capitalize('a'), "Word In A String");
			next();
		});

		it('should capitalize the first word in each sentence in a string', function(next){
			assert.equal("word in a string. word in a second string".capitalize('s'),
						 "Word in a string. Word in a second string");
			next();
		});

	});

	describe('Validation of the \'endsWith()\' function', function(){

		it('should return true if the string ends correctly', function(next){
			assert("This is a string".endsWith("string"));
			assert("123456789".endsWith("789"));
			next();
		});

		it('should return false if the string doesn\'t end correctly', function(next){
			assert(!("This is a string".endsWith("test")));
			assert(!("123456789".endsWith("123")));
			next();
		});

		it('should validate case-sensitiveness', function(next){
			assert("This is a string".endsWith("string"));
			assert(!("This Is A String".endsWith("string")));
			next();
		});

		it('should handle empty or null strings', function(next){
			assert("".endsWith(""));
			assert(!("".endsWith(null)));
			next();
		});

	});

	describe('Validation of the \'startsWith()\' function', function(){

		it('should return true if the string starts correctly', function(next){
			assert("This is a string".startsWith("This"));
			assert("123456789".startsWith("123"));
			next();
		});

		it('should return false if the string doesn\'t starts correctly', function(next){
			assert(!("This is a string".startsWith("test")));
			assert(!("123456789".startsWith("789")));
			next();
		});

		it('should validate case-sensitiveness', function(next){
			assert("This is a string".startsWith("This"));
			assert(!("This Is A String".startsWith("this")));
			next();
		});

		it('should handle empty or null strings', function(next){
			assert("".startsWith(""));
			assert(!("".startsWith(null)));
			next();
		});

	});

});