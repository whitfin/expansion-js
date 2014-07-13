Object.defineProperties(Object.prototype, {

	/**
	 * Returns a clone of an object. Not a perfect solution, but will be
	 * able to clone deep objects, dates, arrays and functions.
	 *
	 * @return clone		the clone of the object
	 */
	clone:{
		enumerable:false,
		value:function(){

			// Handle Date
			if(this instanceof Date) {
				var copy = new this.constructor();
				copy.setTime(this.getTime());
				return copy;
			}

			// Handle Array
			if(this instanceof Array) {
				var copy = [];
				for (var i = 0, len = this.length; i < len; i++) {
					if(typeof this[i] == "object" && this[i] !== null) {
						copy[i] = this[i].clone();
					} else {
						copy[i] = this[i];
					}
				}
				return copy;
			}

			// Handle Object
			if(this instanceof Object) {
				var copy = new this.constructor;
				for(var key in this) {
					if(this.hasOwnProperty(key)){
						if(typeof this[key] == "object" && this[key] !== null){
							copy[key] = this[key].clone();
						} else {
							copy[key] = this[key];
						}
					}
				}
				return copy;
			}

		}
	},

	/**
	 * Simple implementation of Object.equals() to calculate whether two
	 * objects are the same based on keys. Be aware that this doesn't
	 * account for key ordering.
	 *
	 * @param obj			the comparison object to compare against
	 * @param strict		whether to use === for comparison
	 * @return true			if the objects are the same
	 */
	equals: {
		enumerable: false,
		value: function (obj, eq) {
			// if this instance is a Number, just compare the values
			if (this.instance() === "Number") {
				return eq ? this.valueOf() == obj.valueOf() : this.valueOf() === obj.valueOf();
			}

			// if this instance is a string, compare the string values
			if (this.instance() === "String") {
				return eq ? this.toString() == obj.toString() : this.toString() === obj.toString();
			}

			// if both x and y are null or undefined and exactly the same
			if ( (!eq && this === obj) || (eq && this == obj) ) return true;

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
				if ( (!eq && this[ p ] === obj[ p ]) || (eq && this[ p ] == obj[ p ]) ) continue;

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
	 * Loops an object recursively and processes using a passed in handler.
	 * Can take a key parameter, if the user has called .loopr() on a nested
	 * object.
	 *
	 * @param handler		the processor
	 * @param key			an optional starting key
	 */
	loopr:{
		enumerable:false,
		value:function(handler, key){
			if(!handler){
				return null;
			}
			for(var k in this){
				if(this.hasOwnProperty(k)) {
					var newK = ~k.indexOf('.') ? '[\'' + k + '\']' : key ? '.' + k : k,
						pass = (key || "") + newK;
					if (this[k] && this[k].instance() == "Object") {
						this[k].loopr(handler, pass);
					} else {
						var res = handler(k, this[k], pass);
						if(res || typeof res == "object"){
							return res;
						}
					}
				}
			}
			return null;
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
	 * @param topLevel		only sort the top level keys
	 * @returns {{}}		the sorted object
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
				var key = keys[index];
				if(this.hasOwnProperty(key)) {
					if (this[key] && typeof this[key] == "object" && !(this[key] instanceof Array) && !topLevel) {
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
     * @param validation	the validation object
     * @returns true		if the object could be validated
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
                if(!this[key]) {
                    if (typeof this[key] == "object" && vInstance.toLowerCase() != "null") {
                        return false;
                    } else if (typeof this[key] == "undefined" && vInstance.toLowerCase() != "undefined") {
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
                        this[key].validate(vInstance);
                    }
                } else if(tInstance != vInstance.toLowerCase()) {
                    return false;
                }

            }
            return true;
        }
    }

});