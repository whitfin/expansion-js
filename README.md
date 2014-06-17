ExpansionJS [![Build Status](https://travis-ci.org/iwhitfield/expansion-js.svg?branch=master)](https://travis-ci.org/iwhitfield/expansion-js) [![Coverage Status](https://coveralls.io/repos/iwhitfield/expansion-js/badge.png?branch=master)](https://coveralls.io/r/iwhitfield/expansion-js?branch=master)
===========

- [Setup](#setup)
- [Compatibility](#compatibility)
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

## Compatibility ##

Support for CI builds against Node v0.6.x have been removed due to the need for code coverage tracking, which requires >= 0.8.x. The code, without the tests, should continue to work on Node v0.6.x. In terms of platforms, I see no reason why this wouldn't work perfectly across Windows, Mac OS X and Linux systems - however, Windows users will be unable to run the coverage generation, and will only be able to run tests via the `node test.js spec` command.

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

#### Array.insert(index, entry...) ####

Insert an arbitrary number of elements at the given index in an array. If the index is out of bounds on either side of the array, the index will default to the nearest index it can find. This method is destructive by operating on the current instance of the array, but also returns to allow chaining.

```
var arr1 = [ 1 ];

arr1.insert(1, 5);          // [ 1, 5 ]
arr1.insert(1, 2, 3, 4);    // [ 1, 2, 3, 4, 5 ]
arr1.insert(-1, 0);         // [ 0, 1, 2, 3, 4, 5 ]
arr1.insert(99, 6);         // [ 0, 1, 2, 3, 4, 5, 6 ]
```

#### Array.intersect(array) ####

Calculate and return a sorted intersection of two arrays. Uses Object.equals() to determine strict equality between the crossovers. This method can be chained to intersect multiple arrays, whilst keeping the code as efficient as possible.

```
var arr1 = [ 1, 2, 3 ],
    arr2 = [ 1, 3, 5 ],
    arr3 = [ 1, 4, 7 ];

arr1.intersect(arr2);                   // [ 1, 3 ]
arr1.intersect(arr2).intersect(arr3);   // [ 1 ]
```

#### Array.isEmpty() ####

Exactly what it says, returns a boolean based on the population of the array. True if empty, false is elements exist.

```
[ ].isEmpty();  // true
[1].isEmpty();  // false
```

#### Array.merge([index][, arrays...][, filter] ####

An extension on the Array.concat() method to allow insertion at a given index, with the option of filtering duplications.

```
var arr1 = [ 1, 2, 3 ],
    arr2 = [ 4, 5, 6 ],
    arr3 = [ 1, 3, 5 ];

arr1.merge(arr2);           // [ 1, 2, 3, 4, 5, 6 ]
arr1.merge(1, arr2);        // [ 1, 4, 5, 6, 2, 3 ]
arr1.merge(arr2, arr3);     // [ 1, 2, 3, 4, 5, 6, 1, 3, 5 ]
arr1.merge(arr3, true);     // [ 1, 2, 3, 5 ]
```

#### Array.normalize(normalizer[, sensitive]) ####

Simple method to provide an array of values for the current array to conform to. Retains only the matching values between the two arrays. Case sensitivity is controlled by passing true/false as the second parameter (defaults to non-case sensitive).

```
var arr1 = [ "test1", "test2", "test3" ],
    arr2 = [ "test1", "test3" ];
    
arr1.normalize(arr2); // [ "test1", "test3" ];
```

#### Array.remove(index[, amount, safe]) ####

Handling to remove a given index from an array, or the ability to remove X elements at a given index. Also contains support for removing from multiple indexes, and multiple amounts. This method is destructive by default, however a third parameter of `true` can be passed to make this method non-destructive.

```
var arr = [ 1, 2, 3, 4, 5 ];

arr.remove(1);                  // [ 1, 3, 4, 5 ]
arr.remove(1, 2);               // [ 1, 4, 5 ]
arr.remove(1, 1, true);         // [ 1, 2, 3, 4, 5 ]
arr.remove([1, 3]);             // [ 1, 3, 5 ]
arr.remove([1, 3], 2);          // [ 1 ]
arr.remove([1, 3], [1, 2]);     // [ 1, 3 ]
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

#### Array.unique() ####

Returns a version of the current array without any duplicated items. Items will be preserved in the order they first appear.

```
var arr = [ 1, 2, 3, 4, 5, 5, 3, 2 ]

arr.unique();   // [ 1, 2, 3, 4, 5 ]
```

### Number ###

#### Number.abbreviate([decimal) ####

Returns a readable formatting of the number as a string for use with displayed outputs. Can take a number of decimal places to round to when shortening.

```
1000.abbreviate();          // 1K
1000000.abbreviate();       // 1M
1000000000.abbreviate();    // 1B
1000000000000.abbreviate(); // 1T

1111.abbreviate();          // 1.1K
1111.abbreviate(2);         // 1.11K
1199.abbreviate(2);         // 1.2K
```

#### Number.comma() ####

Returns a number as a string with a comma (",") placed every 3 digits, as standard.

```
1234567890.comma(); // 1,234,567,890
```

#### Number.inRange(min, max[, exclusive]) ####

Checks to see whether the current value of the number is within a given range. Takes two parameters, `min` and `max`. You can supply null for either of these parameters to have a boundless range. Inclusive by default, however a third parameter can be passed to make the bounds exclusive.

```
500.inRange(1, 1000);           // true
1000.inRange(1, 1000);          // true
1001.inRange(1, 1000);          // false
1000.inRange(1, 1000, true);    // false

-50.inRange(null, 0);           // true
999.inRange(0, null);           // true
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

#### String.contains(str) ####

Checks if the current string contains a given substring, and returns true if this is the case. Handles undefined/null/empty strings appropriately. Case-sensitive.

```
var str = "this is a test string.";

str.contains("this");   // true
str.contains("A");      // false
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
$ node test.js spec
```

Currently, `npm test` is reserved for the use of Travis only. If you wish to run a specific test, just invoke the test via Mocha.

```
$ mocha -R spec array.js
```

You can also generate a coverage file via Mocha using the below command:

```
$ npm run-script coverage && open-coverage.html
```

## Issues ##

If you find any issues inside this module, feel free to open an issue [here](https://github.com/iwhitfield/expansion-js/issues "ExpansionJS Issues").