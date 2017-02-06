const async = require('async');

const array = [10, 5, 12, 20];

async.filter(array, function(number, callback) {
  callback(null, number % 2 == 0);
}, function(err, results) {
  console.log('Evens: ' + results);
});

async.reduce(array, 0, function(sum, number, callback) {
  callback(null, number + sum);
}, function(err, sum) {
  console.log("The sum is: " + sum);
});

// Running this shows that the results callback is called _before_
// the last "After Callback console.log" is called.
async.map(array, function(number, callback) {
  console.log("Before Callback: " + number);
  callback(null, number * 2);
  console.log("After Callback: " + number);
}, function(err, results) {
  console.log("Doubles: " + results);
});

// However, running the same thing with 'process.nextTick' thrown in
// causes it to run in the order one would expect
async.map(array, function(number, callback) {
  console.log("Before Callback: " + number);
  process.nextTick(function() { callback(null, number * 2); });
  console.log("After Callback: " + number);
}, function(err, results) {
  console.log("Doubles: " + results);
});

const fs = require('fs');

async.parallel({
  one: function(callback) {
    fs.readFile('async-files/one', function(err, buffer) {
      callback(null, buffer.toString());
    });
  },
  two: function(callback) {
    fs.readFile('async-files/two', function(err, buffer) {
      callback(null, buffer.toString());
    });
  },
  three: function(callback) {
    fs.readFile('async-files/three', function(err, buffer) {
      callback(null, buffer.toString());
    });
  }
}, function(err, results) {
  console.log(results);
});
