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

});