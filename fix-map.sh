sed -i 's/typeof map.setProjection === '\''function'\''/\'\''setProjection'\'' in map/g' components/ui/map.tsx
sed -i 's/map.setProjection(projection);/ \/\/ @ts-expect-error maplibre v4 missing types for setProjection\n          map.setProjection(projection);/g' components/ui/map.tsx
