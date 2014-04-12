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
	}

});