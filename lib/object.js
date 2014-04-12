Object.defineProperties(Object.prototype, {

	/**
	 * Simple implementation of Object.equals() to calculate whether two
	 * objects are the same based on keys. Be aware that this doesn't
	 * account for key ordering.
	 *
	 * @param obj		the comparison object to compare against
	 * @param strict	whether to use === for comparison
	 * @return true		if the objects are the same
	 */
	equals:{
		enumerable:false,
		value:function(obj, equality){
			for(var key in this){
				if(this.hasOwnProperty(key)){
					if(typeof this[key] != 'object' || typeof obj[key] != 'object'){
						if(!(key in obj) || !equality ? this[key] !== obj[key] : this[key] != obj[key]){
							return false;
						}
					} else if(!this[key].equals(obj[key], equality)){
						return false;
					}
				}
			}
			for(var key in obj){
				if(obj.hasOwnProperty(key) && !(key in this)){
					return false;
				}
			}
			return true;
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
	 * Sorts an object by key alphabetically. Can either be modified in place
	 * by passing true, or just returns the sorted object.
	 *
	 * @param modify		do we want to edit in place
	 * @param topLevel		only sort the top level keys
	 * @returns {{}}		the sorted object
	 */
	sort:{
		enumerable:false,
		value:function(modify, topLevel){
			var sortedObj = {},
				keys = Object.keys(this);

			keys.sort(function(key1, key2){
				key1 = key1.toLowerCase(), key2 = key2.toLowerCase();
				if(key1 < key2) return -1;
				if(key1 > key2) return 1;
				return 0;
			});

			for(var index in keys){
				var key = keys[index];
				if(typeof this[key] == "object" && !(this[key] instanceof Array) && !topLevel){
					sortedObj[key] = this[key].sort();
				} else {
					sortedObj[key] = this[key];
				}
			}

			if(modify) {
				for(var key in this){
					delete this[key];
				}

				for(var key in sortedObj){
					this[key] = sortedObj[key];
				}
			}
			return modify ? this : sortedObj;
		}
	}

});