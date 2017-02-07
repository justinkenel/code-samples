const fs = require('fs');
const es = require('event-stream');
const through2 = require('through2');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if(!inputFile || !outputFile) {
  console.log("Proper Usage: node example-stream.js <input> <output>");
  process.exit();
}

(function() {
  let count = 0;
  fs.createReadStream(inputFile)
    .pipe(es.split())
    .pipe(through2.obj(function(chunk, enc, callback) {
      count ++;
      if(chunk.length > 0) {
        this.push({length: chunk.length});
        this.push({uppercase: chunk.toUpperCase()});
      }
      callback();
    }))
    .pipe(es.stringify())
    .pipe(fs.createWriteStream(outputFile).on('close', function() {
      console.log(count + ' records processed, results written to: ' + outputFile);
    }));
})();
