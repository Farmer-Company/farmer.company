import json

with open('src/data/Market.json', 'r') as f:
    data = json.load(f)

minified_data = []
for item in data:
    minified_data.append({
        "node_id": item.get("node_id"),
        "State": item.get("State"),
        "District": item.get("District"),
        "Market": item.get("Market"),
        "total_arrivals": item.get("total_arrivals"),
        "node_tier": item.get("node_tier")
    })

with open('src/data/Market.json', 'w') as f:
    json.dump(minified_data, f, separators=(',', ':'))
