import json

def minify():
    with open('src/data/Market.json', 'r') as f:
        data = json.load(f)

    keys_to_keep = {'node_id', 'State', 'District', 'Market', 'total_arrivals', 'node_tier'}

    minified = []
    for item in data:
        minified.append({k: item[k] for k in keys_to_keep if k in item})

    with open('src/data/Market.json', 'w') as f:
        json.dump(minified, f, separators=(',', ':'))

if __name__ == '__main__':
    minify()
