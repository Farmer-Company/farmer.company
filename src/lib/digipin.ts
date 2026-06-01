const GRID = [
  ['F','C','9','8','Q','X'],
  ['J','3','2','7','D','H'],
  ['K','4','5','6','Z','W'],
  ['L','M','P','T','Y','A'],
  ['B','N','V','U','E','G'],
  ['R','S','1','0','I','O']
];
const SIZE = 6;
const BOUNDS = { min_lat: -90, max_lat: 90, min_lon: -180, max_lon: 180 };

export function encodeDigipin(lat: number, lon: number, length: number = 10): string {
    if (lat < BOUNDS.min_lat || lat > BOUNDS.max_lat) throw new Error("lat out of bounds");
    if (lon < BOUNDS.min_lon || lon > BOUNDS.max_lon) throw new Error("lon out of bounds");

    let min_lat = BOUNDS.min_lat, max_lat = BOUNDS.max_lat;
    let min_lon = BOUNDS.min_lon, max_lon = BOUNDS.max_lon;
    let lat_range = max_lat - min_lat;
    let lon_range = max_lon - min_lon;
    let pin = '';

    for (let i = 0; i < length; i++) {
        let row = SIZE - 1 - Math.floor((lat - min_lat) / lat_range * SIZE);
        let col = Math.floor((lon - min_lon) / lon_range * SIZE);
        
        row = Math.max(0, Math.min(row, SIZE - 1));
        col = Math.max(0, Math.min(col, SIZE - 1));
        
        pin += GRID[row][col];

        let lat_div = lat_range / SIZE;
        let lon_div = lon_range / SIZE;
        
        max_lat = min_lat + lat_div * (SIZE - row);
        min_lat = min_lat + lat_div * (SIZE - 1 - row);
        min_lon = min_lon + lon_div * col;
        max_lon = min_lon + lon_div;
        
        lat_range = max_lat - min_lat;
        lon_range = max_lon - min_lon;
    }
    return pin;
}
