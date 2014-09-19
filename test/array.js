var assert = require('assert');

describe('Array', function(){

    describe('\b.contains', function(){

        it('validates an element exists', function(){
            var arr = [ 1, 3 ];

            assert(arr.contains(1));
        });

        it('validates an element doesn\'t exist', function(){
            var arr = [ 1, 3 ];

            assert(!arr.contains(2));
        });

    });

    describe('\b.fill', function(){

        it('fills an array with string values', function(){
            var arr = new Array(10).fill('my-string');

            for(var i = 0; i < 10; i++){
                assert.equal(arr[i], 'my-string');
            }
        });

        it('fills an array with object values', function(){
            var arr = new Array(10).fill({ 'a': 5 });

            for(var i = 0; i < 10; i++){
                assert(arr[i].equals({ 'a': 5 }));
            }
        });

        it('does not store objects via reference', function(){
            var obj = { 'a': 5, 'b': 10 };
            var arr = new Array(10).fill(obj);

            obj.c = 15;

            for(var i = 0; i < 10; i++){
                assert(arr[i].equals({ 'a': 5, 'b': 10 }));
            }
        });

        it('handles null and undefined values', function(){
            var arr1 = new Array(10).fill(null);
            var arr2 = new Array(10).fill(undefined);

            for(var i = 0; i < 10; i++){
                assert.strictEqual(arr1[i], null);
                assert.strictEqual(arr2[i], undefined);
            }
        });

    });

    describe('\b.insert', function(){

        it('inserts a value at an index', function(){
            var arr1 = [ 1, 3 ],
                arr2 = [ 1, 2, 3 ];

            assert.deepEqual(arr1.insert(1, 2), arr2);
        });

        it('can insert multiple values at an index', function(){
            var arr1 = [ 1, 5 ],
                arr2 = [ 1, 2, 3, 4, 5 ];

            assert.deepEqual(arr1.insert(1, 2, 3, 4), arr2);
        });

        it('appends if the given index is > length', function(){
            var arr1 = [ 1 ],
                arr2 = [ 1, 2 ];

            assert.deepEqual(arr1.insert(1, 2), arr2);
            assert.deepEqual(arr1.insert(10, 3), (arr2.push(3), arr2));
        });

        it('prepends if the given index is <= 0', function(){
            var arr1 = [ 1 ],
                arr2 = [ 0 , 1 ];

            assert.deepEqual(arr1.insert(-1, 0), arr2);
        });

    });

    describe('\b.intersect', function(){

        it('correctly intersects arrays of the same type', function(){
            var arr1 = [ 1, 2, 3 ],
                arr2 = [ 1, 3, 5 ];

            assert.deepEqual(arr1.intersect(arr2), [ 1, 3 ]);
        });

        it('handles intersection between different types', function(){
            var arr1 = [ 1, "2",  3 , 7 ],
                arr2 = [ 1, "2", "3", 5 ];

            assert.deepEqual(arr1.intersect(arr2), [ 1, "2" ]);
        });

        it('intersects array and non-array values', function(){
            var arr = [ 1, "2", 3 ];

            assert.deepEqual(arr.intersect("1"), [ ]);
            assert.deepEqual(arr.intersect(123), [ ]);
            assert.deepEqual(arr.intersect(null), [ ]);
            assert.deepEqual(arr.intersect(undefined), [ ]);
        });

        it('is able to intersect multiple arrays via chaining', function(){
            var arr1 = [ 1, 2, 3 ],
                arr2 = [ 1, 3, 5 ],
                arr3 = [ 1, 4, 7 ];

            assert.deepEqual(arr1.intersect(arr2).intersect(arr3), [ 1 ]);
        });

    });

    describe('\b.isEmpty', function(){

        it('detects an empty array', function(){
            assert([].isEmpty());
        });

        it('detects a non-empty array', function(){
            assert(![ 1 ].isEmpty());
            assert(!["1"].isEmpty());
            assert(![ null ].isEmpty());
            assert(![ undefined ].isEmpty());
        });

    });

    describe('\b.merge', function(){

        it('merges two arrays', function(){
            var arr1 = [ 1, 2 ],
                arr2 = [ 3, 4 ];

            assert.deepEqual(arr1.merge(arr2), [ 1, 2, 3, 4 ]);
        });

        it('takes an index to merge at', function(){
            var arr1 = [ 1, 2 ],
                arr2 = [ 3, 4 ];

            assert.deepEqual(arr1.merge(1, arr2), [ 1, 3, 4, 2 ]);
        });

        it('correctly merges multiple arrays', function(){
            var arr1 = [ 1, 2 ],
                arr2 = [ 3, 4 ],
                arr3 = [ 5, 6 ];

            assert.deepEqual(arr1.merge(arr2, arr3), [ 1, 2, 3, 4, 5, 6 ]);
        });

        it('merges arrays discarding duplicates', function(){
            var arr1 = [ 1, 2 ],
                arr2 = [ 2, 3 ];

            assert.deepEqual(arr1.merge(arr2, true), [ 1, 2, 3 ]);
        });

    });

    describe('\b.normalize', function(){

        it('removes invalid values from an array', function(){
            var arr1 = [ "test1", "test2", "test3" ],
                arr2 = [ "test1", "test3" ];

            assert.deepEqual(arr1.normalize(arr2), arr2);
        });

        it('allows accepted values multiple times', function(){
            var arr1 = [ "test1", "test2", "test3", "test3" ],
                arr2 = [ "test1", "test3" ];

            assert.deepEqual(arr1.normalize(arr2), [ "test1", "test3", "test3" ]);
        });

        it('persists exiting values when no normalizer is given', function(){
            var arr = [ "test1", "test2", "test3", "test3" ];

            assert.deepEqual(arr.normalize(), [ "test1", "test2", "test3", "test3" ]);
            assert.deepEqual(arr.normalize(null), [ "test1", "test2", "test3", "test3" ]);
        });

        it('returns an empty array when a normalizer is empty', function(){
            var arr = [ "test1", "test2", "test3", "test3" ];

            assert.deepEqual(arr.normalize([]), []);
        });

        it('can handle values case-sensitively', function(){
            var arr1 = [ "TEST1", "test2", "test3" ],
                arr2 = [ "TEST1", "TEST2", "TEST3" ],
                arr3 = [ "test1", "test3" ];

            assert.deepEqual(arr1.normalize(arr2, true), [ "TEST1" ]);
            assert.deepEqual(arr1.normalize(arr3, true), [ "test3" ]);
        });

        it('is able to handle values case-insensitively', function(){
            var arr1 = [ "TEST1", "test2", "test3" ],
                arr2 = [ "TEST1", "TEST2", "TEST3" ],
                arr3 = [ "test1", "test3" ];

            assert.deepEqual(arr1.normalize(arr2, false), arr1);
            assert.deepEqual(arr1.normalize(arr3, false), [ "TEST1", "test3" ]);
        });

    });

    describe('\b.remove', function(){

        it('removes an array element', function(){
            var arr1 = [ 1, 2 , 3],
                arr2 = [ 1, 3 ];

            assert.deepEqual(arr1.remove(), arr1);
            assert.deepEqual(arr1.remove(1), arr2);
            assert.deepEqual(arr1.remove(-1), arr1);
        });

        it('removes multiple elements', function(){
            var arr1 = [ 1, 2, 3 ],
                arr2 = [ 1 ];

            assert.deepEqual(arr1.remove(1, 2), arr2);
            assert.deepEqual(arr1.remove(1, [2]), arr2);
        });

        it('is able to remove multiple indices', function(){
            var arr1 = [ 1, 2, 3, 4, 5],
                arr2 = [ 1, 3, 5 ];

            assert.deepEqual(arr1.remove([1, 3]), arr2);
        });

        it('can remove multiple elements at multiple indices', function(){
            var arr1 = [ 1, 2, 3, 4, 5, 6, 7 ],
                arr2 = [ 1, 4, 7 ];

            assert.deepEqual(arr1.remove([1, 4], 2, true), arr2);
            assert.deepEqual(arr1.remove([1, 4], [2, 2]), arr2);
            assert.deepEqual(arr1, arr2);
        });

    });

    describe('\b.toLowerCase', function(){

        it('converts a string array to lower case', function(){
            var arr = [ "TEST1", "TEST2", "TEST3" ];

            assert.deepEqual(arr.toLowerCase(), [ "test1", "test2", "test3" ]);
        });

        it('is able to convert a mixed array', function(){
            var arr = [ "TEST1", "TEST2", "TEST3", 4, 5 ];

            assert.deepEqual(arr.toLowerCase(), [ "test1", "test2", "test3", 4, 5 ]);
        });

        it('does not modify non-string values', function(){
            var arr = [ 1, 2, 3 ];

            assert.deepEqual(arr.toLowerCase(), arr);
        });

        it('can handle an empty array', function(){
            var arr = [ ];

            assert.deepEqual(arr.toLowerCase(), arr);
        });

    });

    describe('\b.toUpperCase', function(){

        it('converts a string array to upper case', function(){
            var arr = [ "test1", "test2", "test3" ];

            assert.deepEqual(arr.toUpperCase(), [ "TEST1", "TEST2", "TEST3" ]);
        });

        it('is able to convert a mixed array', function(){
            var arr = [ "test1", "test2", "test3", 4, 5 ];

            assert.deepEqual(arr.toUpperCase(), [ "TEST1", "TEST2", "TEST3", 4, 5 ]);
        });

        it('does not modify non-string values', function(){
            var arr = [ 1, 2, 3 ];

            assert.deepEqual(arr.toUpperCase(), arr);
        });

        it('can handle an empty array', function(){
            var arr = [ ];

            assert.deepEqual(arr.toUpperCase(), arr);
        });

    });

    describe('\b.unique', function(){

        it('filters out primitive types', function(){
            var arr = [ "test1", "test1", "test2", "test3" ];

            assert.deepEqual(arr.unique(), [ "test1", "test2", "test3" ]);
        });

        it('maintains elements of different types or cases', function(){
            var arr = [ "test1", "TEST1", 4, "4" ];

            assert.deepEqual(arr.unique(), [ "test1", "TEST1", 4, "4" ]);
        });

        it('is able to filter out nested arrays', function(){
            var arr = [ [1, 2], [1, 2], [1, 3] ];

            assert.deepEqual(arr.unique(), [ [1, 2], [1, 3] ]);
        });

        it('recursively filters out objects', function(){
            var arr1 = [ { a:1 }, { a:1 }, { b:2 }],
                arr2 = [ { a:{ b:1 } }, { a:{ b:1 } }, { a:{ b:2 } }];

            assert.deepEqual(arr1.unique(), [ { a:1 }, { b:2 } ]);
            assert.deepEqual(arr2.unique(), [ { a:{ b:1 } }, { a:{ b:2 } } ]);
        });

    });

});