Object.defineProperties(Object.prototype, {

    /**
     * Returns a clone of an object. Not a perfect solution, but will be
     * able to clone deep objects, dates, arrays and functions.
     *
     * @return clone            the clone of the object
     */
    clone:{
        enumerable:false,
        value:function(){

            // Handle Date
            if(this.instance() == 'Date'){
                var d = new this.constructor();
                return (d.setTime(this.getTime()), d);
            }

            // Handle Array
            if(this.instance() == 'Array'){
                var arr = [];
                for(var i = 0, len = this.length; i < len; i++){
                    if(typeof this[i] == "object" && this[i] !== null){
                        arr[i] = this[i].clone();
                    } else {
                        arr[i] = this[i];
                    }
                }
                return arr;
            }

            // Handle String and Number
            if(this.instance() == 'String' || this.instance() == 'Number'){
                return this;
            }

            // Handle Object
            if(this instanceof Object){
                var obj = new this.constructor;
                for(var key in this){
                    if(this.hasOwnProperty(key)){
                        if(typeof this[key] == "object" && this[key] !== null) {
                            obj[key] = this[key].clone();
                        } else {
                            obj[key] = this[key];
                        }
                    }
                }
                return obj;
            }

        }
    },

    /**
     * Simple implementation of Object.equals() to calculate whether two
     * objects are the same based on keys. Be aware that this doesn't
     * account for key ordering.
     *
     * @param obj               the comparison object to compare against
     * @param eq                whether to use == for comparison
     * @return true             if the objects are the same
     */
    equals:{
        enumerable:false,
        value:function(obj, eq){
            // if this instance is a Number, just compare the values
            if (this.instance() === "Number") {
                return eq ? this.valueOf() == obj.valueOf() : this.valueOf() === obj;
            }

            // if this instance is a string, compare the string values
            if (this.instance() === "String") {
                return eq ? this.toString() == obj.toString() : this.toString() === obj;
            }

            // if both x and y are null or undefined and exactly the same
            if ((!eq && this === obj) || (eq && this == obj)) return true;

            // if they are not strictly equal, they both need to be Objects
            if (!( typeof this === "object" ) || !( typeof obj === "object" )) return false;

            // they must have the exact same prototype chain, the closest we can do is
            // test there constructor.
            if (this.constructor !== obj.constructor) return false;

            for (var p in this) {
                // other properties were tested using x.constructor === y.constructor
                if (!this.hasOwnProperty(p)) continue;

                // allows to compare x[ p ] and y[ p ] when set to undefined
                if (!obj.hasOwnProperty(p)) return false;

                // if they have the same strict value or identity then they are equal
                if ((!eq && this[ p ] === obj[ p ]) || (eq && this[ p ] == obj[ p ])) continue;

                // Numbers, Strings, Functions, Booleans must be strictly equal
                if (typeof( this[ p ] ) !== "object") return false;

                // Objects and Arrays must be tested recursively
                if (!this[ p ].equals(obj[ p ], eq)) return false;
            }

            for (p in obj) {
                // allows x[ p ] to be set to undefined
                if (obj.hasOwnProperty(p) && !this.hasOwnProperty(p)) return false;
            }
            return true;
        }
    },

    /**
     * Returns the 'instanceof' of the Object via its constructor.
     *
     * @returns {*}
     */
    instance:{
        enumerable:false,
        value:function(){
            return this.constructor.toString().match(/function (\w+)\(/)[1];
        }
    },

    /**
     * Loops the keys of an object, top-level. Passes the key and value to a
     * handling function. Allows the user to return a value from within
     * the closure.
     *
     * @param handler           the processor
     */
    loop:{
        enumerable:false,
        value:function(handler){
            if(!handler){
                return;
            }
            for(var k in this){
                if(this.hasOwnProperty(k)){
                    var res = handler(k, this[k]);
                    if(res || typeof res == "object"){
                        return res;
                    }
                }
            }
        }
    },

    /**
     * Loops an object recursively and processes using a passed in handler.
     * Can take a key parameter, if the user has called .loopr() on a nested
     * object.
     *
     * @param handler           the processor
     * @param key               an optional starting key
     */
    loopr:{
        enumerable:false,
        value:function(handler, key){
            if(!handler){
                return;
            }
            for(var k in this){
                if(this.hasOwnProperty(k)){
                    var newK = ~k.indexOf('.') ? '[\'' + k + '\']' : key ? '.' + k : k,
                        pass = (key || "") + newK;
                    if(this[k] && this[k].instance() == "Object"){
                        this[k].loopr(handler, pass);
                    } else {
                        var res = handler(k, this[k], pass);
                        if(res || typeof res == "object"){
                            return res;
                        }
                    }
                }
            }
        }
    },

    /**
     * Returns a prettied representation of an object via JSON.stringify().
     *
     * @returns {*}
     */
    pretty:{
        enumerable:false,
        value:function(indent){
            return JSON.stringify(this, null, indent == (undefined || null) ? 4 : indent);
        }
    },

    /**
     * Sorts an object by key alphabetically. Returns a sorted
     * copy of the object in question.
     *
     * @param topLevel          only sort the top level keys
     * @returns {{}}            the sorted object
     */
    sort:{
        enumerable:false,
        value:function(topLevel){
            var sortedObj = {},
                keys = Object.keys(this);

            keys.sort(function(key1, key2){
                key1 = key1.toLowerCase(), key2 = key2.toLowerCase();
                return key1 < key2 ? -1 : 1;
            });

            for(var index in keys){
                if(keys.hasOwnProperty(index) && this.hasOwnProperty(keys[index])){
                    var key = keys[index];
                    if(this[key] && this[key].instance() == "Object" && !topLevel){
                        sortedObj[key] = this[key].sort();
                    } else {
                        sortedObj[key] = this[key];
                    }
                }
            }

            return sortedObj;
        }
    },

    /**
     * Validates types of object values against a given schema.
     * Used for simple and quick object validation.
     *
     * @param validation        the validation object
     * @returns true            if the object could be validated
     */
    validate:{
        enumerable:false,
        value:function(validation){
            if(!validation){
                return true;
            }
            for(var key in this){
                if(!this.hasOwnProperty(key) || !validation[key]){
                    continue;
                }

                var vInstance = validation[key];
                if(!this[key]){
                    if(typeof this[key] == "object" && vInstance.toLowerCase() != "null"){
                        return false;
                    } else if(typeof this[key] == "undefined" && vInstance.toLowerCase() != "undefined") {
                        return false;
                    }
                    continue;
                }

                var tInstance = this[key].instance().toLowerCase();
                if(tInstance == "object"){
                    if(vInstance.instance() != "Object"){
                        if(vInstance.toLowerCase() != tInstance){
                            return false;
                        }
                    } else {
                        return this[key].validate(vInstance);
                    }
                } else if(tInstance != vInstance.toLowerCase()) {
                    return false;
                }

            }
            return true;
        }
    },

    /**
     * Small helper to enable adding of dynamic keys on object
     * creation. Returns itself for chaining, and the ability
     * to include in assignments. Allows dot noted keys.
     *
     * @param k                 a key, or a dot-noted key path
     * @param v                 the final value of the path
     * @return this             the modified object
     */
    with:{
        enumerable:false,
        value:function(k, v){
            if(k == undefined || k.instance() != "String"){
                return this;
            }
            var keys = k.asKeys();
            for (var i = 0, tmp = this; i < keys.length - 1; i++) {
                if(tmp[keys[i]]){
                    tmp = tmp[keys[i]];
                } else {
                    tmp = tmp[keys[i]] = {};
                }
            }
            return tmp[keys[i]] = v, this;
        }
    },

});