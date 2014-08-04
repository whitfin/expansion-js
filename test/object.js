var assert = require('assert');

describe('Object', function(){

    describe('\b.clone', function(){

        it('clones and object', function(){
            var arr1 = [ "test1", "test2", "test3" ],
                obj1 = { a:1, b:2, c:3 };

            var arr2 = arr1.clone(),
                obj2 = obj1.clone();

            arr2[0] = "test-clone";
            obj2.a = "1";

            assert.deepEqual(arr2, [ "test-clone", "test2", "test3" ]);
            assert.deepEqual(obj2, { a:"1", b:2, c:3 });
        });

        it('recursively clones an object', function(){
            var obj = { a:5, b:"5", c:{ d:[ 1, { "value" : 2 }, 3 ], e:null, f:undefined } };

            assert.deepEqual(obj.clone(), obj);
        });

        it('clones a Date and Function', function(){
            var clone = { a:{ b:{ c:function(){ return 5; } } } }.clone(),
                time1 = Date.now(),
                time2 =  Date.now() + 8640000,
                date1 = new Date(time1),
                date2 = date1.clone().setTime(time2);

            assert.equal(clone.a.b.c(), 5);
            assert.equal(date1.valueOf(), time1);
            assert.equal(date2.valueOf(), time2);
        });

        it('is able to handle non-native Object types', function(){
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
        });

    });

    describe('\b.createKey', function(){

        it('creates a key with a given value', function(){
            assert({}.createKey('my-key', 10).equals({ 'my-key':10 }));
            assert({}.createKey('my-key', '10').equals({ 'my-key':'10' }));
        });

        it('returns the current object if params are missing', function(){
            assert({}.createKey('my-key').equals({ }));
            assert({}.createKey(null, 10).equals({ }));
            assert({}.createKey('my-key', null).equals({ }));
            assert({}.createKey(undefined, 10).equals({ }));
        });

        it('can create a key from a nested path', function(){
            assert({}.createKey('a.b.c', 10).equals({ a: { b: { c:10 } } }));
            assert({}.createKey('a.b.c', '10').equals({ a: { b: { c:'10' } } }));
        });

        it('can preserve existing keys inside an object', function(){
            var obj1 = { a: { b:{ c:{ }, e:5 } } },
                obj2 = { a: { b: { c:{ d:10 }, e:5 } } };

            assert(obj1.createKey('a.b.c.d', 10).equals(obj2));
            assert(obj1.createKey('a.b.c.d', '10').equals((obj2.a.b.c.d = '10', obj2)));
        });

    });

    describe('\b.equals', function(){

        it('uses the equality operator to compare objects', function(){
            assert([ 5, 5 ].equals([ 5, 5 ], true));
            assert([ 5, "5" ].equals([ 5, 5 ], true));
            assert({ a:5, b:5 }.equals({ a:5, b:5 }, true));
            assert({ a:5, b:"5" }.equals({ a:5, b:5 }, true));
        });

        it('uses the identity operator to compare objects', function(){
            assert([ 5, 5 ].equals([ 5, 5 ]));
            assert(![ 5, "5" ].equals([ 5, 5 ]));
            assert({ a:5, b:5 }.equals({ a:5, b:5 }));
            assert(!({ a:5, b:"5" }.equals({ a:5, b:5 })));
        });

        it('recursively compares objects using the equality operator', function(){
            assert([ 5, { c:5 } ].equals([ 5, { c:5 } ], true));
            assert([ 5, { c:5 } ].equals([ 5, { c:5 } ], true));
            assert({ a:5, b:{ c:5 } }.equals({ a:5, b:{ c:5 } }, true));
            assert({ a:5, b:{ c:"5" } }.equals({ a:5, b:{ c:5 } }, true));
        });

        it('recursively compares objects using the identity operator', function(){
            assert([ 5, { c:5 } ].equals([ 5, { c:5 } ]));
            assert(![ 5, { c:"5" } ].equals([ 5, { c:5 } ]));
            assert({ a:5, b:{ c:5 } }.equals({ a:5, b:{ c:5 } }));
            assert(!({ a:5, b:{ c:"5" } }.equals({ a:5, b:{ c:5 } })));
        });

    });

    describe('\b.instance', function(){

        it('handles primitive types', function(){
            assert.equal((1).instance(), "Number");
            assert.equal("1".instance(), "String");
            assert.equal(true.instance(), "Boolean");
        });

        it('handles composite types', function(){
            assert.equal([].instance(), "Array");
            assert.equal({}.instance(), "Object");
        });

        it('handles native types', function(){
            assert.equal(new Date().instance(), "Date");
            assert.equal(new Error().instance(), "Error");
            assert.equal(new RegExp().instance(), "RegExp");
        });

        it('handles user defined types', function(){
            var funk;
            assert.equal((funk = function Cat(){}, new funk().instance()), "Cat");
            assert.equal((funk = function Hat(){}, new funk().instance()), "Hat");
            assert.equal((funk = function Mat(){}, new funk().instance()), "Mat");
            assert.equal((funk = function Rat(){}, new funk().instance()), "Rat");
        });

    });

    describe('\b.loop', function(){

        it('loops single level objects', function(){
            var i = 0,
                keys = [ "a", "b", "c" ],
                values = [ 5, 10, 15 ];

            ({ a:5, b:10, c:15 }).loop(function(key, value){
                assert.equal(key, keys[i]);
                assert.equal(value, values[i++]);
            });
        });

        it('can loop array objects', function(){
            var i = 0,
                arr = [ 1, 2, 3 ];

            arr.loop(function(key, value){
                assert.equal(i, key);
                assert.equal(arr[i++], value);
            });
        });

        it('returns if no handler is provided', function(){
            assert.equal(({ a:1, b:2, c:3 }).loop(), undefined);
        });

        it('is able to return values from a closure', function(){
            var key = ({ a:1, b:2, c:3 }).loop(function(key, value){
                if(value == 2){
                    return key;
                }
            });
            assert.equal(key, "b");
        });

    });

    describe('\b.loopr', function(){

        it('recursively loops objects', function(){
            ({ a:{ b:{ c:15 } } }).loopr(function(key, value, path){
                assert.equal(key, "c");
                assert.equal(value, 15);
                assert.equal(path, "a.b.c");
            });
            ({ a:{ b:{ "c.d":{ e:15 } } } }).loopr(function(key, value, path){
                assert.equal(key, "e");
                assert.equal(value, 15);
                assert.equal(path, "a.b['c.d'].e");
            });
        });

        it('can loop array objects', function(){
            var i = 0,
                arr = [ 1, 2, 3 ];

            arr.loop(function(key, value){
                assert.equal(i, key);
                assert.equal(arr[i++], value);
            });
        });

        it('returns if no handler is provided', function(){
            assert.equal(({ a:1, b:2, c:3 }).loopr(), undefined);
        });

        it('is able to return values from a closure', function(){
            var key = ({ a:1, b:2, c:3 }).loopr(function(key, value){
                if(value == 2){
                    return key;
                }
            });
            assert.equal(key, "b");
        });

    });

    describe('\b.pretty', function(){

        it('uses 4 spaces to pretty an object', function(){
            assert.equal([ "a", "b", "c" ].pretty('    '), "[\n    \"a\",\n    \"b\",\n    \"c\"\n]");
            assert.equal({ a:1, b:2, c:3 }.pretty('    '), "{\n    \"a\": 1,\n    \"b\": 2,\n    \"c\": 3\n}");
        });

        it('uses a tab to pretty an object', function(){
            assert.equal([ "a", "b", "c" ].pretty("\t"), "[\n\t\"a\",\n\t\"b\",\n\t\"c\"\n]");
            assert.equal({ a:1, b:2, c:3 }.pretty("\t"), "{\n\t\"a\": 1,\n\t\"b\": 2,\n\t\"c\": 3\n}");
        });

        it('compacts an object when an empty string is passed', function(){
            assert.equal([ "a", "b", "c" ].pretty(""), JSON.stringify([ "a", "b", "c" ]));
            assert.equal({ a:1, b:2, c:3 }.pretty(""), JSON.stringify({ a:1, b:2, c:3 }));
        });

        it('defaults to using 4 spaces', function(){
            assert.equal([ "a", "b", "c" ].pretty(), "[\n    \"a\",\n    \"b\",\n    \"c\"\n]");
            assert.equal({ a:1, b:2, c:3 }.pretty(), "{\n    \"a\": 1,\n    \"b\": 2,\n    \"c\": 3\n}");
            assert.equal([ "a", "b", "c" ].pretty(null), "[\n    \"a\",\n    \"b\",\n    \"c\"\n]");
            assert.equal({ a:1, b:2, c:3 }.pretty(null), "{\n    \"a\": 1,\n    \"b\": 2,\n    \"c\": 3\n}");
        });

    });

    describe('\b.sort', function(){

        it('sorts an object by key', function(){
            var obj = { b:{ b:2, a:1 }, a:2, c:3 },
                expected = JSON.stringify({ a:2, b:{ b:2, a:1 }, c:3 });

            assert.equal(JSON.stringify(obj.sort(true)), expected);
        });

        it('handles null values', function(){
            var obj = { a: 1, b:{ c: null } },
                expected = JSON.stringify({ a: 1, b:{ c: null } });

            assert.equal(JSON.stringify(obj.sort(false)), expected);
        });

        it('recursively sorts an object', function(){
            var obj = { b:{ b:2, a:1 }, a:2, c:3 },
                expected = JSON.stringify({ a:2, b:{ a:1, b:2 }, c:3 });

            assert.equal(JSON.stringify(obj.sort(false)), expected);
        });

        it('does not sort arrays', function(){
            var obj = { b:{ b:2, a:[ 1, 2, 3 ] }, a:2, c:3 },
                expected = JSON.stringify({ a:2, b:{ a:[ 1, 2, 3], b:2 }, c:3 });

            assert.equal(JSON.stringify(obj.sort(false)), expected);
        });

    });

    describe('\b.validate', function(){

        it('compares a base object with a schema', function(){
            var obj  = { a:1, b:{ c:2, d:"3" } },
                pass = { a:"Number", b:{ c:"Number", d:"String" } },
                fail = { a:"Number", b:{ c:"String", d:"String" } };

            assert( obj.validate(null));
            assert( obj.validate(pass));
            assert(!obj.validate(fail));
        });

        it('passes objects with no validation key', function(){
            var obj = { a: 1, b:{ c: null } },
                expected = { a:"Number" };

            assert(obj.validate(expected));
        });

        it('is able to handle undefined values', function(){
            var obj  = { a:null, b:undefined },
                pass = { a:"Null", b:"Undefined" },
                fail = { a:"Undefined", b:"Null" };

            assert( obj.validate(pass));
            assert(!obj.validate(fail));

            obj  = { a:undefined };
            fail = { a:"Null" };

            assert(!obj.validate(fail));
        });

        it('validates an object with no nest', function(){
            var obj  = { a: 1, b:{ c: null } },
                pass = { a:"Number", b:"Object" },
                fail = { a:"Number", b:"Number" };

            assert( obj.validate(pass));
            assert(!obj.validate(fail));
        });

    });

});