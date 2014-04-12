var assert = require('assert');

describe('Testing library prototypes of the Object object', function(){

	describe('Validation of the \'equals()\' function', function(){

		it('should compare objects without strict comparison', function(next){
			assert({ a:5, b:5 }.equals({ a:5, b:5 }, true));
			assert({ a:5, b:"5" }.equals({ a:5, b:5 }, true));
			next();
		});

		it('should compare objects using strict comparison', function(next){
			assert({ a:5, b:5 }.equals({ a:5, b:5 }));
			assert(!({ a:5, b:"5" }.equals({ a:5, b:5 })));
			next();
		});

		it('should compare objects recursively without strict comparison', function(next){
			assert({ a:5, b:{ c:5 } }.equals({ a:5, b:{ c:5 } }, true));
			assert({ a:5, b:{ c:"5" } }.equals({ a:5, b:{ c:5 } }, true));
			next();
		});

		it('should compare objects recursively using strict comparison', function(next){
			assert({ a:5, b:{ c:5 } }.equals({ a:5, b:{ c:5 } }));
			assert(!({ a:5, b:{ c:"5" } }.equals({ a:5, b:{ c:5 } })));
			next();
		});

	});

	describe('Validation of the \'pretty()\' function', function(){

		it('should pretty an object using 4 spaces', function(next){
			assert.equal({ a:1, b:2, c:3 }.pretty('    '), "{\n    \"a\": 1,\n    \"b\": 2,\n    \"c\": 3\n}");
			next();
		});

		it('should pretty an object using a tab', function(next){
			assert.equal({ a:1, b:2, c:3 }.pretty("\t"), "{\n\t\"a\": 1,\n\t\"b\": 2,\n\t\"c\": 3\n}");
			next();
		});

		it('should not pretty an object when an empty string is passed', function(next){
			assert.equal({ a:1, b:2, c:3 }.pretty(""), JSON.stringify({ a:1, b:2, c:3 }));
			next();
		});

		it('should pretty an object using 4 spaces when passing null or undefined', function(next){
			assert.equal({ a:1, b:2, c:3 }.pretty(), "{\n    \"a\": 1,\n    \"b\": 2,\n    \"c\": 3\n}");
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