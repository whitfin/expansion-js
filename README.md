ExpansionJS
===========

- [Setup](#setup)
- [Example Usage](#usage)
- [Contained Prototypes](#contained-prototypes)
    - [Array](#array)
    - [Number](#number)
    - [Object](#object)
    - [String](#string)
- [Tests](#tests)
- [Issues](#issues)

ExpansionJS is a simple library which adds prototype values to the native JavaScript object to enhance their functionality. The main use is as a util/one-require-needed style library which attaches new functionality to the objects for the remainder of program execution. This library started as a personal project, as I've found myself needing most of these functions often.

## Setup ##

Install from this repo via npm:

```
$ npm install iwhitfield/expansion-js
```

The moment you require in the library, the prototyping takes place - so, it's as simple as having this somewhere in your code:

```
require('expansion');
```

This is subject to change depending on the path this project takes. If you wish to access the creation methods of ExtensionJS, you can store the requirement.

```
var expand = require('expansion');
```

## Usage ##

ExpansionJS provides two simple utility methods, to create and remove Object prototypes. These functions are just an alternate way to prototype with a slightly nicer format (in my opinion).

### expand.add(Object, key, value[, properties]) ###

`add` is a simple method to add a value to an Object prototype, simply invoke as below:

```
expand.add(Object, 'pretty', function(){
  return JSON.stringify(this, null, 4);
});
```

The above would give you an example to an `object.pretty()` function which retuns a stringified version of your object. Say I wanted to mark this function as non-enumerable, I could just add a properties object like so:

```
expand.add(Object, 'pretty', function(){
    return JSON.stringify(this, null, 4);
}, {
    enumerable:false
});
```

`expand.create()` is an alias for `expand.add()`.

### expand.delete(Object, key) ###

`delete` is a simple method to remove a prototype from an Object. To invoke this on the `pretty()` method above:

```
expand.delete(Object, 'pretty');
```

`expand.remove()` is an alias for `expand.delete()`.

## Contained Prototypes ##

There are several prototypes included in this library already, and will have more added as they become useful. Here are the currently included functions.

### Array ###

#### Array.normalize(normalizer[, sensitive]) ####

Simple method to provide an array of values for the current array to conform to. Retains only the matching values between the two arrays. Case sensitivity is controlled by passing true/false as the second parameter (defaults to non-case sensitive).

```
var arr1 = [ "test1", "test2", "test3" ],
    arr2 = [ "test1", "test3" ];
    
arr1.normalize(arr2); // [ "test1", "test3" ];
```

#### Array.toLowerCase() ####

Simply returns an array with all string values converted to lower case via `String#toLowerCase()`.

```
var arr = [ "TEST1", "TEST2", "TEST3" ];

arr.toLowerCase(); // [ "test1", "test2", "test3" ];
```

#### Array.toUpperCase() ####

Companion method to the above, except using `String#toUpperCase()`.

```
var arr = [ "test1", "test2", "test3" ];

arr.toUpperCase(); // [ "TEST1", "TEST2", "TEST3" ];
```

### Number ###

#### Number.comma() ####

Returns a number as a string with a comma (",") placed every 3 digits, as standard.

```
1234567890.comma(); // 1,234,567,890
```

### Object ###

#### Object.clone() ####

Returns a clone of the current object. Not to be confused with a reference. Properly handles Arrays, Dates, Functions, Objects, and null/undefined values.

```
var obj1 = { a:{ b:{ c:5 } } },
    obj2 = obj1.clone();

obj2.a.b.d = 10;

obj1.a.b.c;     // 5
obj2.a.b.c;     // 10
```

The clone() method should also be able to handle user-created objects.

```
function Car(desc){
    this.desc = desc;
    this.color = "red";
    this.getInfo = function getInfo() {
        return 'A ' + this.color + ' ' + this.desc + '.';
    };
}

var car1 = new Car('honda'),
    car2 = car1.clone();

car1;   // Car {desc: "honda", color: "red", getInfo: function}
car2;   // Car {desc: "honda", color: "red", getInfo: function}

car2.desc = 'toyota';

car1;   // Car {desc: "honda", color: "red", getInfo: function}
car2;   // Car {desc: "toyota", color: "red", getInfo: function}
```

#### Object.equals(object[, equality]) ####

Compares against an object and returns a boolean if the two are identical. The `equality` parameter dictates if we should use `==` over `===` for comparisons.

```
var obj = { key1:1, key2:2, key3:{ key4:4 } };

obj.equals({ key2:"2", key1:1, key3:{ key4:4 } });         // false
obj.equals({ key2:"2", key1:1, key3:{ key4:4 } }, true);   // true
```

#### Object.instance() ####

Returns the type the object belongs to. This is effectively a way to print `instanceof`. Can also be used instead of `typeof(obj)`.

```
var arr = [],
    obj = {};

arr.instance();     // "Array"
obj.instance();     // "Object"
```

#### Object.pretty([indent]) ####

Stringifies a number with a given indent. If no indent is given, it defaults to 4 spaces.

```
var obj = {"key1":1,"key2":2,"key3":3};

obj.pretty();

/*
{
    "key1": 1,
    "key2": 2,
    "key3": 3
}
*/
```

#### Object.sort([modify, topLevel]) ####

Sorts the keys of an Object alphabetically, useful when comparing two printed objects. Takes a boolean parameter to specify whether we want to modify the current object, or return a sorted version of the object (default).

The `topLevel` parameter allows you to pass `true` in the event you only wish to sort top-level keys, otherwise keys are sorted recursively.

```
var obj = {
    "b":2,
    "a":1,
    "d":4,
    "c":3
}

obj.sort();

/*
{
    "a":1,
    "b":2,
    "c":3,
    "d":4
}
*/
```

### String ###

#### String.capitalize([pattern]) ####

Allows string capitalization, either based on the first letter (default), or a given capitalization pattern. Currently, there are two patterns permitted:

`a, all`:       every word in the string is capitalized.
`s, sentence`:  every first word in a sentence is capitalized.

```
var str = "this is a test string. this is a second test string.";

str.capitalize();       // "This is a test string. this is a second test string.";
str.capitalize('a');    // "This Is A Test String. This Is A Second Test String.";
str.capitalize('s');    // "This is a test string. This is a second test string.";
```

#### String.endsWith(str) ####

Checks if the current string ends with a given string, returns true if this is the case. Handles undefined/null/empty strings appropriately. Case-sensitive.

```
var str = "this is a test string.";

str.endsWith("string."); // true
str.endsWith("String."); // true
str.endsWith("test.");   // false
```

#### String.startsWith(str) ####

Checks if the current string starts with a given string, returns true if this is the case. Handles undefined/null/empty strings appropriately. Case-sensitive.

```
var str = "this is a test string.";

str.endsWith("this");   // true
str.endsWith("This");   // false
str.endsWith("test");   // false
```

## Tests ##

Each lib-contained prototype contains a test, along with the utility methods. You can invoke all tests via a simple command:

```
$ node test.js
```

or, if you prefer:

```
$ npm test
```

If you wish to run a specific test, just invoke the test via Mocha.

```
$ mocha -R spec array.js
```

## Issues ##

If you find any issues inside this module, feel free to open an issue [here](https://github.com/iwhitfield/expansion-js/issues "ExpansionJS Issues").