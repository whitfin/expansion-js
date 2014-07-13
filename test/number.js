var assert = require('assert');

describe('Number', function(){

    describe('\b.abbreviate()', function(){

        it('abbreviates numbers up to 1 Trillion', function(){
            assert.equal((1000).abbreviate(), "1K");
            assert.equal((1000000).abbreviate(), "1M");
            assert.equal((1000000000).abbreviate(), "1B");
            assert.equal((1000000000000).abbreviate(), "1T");
        });

        it('defaults to a single decimal place', function(){
            assert.equal((1111).abbreviate(), "1.1K");
            assert.equal((1111111).abbreviate(), "1.1M");
            assert.equal((1111111111).abbreviate(), "1.1B");
            assert.equal((1111111111111).abbreviate(), "1.1T");
        });

        it('is able to use multiple decimal places', function(){
            assert.equal((1750).abbreviate(2), "1.75K");
            assert.equal((1750000).abbreviate(2), "1.75M");
            assert.equal((1750000000).abbreviate(2), "1.75B");
            assert.equal((1750000000000).abbreviate(2), "1.75T");
        });

        it('rounds abbreviations to the nearest decimal', function(){
            assert.equal((1750).abbreviate(), "1.8K");
            assert.equal((1750000).abbreviate(), "1.8M");
            assert.equal((1750000000).abbreviate(), "1.8B");
            assert.equal((1750000000000).abbreviate(), "1.8T");
        });

    });

    describe('\b.comma()', function(){

        it('does not use a comma in numbers < 1,000', function(){
            assert.equal((999).comma(), "999");
        });

        it('uses a comma for numbers > 1,000', function(){
            assert.equal((1001).comma(), "1,001");
        });

        it('uses two commands for numbers > 1,000,000', function(){
            assert.equal((1000001).comma(), "1,000,001");
        });

        it('handles all numbers up to 100,000,000,000,000', function(){
            for(var i = 1; i <= 100000000000000; i *= 10){
                assert.equal(Math.floor((i.toString().length - 1) / 3), i.comma().split(",").length - 1);
            }
        });

    });

    describe('\b.inRange()', function(){

        it('is able to validate if a number is in range', function(){
            assert((999).inRange(500, 1000));
            assert(!(1001).inRange(500, 1000));
        });

        it('defaults to using inclusive boundaries', function(){
            assert((500).inRange(500, 1000));
            assert((1000).inRange(500, 1000));
        });

        it('allows the use of exclusive boundaries', function(){
            assert(!(500).inRange(500, 1000, true));
            assert(!(1000).inRange(500, 1000, true));
        });

        it('handles null boundaries', function(){
            assert((500).inRange(null, 1000));
            assert((500).inRange(1, null));
        });

    });

});