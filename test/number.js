var assert = require('assert');

describe('Testing library prototypes of the Number object', function(){

	describe('Validation of the \'comma()\' function', function(){

		it('should not provide a comma for a number less than 1,000', function(next){
			assert.equal((999).comma(), "999");
			next();
		});

		it('should use a single for numbers bigger than 1,000', function(next){
			assert.equal((1001).comma(), "1,001");
			next();
		});

		it('should use two commas for numbers bigger than 1,000,000', function(next){
			assert.equal((1000001).comma(), "1,000,001");
			next();
		});

		it('should provide a correct number of commas for all numbers up to 100,000,000,000,000', function(next){
			for(var i = 1; i <= 100000000000000; i *= 10){
				assert.equal(Math.floor((i.toString().length - 1) / 3), i.comma().split(",").length - 1);
			}
			next();
		});

	});

});