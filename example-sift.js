const sift = require('sift');
const request = require('request');

const url = 'http://services.groupkt.com/state/get/USA/all';
request(url, function(error, response, body) {
  const usaStates = JSON.parse(body).RestResponse.result;
  const statesThatStartWithA = sift({
    name: { $regex: /^a/i }
  }, usaStates);
  console.log('\nStates That Start With A:');
  console.log(statesThatStartWithA);

  const statesThatDontHaveLargestCity = sift({
    largest_city: {
      $exists: false
    }
  }, usaStates);
  console.log("\nStates That Don't have Largest City Defined:");
  console.log(statesThatDontHaveLargestCity);
});
