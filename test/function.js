var assert = require('assert');

describe('Function', function(){

    describe('\b.withoutArgs', function(){

        it('executes a function without arguments', function(){
            function a(b, c) {
                return b + c;
            }

            assert.equals(a(1, 2), 3);
            assert.equals(a.withoutArgs(), NaN);
        });

        it('doesn\'t pass on any parameters', function(){
            function a(b, c) {
                return b + c;
            }

            assert.equals(a(1, 2), 3);
            assert.equals(a.withoutArgs(10, 5), NaN);
        });

    });

});