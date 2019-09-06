// filter out all data that has not contributors
const fs = require('fs');

const INCLUDE_CONTRIBUTORS = [
  'Nike',
  'adidas',

]

const oarFacilitiesContributors = require('../src/data/oar-facilities-with-contributors-2019-09-05.json');

const filtered = oarFacilitiesContributors.filter(f => (INCLUDE_CONTRIBUTORS.some(searchC => (f.contributors.indexOf(searchC) !== -1))))
console.log(oarFacilitiesContributors.length - filtered.length, 'filtered')

fs.writeFile(__dirname+"/../src/data/oar-facilities-contributors-filtered.json", JSON.stringify(filtered), function(err) {
  if(err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
