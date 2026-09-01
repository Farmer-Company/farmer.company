const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'src/data/Market.json');
const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const minified = data.map(item => ({
  node_id: item.node_id,
  State: item.State,
  District: item.District,
  Market: item.Market,
  total_arrivals: item.total_arrivals,
  node_tier: item.node_tier,
}));

fs.writeFileSync(inputPath, JSON.stringify(minified));
console.log(`Minified ${data.length} records in Market.json`);
