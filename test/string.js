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

});