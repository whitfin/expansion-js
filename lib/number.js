Object.defineProperties(Number.prototype, {

    /**
     * Abbreviates a number to its human readable form. This supports
     * numbers up to a trillion, and allows for a specific number of
     * decimal points, defaulting to a single decimal point.
     *
     * @param decimal           the number of decimals to use
     * @returns abbreviated     the abbreviated form
     */
    abbreviate:{
        enumerable:false,
        value:function(decimal){
            decimal = decimal || 1;
            var str, mod, val = this.valueOf();

            function round(val, dec){
                var pow = Math.pow(10, dec);
                return +(Math.round(val * pow) / pow);
            }

            if (val < 1000000) {
                mod = round(val / 1000, decimal);
                str = mod < 1000 ? mod + 'K' : 1 + 'M';
            } else if(val < 1000000000) {
                mod = round(val / 1000000, decimal);
                str = mod < 1000 ? mod + 'M' : 1 + 'B';
            } else if(val < 1000000000000) {
                mod = round(val / 1000000000, decimal);
                str = mod < 1000 ? mod + 'B' : 1 + 'T';
            } else {
                str = round(val / 1000000000000, decimal) + 'T';
            }

            return str;
        }
    },

    /**
     * Make use of Regex to modify a number into a neatened format using commas
     *
     * @returns {string}        the neatened number
     */
    comma:{
        enumerable:false,
        value:function(){
            return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

    /**
     * Checks whether the value is within a given number range. Inclusive by
     * default, however a third parameter can be supplied to be exclusive.
     *
     * @param min               the lower bound
     * @param max               the upper bound
     * @param exclusive         boundary exclusion
     * @returns true            if we're in the bounds
     */
    inRange:{
        enumerable:false,
        value:function(min, max, exclusive){
            var val = this.valueOf();
            return  (!min || (exclusive ? val > min : val >= min)) &&
                    (!max || (exclusive ? val < max : val <= max));
        }
    }

});