Object.defineProperties(Array.prototype, {

	/**
	 * Compare an array with another of default/acceptable values. Used to normalize
	 * data to remove unacceptable values.
	 *
	 * @param normalizer		the normalization array
	 * @returns {Array}			the normalized array
	 */
	normalize:{
		enumerable:false,
		value:function(normalizer){
			if(!normalizer){
				return this;
			}
			for(var element = 0; element < this.length; element++){
				if (!~normalizer.indexOf(this[element])) {
					this.splice(element--, 1);
				}
			}
			return this;
		}
	},

	/**
	 * Converts string values in an array to lower case. Returns a lower case
	 * array, containing lower case strings and any other values.
	 *
	 * @returns {Array}			the lower case array
	 */
	toLowerCase:{
		enumerable:false,
		value:function(){
			var arr = [];
			for(var element in this){
				var val = this[element];
				arr[element] = typeof val == "string" ? val.toLowerCase() : val;
			}
			return arr;
		}
	},

	/**
	 * Converts string values in an array to upper case. Returns an upper case
	 * array, containing upper case strings and any other values.
	 *
	 * @returns {Array}			the upper case array
	 */
	toUpperCase:{
		enumerable:false,
		value:function(){
			var arr = [];
			for(var element in this){
				var val = this[element];
				arr[element] = typeof val == "string" ? val.toUpperCase() : val;
			}
			return arr;
		}
	}

});