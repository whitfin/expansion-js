var assert = require('assert');

describe('Testing library prototypes of the Number object', function(){

	describe('Validation of the \'abbreviate()\' function', function(){

		it('should abbreviate in all forms available', function(next){
			assert.equal((1000).abbreviate(), "1K");
			assert.equal((1000000).abbreviate(), "1M");
			assert.equal((1000000000).abbreviate(), "1B");
			assert.equal((1000000000000).abbreviate(), "1T");
			next();
		});

		it('should default to a single decimal point', function(next){
			assert.equal((1111).abbreviate(), "1.1K");
			assert.equal((1111111).abbreviate(), "1.1M");
			assert.equal((1111111111).abbreviate(), "1.1B");
			assert.equal((1111111111111).abbreviate(), "1.1T");
			next();
		});

		it('should allow overriding of decimal points', function(next){
			assert.equal((1750).abbreviate(2), "1.75K");
			assert.equal((1750000).abbreviate(2), "1.75M");
			assert.equal((1750000000).abbreviate(2), "1.75B");
			assert.equal((1750000000000).abbreviate(2), "1.75T");
			next();
		});

		it('should round decimals correctly', function(next){
			assert.equal((1750).abbreviate(), "1.8K");
			assert.equal((1750000).abbreviate(), "1.8M");
			assert.equal((1750000000).abbreviate(), "1.8B");
			assert.equal((1750000000000).abbreviate(), "1.8T");
			next();
		});

	});

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

	describe('Validation of the \'inRange()\' function', function(){

		it('should validate a number is within a range', function(next){
			assert((999).inRange(500, 1000));
			assert(!(1001).inRange(500, 1000));
			next();
		});

		it('should use inclusive boundaries by default', function(next){
			assert((500).inRange(500, 1000));
			assert((1000).inRange(500, 1000));
			next();
		});

		it('should allow the use of exclusive boundaries', function(next){
			assert(!(500).inRange(500, 1000, true));
			assert(!(1000).inRange(500, 1000, true));
			next();
		});

		it('should allow null boundaries', function(next){
			assert((500).inRange(null, 1000));
			assert((500).inRange(1, null));
			next();
		});

	});

});