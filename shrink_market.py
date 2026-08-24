import json
import sys

filepath = 'src/data/Market.json'

try:
    with open(filepath, 'r') as f:
        data = json.load(f)

    shrunk_data = []
    for item in data:
        shrunk_item = {
            "node_id": item.get("node_id"),
            "State": item.get("State"),
            "District": item.get("District"),
            "Market": item.get("Market"),
            "total_arrivals": item.get("total_arrivals"),
            "node_tier": item.get("node_tier"),
        }
        shrunk_data.append(shrunk_item)

    with open(filepath, 'w') as f:
        json.dump(shrunk_data, f, separators=(',', ':'))
    print("Market.json shrunk successfully.")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
