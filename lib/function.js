Object.defineProperties(Function.prototype, {

    /**
     * Allows execution of the current function without args. Used
     * for passing as a parameter without using the passed back
     * args as the arguments.
     *
     * @returns {Function}      a wrapper around the current function
     */
    withoutArgs:{
        enumerable:false,
        value:function(){
            return this();
        }
    }

});