Object.defineProperties(String.prototype, {

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