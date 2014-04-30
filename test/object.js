var assert = require('assert');

describe('Testing library prototypes of the Object object', function(){

	describe('Validation of the \'clone()\' function', function(){

		it('should return a clone of an object', function(next){
			var arr1 = [ "test1", "test2", "test3" ],
				obj1 = { a:1, b:2, c:3 };

			var arr2 = arr1.clone(),
				obj2 = obj1.clone();

			arr2[0] = "test-clone";
			obj2.a = "1";

			assert.deepEqual(arr2, [ "test-clone", "test2", "test3" ]);
			assert.deepEqual(obj2, { a:"1", b:2, c:3 });
			next();
		});

		it('should clone an object recursively', function(next){
			var obj = { a:5, b:"5", c:{ d:[ 1, 2, 3 ], e:null, f:undefined } };

			assert.deepEqual(obj.clone(), obj);
			next();
		});

		it('should properly clone a Date and Function', function(next){
			var clone = { a:{ b:{ c:function(){ return 5; } } } }.clone(),
				time1 = Date.now(),
				time2 =  Date.now() + 8640000,
				date1 = new Date(time1),
				date2 = date1.clone().setTime(time2);

			assert.equal(clone.a.b.c(), 5);
			assert.equal(date1.valueOf(), time1);
			assert.equal(date2.valueOf(), time2);
			next();
		});

		it('should properly clone a non-native Object', function(next){
			function Car(desc){
				this.desc = desc;
			}

			var car1 = new Car('honda'),
				car2 = car1.clone(),
				car3 = car1.clone();

			car3.desc = 'toyota';

			assert.deepEqual(car2, car1);
			assert.deepEqual(car1.desc, 'honda');
			assert.deepEqual(car3.desc, 'toyota');
			next();
		});

	});

	describe('Validation of the \'equals()\' function', function(){

		it('should compare objects without strict comparison', function(next){
			assert([ 5, 5 ].equals([ 5, 5 ], true));
			assert([ 5, "5" ].equals([ 5, 5 ], true));
			assert({ a:5, b:5 }.equals({ a:5, b:5 }, true));
			assert({ a:5, b:"5" }.equals({ a:5, b:5 }, true));
			next();
		});

		it('should compare objects using strict comparison', function(next){
			assert([ 5, 5 ].equals([ 5, 5 ]));
			assert(![ 5, "5" ].equals([ 5, 5 ]));
			assert({ a:5, b:5 }.equals({ a:5, b:5 }));
			assert(!({ a:5, b:"5" }.equals({ a:5, b:5 })));
			next();
		});

		it('should compare objects recursively without strict comparison', function(next){
			assert([ 5, { c:5 } ].equals([ 5, { c:5 } ], true));
			assert([ 5, { c:5 } ].equals([ 5, { c:5 } ], true));
			assert({ a:5, b:{ c:5 } }.equals({ a:5, b:{ c:5 } }, true));
			assert({ a:5, b:{ c:"5" } }.equals({ a:5, b:{ c:5 } }, true));
			next();
		});

		it('should compare objects recursively using strict comparison', function(next){
			assert([ 5, { c:5 } ].equals([ 5, { c:5 } ]));
			assert(![ 5, { c:"5" } ].equals([ 5, { c:5 } ]));
			assert({ a:5, b:{ c:5 } }.equals({ a:5, b:{ c:5 } }));
			assert(!({ a:5, b:{ c:"5" } }.equals({ a:5, b:{ c:5 } })));
			next();
		});

	});

	describe('Validation of the \'instance()\' function', function(){

		it('should return primitive types', function(next){
			assert.equal((1).instance(), "Number");
			assert.equal("1".instance(), "String");
			assert.equal(true.instance(), "Boolean");
			next();
		});

		it('should return composite types', function(next){
			assert.equal([].instance(), "Array");
			assert.equal({}.instance(), "Object");
			next();
		});

		it('should return various object types', function(next){
			assert.equal(new Date().instance(), "Date");
			assert.equal(new Error().instance(), "Error");
			assert.equal(new RegExp().instance(), "RegExp");
			next();
		});

		it('should return various custom object types', function(next){
			var funk;
			assert.equal((funk = function Cat(){}, new funk().instance()), "Cat");
			assert.equal((funk = function Hat(){}, new funk().instance()), "Hat");
			assert.equal((funk = function Mat(){}, new funk().instance()), "Mat");
			assert.equal((funk = function Rat(){}, new funk().instance()), "Rat");
			next();
		});

	});

	describe('Validation of the \'pretty()\' function', function(){

		it('should pretty an object using 4 spaces', function(next){
			assert.equal([ "a", "b", "c" ].pretty('    '), "[\n    \"a\",\n    \"b\",\n    \"c\"\n]");
			assert.equal({ a:1, b:2, c:3 }.pretty('    '), "{\n    \"a\": 1,\n    \"b\": 2,\n    \"c\": 3\n}");
			next();
		});

		it('should pretty an object using a tab', function(next){
			assert.equal([ "a", "b", "c" ].pretty("\t"), "[\n\t\"a\",\n\t\"b\",\n\t\"c\"\n]");
			assert.equal({ a:1, b:2, c:3 }.pretty("\t"), "{\n\t\"a\": 1,\n\t\"b\": 2,\n\t\"c\": 3\n}");
			next();
		});

		it('should not pretty an object when an empty string is passed', function(next){
			assert.equal([ "a", "b", "c" ].pretty(""), JSON.stringify([ "a", "b", "c" ]));
			assert.equal({ a:1, b:2, c:3 }.pretty(""), JSON.stringify({ a:1, b:2, c:3 }));
			next();
		});

		it('should pretty an object using 4 spaces when passing null or undefined', function(next){
			assert.equal([ "a", "b", "c" ].pretty(), "[\n    \"a\",\n    \"b\",\n    \"c\"\n]");
			assert.equal({ a:1, b:2, c:3 }.pretty(), "{\n    \"a\": 1,\n    \"b\": 2,\n    \"c\": 3\n}");
			assert.equal([ "a", "b", "c" ].pretty(null), "[\n    \"a\",\n    \"b\",\n    \"c\"\n]");
			assert.equal({ a:1, b:2, c:3 }.pretty(null), "{\n    \"a\": 1,\n    \"b\": 2,\n    \"c\": 3\n}");
			next();
		});

	});

	describe('Validation of the \'sort()\' function', function(){

		it('should sort an object by key', function(next){
			var obj = { b:{ b:2, a:1 }, a:2, c:3 },
				expected = JSON.stringify({ a:2, b:{ b:2, a:1 }, c:3 });

			assert.equal(JSON.stringify(obj.sort(true, true)), expected);
			next();
		});

		it('should create a sorted clone of an object', function(next){
			var obj = { b:{ b:2, a:1 }, a:2, c:3 },
				expected = JSON.stringify({ a:2, b:{ b:2, a:1 }, c:3 });

			assert.equal(JSON.stringify(obj.sort(false, true)), expected);
			next();
		});

		it('should sort an object by key recursively', function(next){
			var obj = { b:{ b:2, a:1 }, a:2, c:3 },
				expected = JSON.stringify({ a:2, b:{ a:1, b:2 }, c:3 });

			assert.equal(JSON.stringify(obj.sort(true)), expected);
			next();
		});

		it('should recursively create a sorted clone of an object', function(next){
			var obj = { b:{ b:2, a:1 }, a:2, c:3 },
				expected = JSON.stringify({ a:2, b:{ a:1, b:2 }, c:3 });

			assert.equal(JSON.stringify(obj.sort(false)), expected);
			next();
		});

	});

});