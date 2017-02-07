const fs = require('fs');
const es = require('event-stream');
const through2 = require('through2');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if(!inputFile || !outputFile) {
  console.log("Proper Usage: node example-stream.js <input> <output>");
  process.exit();
}

es.pipeline(
  fs.createReadStream(inputFile),
  es.split(),
  through2.obj(function(chunk, enc, callback) {
    if(chunk.length > 0) {
      this.push({length: chunk.length});
      this.push({uppercase: chunk.toUpperCase()});
    }
    callback();
  }),
  es.stringify(),
  fs.createWriteStream(outputFile)
);
