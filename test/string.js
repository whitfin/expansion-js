var assert = require('assert');

describe('String', function(){

    describe('\b.asKeys', function(){

        it('converts basic dot notation to an array of keys', function(){
            assert.deepEqual("a.list.of.keys".asKeys(), [ "a", "list", "of", "keys" ]);
        });

        it('handles square brackets correctly', function(){
            assert.deepEqual("a[\"list\"]['of'][\"keys\"]".asKeys(), [ "a", "list", "of", "keys" ]);
        });

        it('correctly uses all types of notation', function(){
            assert.deepEqual("a.list.of['huge'].keys".asKeys(), [ "a", "list", "of", "huge", "keys" ]);
        });

        it('does not allow invalid keys', function(){
            var validation = function(err) {
                assert.equal(err.name, "ParseException");
                return true;
            };
            assert.throws(
                function() {
                    "a.key.with.no[quotes]".asKeys();
                }, validation, "Unexpected Error"
            );
            assert.throws(
                function() {
                    "a.list.of['keys".asKeys();
                }, validation, "Unexpected Error"
            );
            assert.throws(
                function() {
                    "a.list.of['keys]".asKeys();
                }, validation, "Unexpected Error"
            );
            assert.throws(
                function() {
                    "a.list.of['huge.keys".asKeys()
                }, validation, "Unexpected Error"
            );
            assert.throws(
                function() {
                    "i.like..dots".asKeys();
                }, validation, "Unexpected Error"
            );
        });

    });

    describe('\b.capitalize', function(){

        it('is able to capitalize a single word', function(){
            assert.equal("word".capitalize(), "Word");
        });

        it('only capitalizes the first word in a string', function(){
            assert.equal("word in a string".capitalize(), "Word in a string");
        });

        it('can capitalize every word in a string', function(){
            assert.equal("word in a string".capitalize('a'), "Word In A String");
        });

        it('starts every sentence in a string with a capital', function(){
            assert.equal("word in a string. word in a second string".capitalize('s'),
                         "Word in a string. Word in a second string");
        });

    });

    describe('\b.contains', function(){

        it('validates if a string contains another', function(){
            assert("word".contains("o"));
        });

        it('can validate if a string does not contain another', function(){
            assert(!("word".contains("zzz")));
        });

        it('is case-sensitive', function(){
            assert(!("word".contains("O")));
        });

        it('handles blank, null or undefined cases', function(){
            assert("word".contains(""));
            assert(!("word".contains(null)));
            assert(!("word".contains(undefined)));
        });

    });

    describe('\b.endsWith', function(){

        it('validates the ending of a string', function(){
            assert("This is a string".endsWith("string"));
            assert("123456789".endsWith("789"));
        });

        it('returns false if a string doesn\'t end with a given string', function(){
            assert(!("This is a string".endsWith("test")));
            assert(!("123456789".endsWith("123")));
        });

        it('is case-sensitive', function(){
            assert("This is a string".endsWith("string"));
            assert(!("This Is A String".endsWith("string")));
        });

        it('handles blank, null or undefined cases', function(){
            assert("".endsWith(""));
            assert(!("".endsWith(null)));
            assert(!("".endsWith(undefined)));
        });

    });

    describe('\b.startsWith', function(){

        it('validates the start of a string', function(){
            assert("This is a string".startsWith("This"));
            assert("123456789".startsWith("123"));
        });

        it('returns false if a string doesn\'t start with a given string', function(){
            assert(!("This is a string".startsWith("test")));
            assert(!("123456789".startsWith("789")));
        });

        it('is case-sensitive', function(){
            assert("This is a string".startsWith("This"));
            assert(!("This Is A String".startsWith("this")));
        });

        it('handles blank, null or undefined cases', function(){
            assert("".startsWith(""));
            assert(!("".startsWith(null)));
            assert(!("".endsWith(undefined)));
        });

    });

});