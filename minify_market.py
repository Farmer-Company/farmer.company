import json

input_file = 'src/data/Market.json'
output_file = 'src/data/Market.json'

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

minified_data = []
for item in data:
    minified_item = {
        'node_id': item.get('node_id'),
        'State': item.get('State'),
        'District': item.get('District'),
        'Market': item.get('Market'),
        'total_arrivals': item.get('total_arrivals'),
        'node_tier': item.get('node_tier')
    }
    minified_data.append(minified_item)

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(minified_data, f, separators=(',', ':'))

print(f"Successfully minified {len(minified_data)} records in {output_file}")
