var assert = require('assert');

describe('Testing library prototypes of the Array object', function(){

	describe('Validation of the \'normalize()\' function', function(){

		it('should remove invalid values from an array', function(next){
			var arr1 = [ "test1", "test2", "test3" ],
				arr2 = [ "test1", "test3" ];

			assert.deepEqual(arr1.normalize(arr2), arr2);
			next();
		});

		it('should allow multiple accepted values in an array', function(next){
			var arr1 = [ "test1", "test2", "test3", "test3" ],
				arr2 = [ "test1", "test3" ];

			assert.deepEqual(arr1.normalize(arr2), [ "test1", "test3", "test3" ]);
			next();
		});

		it('should persist values when a normalizer is null or undefined', function(next){
			var arr1 = [ "test1", "test2", "test3", "test3" ];

			assert.deepEqual(arr1.normalize(), [ "test1", "test2", "test3", "test3" ]);
			assert.deepEqual(arr1.normalize(null), [ "test1", "test2", "test3", "test3" ]);
			next();
		});

		it('should remove all values when a normalizer is empty', function(next){
			var arr1 = [ "test1", "test2", "test3", "test3" ];

			assert.deepEqual(arr1.normalize([]), []);
			next();
		});

	});

	describe('Validation of the \'toLowerCase()\' function', function(){

		it('should convert an array of string to lower case', function(next){
			var arr1 = [ "TEST1", "TEST2", "TEST3" ];

			assert.deepEqual(arr1.toLowerCase(), [ "test1", "test2", "test3" ]);
			next();
		});

		it('should convert a mixed array to lower case', function(next){
			var arr1 = [ "TEST1", "TEST2", "TEST3", 4, 5 ];

			assert.deepEqual(arr1.toLowerCase(), [ "test1", "test2", "test3", 4, 5 ]);
			next();
		});

		it('should persist an array of numbers', function(next){
			var arr1 = [ 1, 2, 3 ];

			assert.deepEqual(arr1.toLowerCase(), arr1);
			next();
		});

		it('should handle an empty array', function(next){
			var arr1 = [ ];

			assert.deepEqual(arr1.toLowerCase(), arr1);
			next();
		});

	});

	describe('Validation of the \'toUpperCase()\' function', function(){

		it('should convert an array of string to upper case', function(next){
			var arr1 = [ "test1", "test2", "test3" ];

			assert.deepEqual(arr1.toUpperCase(), [ "TEST1", "TEST2", "TEST3" ]);
			next();
		});

		it('should convert a mixed array to upper case', function(next){
			var arr1 = [ "test1", "test2", "test3", 4, 5 ];

			assert.deepEqual(arr1.toUpperCase(), [ "TEST1", "TEST2", "TEST3", 4, 5 ]);
			next();
		});

		it('should persist an array of numbers', function(next){
			var arr1 = [ 1, 2, 3 ];

			assert.deepEqual(arr1.toUpperCase(), arr1);
			next();
		});

		it('should handle an empty array', function(next){
			var arr1 = [ ];

			assert.deepEqual(arr1.toUpperCase(), arr1);
			next();
		});

	});

});