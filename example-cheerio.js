const request = require('request');
const cheerio = require('cheerio');

request('http://www.example.com/', function(error, response, body) {
  $ = cheerio.load(body);
  // print the contents of the div on the page
  console.log($('div').text());

  // print the href of the link that appears on the page
  console.log($('a').prop('href'));

  // print the contents of the (2) paragraph elements on the page
  console.log($('p').text());

  // print the first paragraph element on the page
  console.log($('p').first().text());
});
