var fs = require('fs'),
	Mocha = require("mocha");

var mocha = new Mocha({
	ui:"bdd",
	reporter:"spec"
});

// Files which need to be ignored
var avoided = [ ];

// Add the tests to the Mocha instance
(addFiles = function(dir){
	fs.readdirSync(dir).filter(function(file){
		if(!~avoided.indexOf(file)){
			if(fs.statSync(dir + '/' + file).isDirectory()){
				addFiles(dir + '/' + file);
			}
			return file.substr(-3) === '.js';
		}
	}).forEach(function(file){
		mocha.addFile(dir + '/' + file);
	});
})(__dirname + "/test");

// Run the files in Mocha
mocha.run(function(failures){
	process.exit(failures);
});
