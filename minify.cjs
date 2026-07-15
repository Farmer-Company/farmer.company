const fs = require('fs');
const data = require('./src/data/Market.json');
const minified = data.map(item => ({
    node_id: item.node_id,
    State: item.State,
    District: item.District,
    Market: item.Market,
    total_arrivals: item.total_arrivals,
    node_tier: item.node_tier
}));
fs.writeFileSync('./src/data/Market.json', JSON.stringify(minified));
console.log('Done minifying');
