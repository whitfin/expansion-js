var assert = require('assert'),
    expand = require('../');

describe('Expansion', function(){

    describe('\b.add', function(){

        it('adds a prototype function to an object', function(){
            expand.add(Object, 'protoFunc', function(){
                return 'This is the protoFunc!';
            }, {
                configurable:true,
                enumerable:false,
                writable:true
            });
            assert.equal({}.protoFunc(), "This is the protoFunc!");
        });

        it('adds a prototype value to an object', function(){
            expand.add(Object, 'protoVal', 'This is the protoVal!', {
                configurable:true,
                enumerable:false,
                writable:true
            });
            assert.equal({}.protoVal, "This is the protoVal!");
        });

    });

    describe('\b.remove', function(){

        it('removes a prototype function from an object', function(){
            expand.delete(Object, 'protoFunc');
            assert.equal({}.protoFunc, undefined);
        });

        it('removes a prototype value from an object', function(){
            expand.add(Object, 'protoVal');
            assert.equal({}.protoVal, undefined);
        });

    });

});