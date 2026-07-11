const fs = require('fs');
const data = require('./src/data/Market.json');

const fields = [
  'node_id',
  'State',
  'District',
  'Market',
  'total_arrivals',
  'node_tier'
];

const mapped = data.map(item => {
  const result = {};
  for (const field of fields) {
    result[field] = item[field];
  }
  return result;
});

fs.writeFileSync('./src/data/Market.json', JSON.stringify(mapped));
console.log('Minified and stripped Market.json successfully.');
