Object.defineProperties(Array.prototype, {

    /**
     * Returns true if the given value is contained
     * inside the array. Shorthand for indexOf().
     *
     * @param value             the value to search for
     * @returns true            if the value is found
     */
    contains:{
        enumerable:false,
        value:function(value){
            return !!~this.indexOf(value);
        }
    },

    /**
     * Fills the current array with a given value. This
     * is used to avoid having to write your own loops,
     * instead providing a shorthand.
     *
     * @param value             the value to repeat
     * @returns arr             the filled array
     */
    fill:{
        enumerable:false,
        value:function(value){
            for (var i = 0; i < this.length; i++){
                this[i] = value ? value.clone() : value;
            }
            return this;
        }
    },

    /**
     * Inserts a number of elements at the given index in an array.
     * Can take either a single entry to add, or any number of entries.
     *
     * @param index             the index to insert at
     * @param entry             an entry to insert
     * @returns arr             the array after insertion
     */
    insert:{
        enumerable:false,
        value:function(index, entry){
            if(index < 0){
                index = 0;
            }
            this.splice(index, 0, entry);
            for(var i = 2; i < arguments.length; i++){
                this.splice(index + i - 1, 0, arguments[i]);
            }
            return this;
        }
    },

    /**
     * Calculates the intersection between two arrays. This method returns a
     * sorted intersection of the two arrays. This method can be chained in order to
     * intersect multiple arrays, without creating unnecessary complexity within
     * the logic.
     *
     * @param arr               the array to intersect
     * @returns intersect       a sorted intersection
     */
    intersect:{
        enumerable:false,
        value:function(arr){
            if(!arr || (arr && arr.instance() != "Array")){
                return [];
            }
            var intersect = [];
            for(var i in this){
                for(var x in arr){
                    if(this.hasOwnProperty(i)){
                        if(arr.hasOwnProperty(x) && this[i].equals(arr[x])){
                            intersect.push(this[i]);
                        }
                    }
                }
            }
            return intersect.sort();
        }
    },

    /**
     * Returns true or false based on the population of the array.
     *
     * @returns true            if the array is empty
     */
    isEmpty:{
        enumerable:false,
        value:function(){
            return !this.length;
        }
    },

    /**
     * Returns the last element in an array, without removing it.
     * Similar to Array#pop but immutable.
     *
     * @returns last            the last entry in the array
     */
    last:{
        enumerable:false,
        value:function(){
            return this[this.length - 1];
        }
    },

    /**
     * Extension of the typical Array.concat() to allow insertion at a given index,
     * with the ability to filter duplicates if desired.
     *
     * @param index             an index to start on or an array to merge
     * @param array             an array to merge
     * @param unique            do we want to filter duplicates out?
     * @returns {Array}         the merged array
     */
    merge:{
        enumerable:false,
        value:function(){
            var arr = this.concat(),
                param = arguments[0],
                sIndex = 1,
                tmp = arr.splice(isNaN(param) ? arr.length : param),
                filter = false;
            if(param.instance() != "Number"){
                sIndex = 0;
            }
            for(var i = sIndex, j = Object.keys(arguments).length; i < j; i++){
                if(arguments[i].instance() == "Boolean"){
                    filter = arguments[i];
                    break;
                }
                arr = arr.concat(arguments[i]);
            }
            arr = arr.concat(tmp);
            return filter ? arr.unique() : arr;
        }
    },

    /**
     * Compare an array with another of default/acceptable values. Used to normalize
     * data to remove unacceptable values.
     *
     * @param normalizer        the normalization array
     * @param sensitive         case sensitive normalization
     * @returns {Array}         the normalized array
     */
    normalize:{
        enumerable:false,
        value:function(normalizer, sensitive){
            if(!normalizer){
                return this;
            }
            var arr = this.concat();
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
     * Removes a number of elements at the given index. Accepts arrays to remove
     * from multiple indexes. This method is destructive by default, however a third
     * parameter can override this to make it non-destructive.
     *
     * @param index             the index to remove
     * @param amount            the number of entries to remove
     * @returns removed         the array after removal
     */
    remove:{
        enumerable:false,
        value:function(index, amount, maintain){
            if(index == undefined || (index.instance() == "Number" && index < 0)){
                return this;
            }
            var arr = !maintain ? this : this.concat();
            amount = amount != undefined ? amount : 1;
            if(index.instance() == "Array"){
                for(var i = 0; i < index.length; i++){
                    var tmp = amount.instance() == "Array" ? amount[i] : amount;
                    arr = arr.remove(index[i] - (i * tmp), tmp);
                }
                return arr;
            }
            return arr.splice(index, amount), arr;
        }
    },

    /**
     * Converts string values in an array to lower case. Returns a lower case
     * array, containing lower case strings and any other values.
     *
     * @returns {Array}         the lower case array
     */
    toLowerCase:{
        enumerable:false,
        value:function(){
            var arr = [];
            for(var element in this){
                if(this.hasOwnProperty(element)){
                    var val = this[element];
                    arr[element] = val.instance() == "String" ? val.toLowerCase() : val;
                }
            }
            return arr;
        }
    },

    /**
     * Converts string values in an array to upper case. Returns an upper case
     * array, containing upper case strings and any other values.
     *
     * @returns {Array}         the upper case array
     */
    toUpperCase:{
        enumerable:false,
        value:function(){
            var arr = [];
            for(var element in this){
                if(this.hasOwnProperty(element)){
                    var val = this[element];
                    arr[element] = val.instance() == "String" ? val.toUpperCase() : val;
                }
            }
            return arr;
        }
    },

    /**
     * Filters out duplicate values from an array. Recursively checks Objects
     * to find out if they match before filtering out.
     *
     * @returns {Array}         the filtered array
     */
    unique:{
        enumerable:false,
        value:function(){
            var arr = this.concat();
            for(var i = 0, j = arr.length; i < j; ++i){
                for(var x = i + 1; x < arr.length; ++x){
                    if((arr[i] === arr[x]) || (typeof arr[i] == "object" && arr[i].equals(arr[x]))){
                        arr.splice(x--, 1);
                    }
                }
            }
            return arr;
        }
    }

});