Object.defineProperties(Number.prototype, {

	/**
	 * Make use of Regex to modify a number into a neatened format using commas
	 *
	 * @returns {string}
	 */
	comma:{
		enumerable:false,
		value:function(){
			return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

});