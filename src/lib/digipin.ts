const GRID = [
  ['F', 'C', '9', '8', 'Q', 'X'],
  ['J', '3', '2', '7', 'D', 'H'],
  ['K', '4', '5', '6', 'Z', 'W'],
  ['L', 'M', 'P', 'T', 'Y', 'A'],
  ['B', 'N', 'V', 'U', 'E', 'G'],
  ['R', 'S', '1', '0', 'I', 'O'],
];

const SIZE = 6;
const BOUNDS = { minLat: -90, maxLat: 90, minLon: -180, maxLon: 180 };
const METERS_PER_DEGREE = 111_320;

export type DigipinLevel = {
  length: number;
  label: string;
  useCase: string;
};

export const DIGIPIN_LEVELS: DigipinLevel[] = [
  { length: 4, label: 'District', useCase: 'District discovery and route planning' },
  { length: 5, label: 'Cluster', useCase: 'Village, market, and procurement cluster matching' },
  { length: 6, label: 'Village', useCase: 'Farm gate, warehouse, and serviceability checks' },
  { length: 7, label: 'Block', useCase: 'Pickup point and cold-chain dispatch planning' },
  { length: 8, label: 'Plot', useCase: 'Farm plot, store, loading bay, and delivery handoff' },
  { length: 9, label: 'Dock', useCase: 'High-confidence dock, pallet, or inspection position' },
  { length: 10, label: 'Point', useCase: 'Precision verification when GPS accuracy is excellent' },
];

export function encodeDigipin(lat: number, lon: number, length: number = 10): string {
  if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat) throw new Error('lat out of bounds');
  if (lon < BOUNDS.minLon || lon > BOUNDS.maxLon) throw new Error('lon out of bounds');

  let minLat = BOUNDS.minLat;
  let maxLat = BOUNDS.maxLat;
  let minLon = BOUNDS.minLon;
  let maxLon = BOUNDS.maxLon;
  let latRange = maxLat - minLat;
  let lonRange = maxLon - minLon;
  let pin = '';

  for (let i = 0; i < length; i += 1) {
    let row = SIZE - 1 - Math.floor(((lat - minLat) / latRange) * SIZE);
    let col = Math.floor(((lon - minLon) / lonRange) * SIZE);

    row = Math.max(0, Math.min(row, SIZE - 1));
    col = Math.max(0, Math.min(col, SIZE - 1));

    pin += GRID[row][col];

    const latDiv = latRange / SIZE;
    const lonDiv = lonRange / SIZE;

    maxLat = minLat + latDiv * (SIZE - row);
    minLat = minLat + latDiv * (SIZE - 1 - row);
    minLon = minLon + lonDiv * col;
    maxLon = minLon + lonDiv;

    latRange = maxLat - minLat;
    lonRange = maxLon - minLon;
  }

  return pin;
}

export function formatDigipin(pin: string): string {
  return pin.match(/.{1,4}/g)?.join('-') ?? pin;
}

export function estimateDigipinCellMeters(length: number, lat: number) {
  const latDegrees = (BOUNDS.maxLat - BOUNDS.minLat) / SIZE ** length;
  const lonDegrees = (BOUNDS.maxLon - BOUNDS.minLon) / SIZE ** length;
  const latMeters = latDegrees * METERS_PER_DEGREE;
  const lonMeters = lonDegrees * METERS_PER_DEGREE * Math.cos((lat * Math.PI) / 180);

  return {
    heightMeters: Math.max(0, latMeters),
    widthMeters: Math.max(0, Math.abs(lonMeters)),
  };
}

export function formatCellSize(length: number, lat: number): string {
  const { widthMeters, heightMeters } = estimateDigipinCellMeters(length, lat);
  const format = (meters: number) => {
    if (meters >= 1000) return `${(meters / 1000).toFixed(meters >= 10_000 ? 0 : 1)} km`;
    if (meters >= 10) return `${meters.toFixed(0)} m`;
    if (meters >= 1) return `${meters.toFixed(1)} m`;
    return `${(meters * 100).toFixed(0)} cm`;
  };

  return `${format(widthMeters)} x ${format(heightMeters)}`;
}

export function getRecommendedDigipinLevel(accuracyMeters: number): DigipinLevel {
  if (accuracyMeters <= 2) return DIGIPIN_LEVELS[6];
  if (accuracyMeters <= 8) return DIGIPIN_LEVELS[5];
  if (accuracyMeters <= 30) return DIGIPIN_LEVELS[4];
  if (accuracyMeters <= 120) return DIGIPIN_LEVELS[3];
  if (accuracyMeters <= 600) return DIGIPIN_LEVELS[2];
  if (accuracyMeters <= 3500) return DIGIPIN_LEVELS[1];
  return DIGIPIN_LEVELS[0];
}

export function buildDigipinRepresentations(lat: number, lon: number) {
  return DIGIPIN_LEVELS.map((level) => {
    const raw = encodeDigipin(lat, lon, level.length);
    return {
      ...level,
      raw,
      formatted: formatDigipin(raw),
      cellSize: formatCellSize(level.length, lat),
    };
  });
}
