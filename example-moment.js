const moment = require('moment');

console.log("No Formatting: " + moment().format());

const formatOptions = [
  'MMMM Do YYYY, h:mm:ss a',
  'dddd',
  'MMM Do YY'
];

formatOptions.forEach(function(option) {
  console.log(option + ": \n  " + moment().format(option));
});
