const fs = require('fs');
const path = require('path');

const marketFilePath = path.join(__dirname, 'src', 'data', 'Market.json');
const rawData = fs.readFileSync(marketFilePath, 'utf-8');
const markets = JSON.parse(rawData);

const minifiedMarkets = markets.map(m => ({
  node_id: m.node_id,
  State: m.State,
  District: m.District,
  Market: m.Market,
  total_arrivals: m.total_arrivals,
  node_tier: m.node_tier
}));

fs.writeFileSync(marketFilePath, JSON.stringify(minifiedMarkets));
console.log('Minified Market.json');
