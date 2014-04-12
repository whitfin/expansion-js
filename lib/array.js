Object.defineProperties(Array.prototype, {

	/**
	 * Compare an array with another of default/acceptable values. Used to normalize
	 * data to remove unacceptable values.
	 *
	 * @param normalizer		the normalization array
	 * @param sensitive			case sensitive normalization
	 * @returns {Array}			the normalized array
	 */
	normalize:{
		enumerable:false,
		value:function(normalizer, sensitive){
			if(!normalizer){
				return this;
			}
			var arr = JSON.parse(JSON.stringify(this));
			if(!sensitive){
				normalizer = normalizer.toLowerCase();
			}
			for(var element = 0; element < arr.length; element++){
				var value = !sensitive ? arr[element].toLowerCase() : arr[element];
				if(!~normalizer.indexOf(value)){
					arr.splice(element--, 1);
				}
			}
			return arr;
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