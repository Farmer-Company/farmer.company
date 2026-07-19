const fs = require('fs');

const raw = fs.readFileSync('src/data/Market.json', 'utf8');
const data = JSON.parse(raw);

const optimized = data.map(m => ({
  node_id: m.node_id,
  State: m.State,
  District: m.District,
  Market: m.Market,
  total_arrivals: m.total_arrivals,
  node_tier: m.node_tier
}));

fs.writeFileSync('src/data/Market.json', JSON.stringify(optimized));
console.log('Optimized Market.json. Length:', optimized.length);
