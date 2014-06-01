var assert = require('assert');

describe('Testing library prototypes of the Array object', function(){

	describe('Validation of the \'insert()\' function', function(){

		it('should insert a value at a given index', function(next){
			var arr1 = [ 1, 3 ],
				arr2 = [ 1, 2, 3 ];

			assert.deepEqual(arr1.insert(1, 2), arr2);
			next();
		});

		it('should insert multiple values at a given index', function(next){
			var arr1 = [ 1, 5 ],
				arr2 = [ 1, 2, 3, 4, 5 ];

			assert.deepEqual(arr1.insert(1, 2, 3, 4), arr2);
			next();
		});

		it('should append if a index above the length is given', function(next){
			var arr1 = [ 1 ],
				arr2 = [ 1, 2 ];

			assert.deepEqual(arr1.insert(1, 2), arr2);
			assert.deepEqual(arr1.insert(10, 3), (arr2.push(3), arr2));
			next();
		});

		it('should handle a case where a merge index is negative', function(next){
			var arr1 = [ 1 ],
				arr2 = [ 0 , 1 ];

			assert.deepEqual(arr1.insert(-1, 0), arr2);
			next();
		});

	});

	describe('Validation of the \'merge()\' function', function(){

		it('should merge together two arrays', function(next){
			var arr1 = [ 1, 2 ],
				arr2 = [ 3, 4 ];

			assert.deepEqual(arr1.merge(arr2), [ 1, 2, 3, 4 ]);
			next();
		});

		it('should merge two arrays at a given index', function(next){
			var arr1 = [ 1, 2 ],
				arr2 = [ 3, 4 ];

			assert.deepEqual(arr1.merge(1, arr2), [ 1, 3, 4, 2 ]);
			next();
		});

		it('should merge together multiple arrays', function(next){
			var arr1 = [ 1, 2 ],
				arr2 = [ 3, 4 ],
				arr3 = [ 5, 6 ];

			assert.deepEqual(arr1.merge(arr2, arr3), [ 1, 2, 3, 4, 5, 6 ]);
			next();
		});

		it('should merge two arrays without duplicates', function(next){
			var arr1 = [ 1, 2 ],
				arr2 = [ 2, 3 ];

			assert.deepEqual(arr1.merge(arr2, true), [ 1, 2, 3 ]);
			next();
		});

	});

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

		it('should remove values from an array with case in mind', function(next){
			var arr1 = [ "TEST1", "test2", "test3" ],
				arr2 = [ "TEST1", "TEST2", "TEST3" ],
				arr3 = [ "test1", "test3" ];

			assert.deepEqual(arr1.normalize(arr2, true), [ "TEST1" ]);
			assert.deepEqual(arr1.normalize(arr3, true), [ "test3" ]);
			next();
		});

		it('should remove values from an array without caring for case', function(next){
			var arr1 = [ "TEST1", "test2", "test3" ],
				arr2 = [ "TEST1", "TEST2", "TEST3" ],
				arr3 = [ "test1", "test3" ];

			assert.deepEqual(arr1.normalize(arr2, false), arr1);
			assert.deepEqual(arr1.normalize(arr3, false), [ "TEST1", "test3" ]);
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

	describe('Validation of the \'unique()\' function', function(){

		it('should filter out primitive types', function(next){
			var arr1 = [ "test1", "test1", "test2", "test3" ];

			assert.deepEqual(arr1.unique(), [ "test1", "test2", "test3" ]);
			next();
		});

		it('should maintain cast items or items of a different case', function(next){
			var arr1 = [ "test1", "TEST1", 4, "4" ];

			assert.deepEqual(arr1.unique(), [ "test1", "TEST1", 4, "4" ]);
			next();
		});

		it('should filter out nested arrays', function(next){
			var arr1 = [ [1, 2], [1, 2], [1, 3] ];

			assert.deepEqual(arr1.unique(), [ [1, 2], [1, 3] ]);
			next();
		});

		it('should recursively filter out objects', function(next){
			var arr1 = [ { a:1 }, { a:1 }, { b:2 }],
				arr2 = [ { a:{ b:1 } }, { a:{ b:1 } }, { a:{ b:2 } }];

			assert.deepEqual(arr1.unique(), [ { a:1 }, { b:2 } ]);
			assert.deepEqual(arr2.unique(), [ { a:{ b:1 } }, { a:{ b:2 } } ]);
			next();
		});

	});

});