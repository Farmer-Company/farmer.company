const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'Market.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(rawData);

const stripped = data.map(item => ({
    node_id: item.node_id,
    State: item.State,
    District: item.District,
    Market: item.Market,
    total_arrivals: item.total_arrivals,
    node_tier: item.node_tier
}));

fs.writeFileSync(filePath, JSON.stringify(stripped));
console.log('Successfully stripped Market.json');
