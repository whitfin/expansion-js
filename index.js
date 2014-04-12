var fs = require('fs');

/**
 * Simple handling for adding a new prototype value. Figured it's better
 * to provide a way to do it all in one place.
 *
 * @param proto			the superclass to prototype (Object, Array, etc).
 * @param key			the key of your prototype
 * @param value			the value of your prototype
 * @param properties	the properties of your prototype
 */
exports.add = exports.create = function(proto, key, value, properties){
	// Make sure we have some properties
	if(typeof properties != "object"){
		properties = {};
	}
	// Add the value to the properties
	properties['value'] = value;
	// Prototype the key/value
	Object.defineProperties((proto == 'global' ? global : proto.prototype), (function(){
		var props = {};
		props[key] = properties;
		return props;
	})());
};

/**
 * Simple handling for removing a value from a prototype. It's just as
 * easy to do this from within your own code, but it's here for completeness.
 *
 * @param proto			the superclass to remove the prototype from
 * @param key			the key of the prototype to remove
 */
exports.delete = exports.remove = function(proto, key){
	// Delete the prototype
	delete proto.prototype[key];
};

/**
 * Require in all the default prototyping including in this lib.
 */
(addFiles = function(dir){
	// Read the lib directory
	fs.readdirSync(dir).filter(function(file){
		// Detect if the value is a directory
		if(fs.statSync(dir + '/' + file).isDirectory()){
			// Recursively add the files
			addFiles(dir + '/' + file);
		}
		// Add all javascript files
		return file.substr(-3) === '.js';
		// For each file we're accepting
	}).forEach(function(file){
		// Require in the file
		require(dir + '/' + file);
	});
})(__dirname + "/lib");