Object.defineProperties(String.prototype, {

    /**
     * Returns an array of keys, transforming the current string
     * via the dot notation syntax. Accepts any variations of
     * the['dot'].syntax. This is messy and could be improved
     * in future.
     *
     * @returns {Array}         an array of keys
     */
    asKeys:{
        enumerable:false,
        value:function(){
            // position of search
            var p = 0;
            // output keys
            var keys = [];

            // move through the string
            while (p < this.length){
                // close brace
                var c;
                // dot index
                var d = this.indexOf('.', p);
                // brace index
                var b = this.indexOf('[', p);

                // clean key, just add
                if (!~d && !~b){
                    // the rest of the string is a key
                    keys.push(this.slice(p, this.length));
                    // we're done
                    break;
                } else if (!~b || (~d && d < b)) {
                    // check valid key
                    if(this[d + 1] === '.'){
                        // invalid == exception
                        throw new ParseException({
                            char:this[d + 1],
                            index:d + 1,
                            brace:false
                        });
                    }
                    // push up to the next dot
                    keys.push(this.slice(p, d));
                    // start from the dot
                    p = d + 1;
                } else {
                    if (b > p){
                        // push up to the brace
                        keys.push(this.slice(p, b));
                        // start from the brace
                        p = b;
                    }
                    // check for quotes
                    if (!/\"|\'/.test(this[b + 1])) {
                        throw new ParseException({
                            char: this[b + 1],
                            index: b + 1,
                            brace: this[p] == '['
                        });
                    } else {
                        // check for end of the quotes
                        c = this.indexOf(this[b + 1] + ']', b);
                        // uh oh
                        if (!~c) {
                            throw new ParseException({
                                message: "Unable to find matching quote at index " + (b + 1) + "!"
                            });
                        }
                        // push key until the next point
                        keys.push(this.slice(p + 2, c));
                        // move to the start of the next key
                        p = c + (this[c + 2] === '.' ? 3 : 2);
                    }
                }
            }
            // we're done!
            return keys;
        }
    },

    /**
     * Returns a capitalized string, either the first letter of the string or
     * the first letter of each word in a string (pass true).
     *
     * @returns {string}        the capitalized string
     */
    capitalize:{
        enumerable:false,
        value:function(filter){
            switch(filter){
                case 'sentence':
                case 's':
                    return this.capitalize().replace(/(\.[ ]?)(.)/g, function(x){
                        return x[0] + (x[2] ? x[1] + x[2].toUpperCase() : x[1].toUpperCase());
                    });

                case 'all':
                case 'a':
                    return this.split(' ').map(function(w){
                        return w.capitalize();
                    }).join(' ');

                default:
                    return this.charAt(0).toUpperCase() + this.slice(1);
            }
        }
    },

    /**
     * Simple method to return whether a string contains a given substring.
     *
     * @param str               the substring to search for
     * @returns true            if the string contains the substring
     */
    contains:{
        enumerable:false,
        value:function(str){
            return ~this.indexOf(str);
        }
    },

    /**
     * Returns true if the current string ends with a given string, and false
     * if it doesn't.
     *
     * @param str               the string we're checking for
     * @returns {boolean}       true if it ends with the string
     */
    endsWith:{
        enumerable:false,
        value:function(str){
            return str != undefined && this.slice(-str.length) == str;
        }
    },

    /**
     * Returns true if the current string starts with a given string, and false
     * if it doesn't.
     *
     * @param str               the string we're checking for
     * @returns {boolean}       true if it starts with the string
     */
    startsWith:{
        enumerable:false,
        value:function(str){
            return str != undefined && this.slice(0, str.length) == str;
        }
    }
});

// ParseException
function ParseException(opts) {
    this.name = "ParseException";
    this.message = opts.message ||
        "Unable to parse character '" + opts.char + "' at column " + (opts.index + 1) + "!";
    if(opts.brace){
        this.message += " Did you remember to wrap brace keys in quotes?";
    }
    this.stack = new Error().stack.replace("Error", this.message);
}
ParseException.prototype = Error.prototype;