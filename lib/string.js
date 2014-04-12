Object.defineProperties(String.prototype, {

	/**
	 * Returns a capitalized string, either the first letter of the string or
	 * the first letter of each word in a string (pass true).
	 *
	 * @returns {string}	the capitalized string
	 */
	capitalize:{
		enumerable:false,
		value:function(filter){
			switch(filter){
				case 'sentence':
				case 's':
					return this.capitalize().replace(/(\.[ ]?)(.)/g, function(x){
						return x[0] +  (x[2] ? x[1] + x[2].toUpperCase() : x[1].toUpperCase());
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
	}

});