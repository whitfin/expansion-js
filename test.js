var fs = require('fs'),
    Mocha = require("mocha");

// Code coverage
require("blanket")({
    "pattern":[
        "lib/array.js",
        "lib/number.js",
        "lib/object.js",
        "lib/string.js"
    ]
});

// Mocha instance
var mocha = new Mocha({
    ui:"bdd",
    reporter:process.argv[2] || "mocha-lcov-reporter"
});

// Add the tests to the Mocha instance
fs.readdirSync(__dirname + "/test").filter(function(file){
    return file.substr(-3) === ".js";
}).forEach(function(file){
    mocha.addFile(__dirname + "/test/" + file);
});

// Run the files in Mocha
mocha.run(function(failures){
    process.exit(failures);
});
