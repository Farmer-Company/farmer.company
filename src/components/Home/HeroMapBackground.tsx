import React, { useEffect, useMemo, useState } from 'react';
import type { StyleSpecification } from 'maplibre-gl';
import { Map, MapArc, MapMarker, MarkerContent, useMap } from '@/components/ui/map';

type NetworkNode = {
  id: string;
  type: 'farmer' | 'hub' | 'storage';
  coordinates: [number, number];
  priority: 1 | 2 | 3;
};

type RouteArc = {
  id: string;
  from: [number, number];
  to: [number, number];
};

const agricultureMapStyle: StyleSpecification = {
  version: 8,
  sources: {
    cartoOsm: {
      type: 'raster',
      tiles: ['https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: 'agriculture-background',
      type: 'background',
      paint: {
        'background-color': '#07100b',
      },
    },
    {
      id: 'carto-osm-raster',
      type: 'raster',
      source: 'cartoOsm',
      paint: {
        'raster-opacity': 0.58,
        'raster-saturation': -0.22,
        'raster-contrast': -0.18,
        'raster-brightness-min': 0.04,
        'raster-brightness-max': 0.74,
        'raster-hue-rotate': 22,
      },
    },
  ],
};

const networkNodes: NetworkNode[] = [
  { id: 'vellore-farmers', type: 'farmer', coordinates: [79.13, 12.92], priority: 1 },
  { id: 'ambur-hub', type: 'hub', coordinates: [78.7, 12.78], priority: 1 },
  { id: 'chennai-storage', type: 'storage', coordinates: [80.18, 13.02], priority: 1 },
  { id: 'coimbatore-farmers', type: 'farmer', coordinates: [76.96, 11.01], priority: 2 },
  { id: 'bangalore-hub', type: 'hub', coordinates: [77.58, 12.97], priority: 2 },
  { id: 'hyderabad-storage', type: 'storage', coordinates: [78.48, 17.38], priority: 2 },
  { id: 'nashik-farmers', type: 'farmer', coordinates: [73.79, 20.02], priority: 2 },
  { id: 'pune-hub', type: 'hub', coordinates: [73.86, 18.52], priority: 2 },
  { id: 'ahmedabad-storage', type: 'storage', coordinates: [72.57, 23.02], priority: 2 },
  { id: 'indore-farmers', type: 'farmer', coordinates: [75.86, 22.72], priority: 3 },
  { id: 'nagpur-hub', type: 'hub', coordinates: [79.08, 21.15], priority: 3 },
  { id: 'jaipur-storage', type: 'storage', coordinates: [75.79, 26.91], priority: 3 },
  { id: 'punjab-farmers', type: 'farmer', coordinates: [75.34, 30.9], priority: 3 },
  { id: 'lucknow-hub', type: 'hub', coordinates: [80.95, 26.84], priority: 3 },
  { id: 'patna-storage', type: 'storage', coordinates: [85.14, 25.59], priority: 3 },
  { id: 'guwahati-farmers', type: 'farmer', coordinates: [91.74, 26.14], priority: 3 },
];

const routeArcs: RouteArc[] = [
  { id: 'vellore-ambur', from: [79.13, 12.92], to: [78.7, 12.78] },
  { id: 'ambur-chennai', from: [78.7, 12.78], to: [80.18, 13.02] },
  { id: 'coimbatore-bangalore', from: [76.96, 11.01], to: [77.58, 12.97] },
  { id: 'bangalore-hyderabad', from: [77.58, 12.97], to: [78.48, 17.38] },
  { id: 'nashik-pune', from: [73.79, 20.02], to: [73.86, 18.52] },
  { id: 'pune-ahmedabad', from: [73.86, 18.52], to: [72.57, 23.02] },
  { id: 'indore-nagpur', from: [75.86, 22.72], to: [79.08, 21.15] },
  { id: 'nagpur-lucknow', from: [79.08, 21.15], to: [80.95, 26.84] },
  { id: 'punjab-jaipur', from: [75.34, 30.9], to: [75.79, 26.91] },
  { id: 'lucknow-patna', from: [80.95, 26.84], to: [85.14, 25.59] },
  { id: 'patna-guwahati', from: [85.14, 25.59], to: [91.74, 26.14] },
];

const desktopViewport = {
  center: [79.2, 20.8] as [number, number],
  zoom: 4.35,
  bearing: -6,
  pitch: 20,
};

const mobileViewport = {
  center: [78.9, 17.2] as [number, number],
  zoom: 4.15,
  bearing: -4,
  pitch: 10,
};

function useIsMobileMap() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function HeroMapCamera({ isMobile }: { isMobile: boolean }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const target = isMobile
      ? { center: [79.5, 17.6] as [number, number], zoom: 4.25, bearing: 0, pitch: 8 }
      : { center: [79.7, 21.2] as [number, number], zoom: 4.5, bearing: -2, pitch: 18 };

    const timeout = window.setTimeout(() => {
      map.easeTo({
        ...target,
        duration: 8000,
        easing: (t) => t * (2 - t),
        essential: false,
      });
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [isLoaded, isMobile, map]);

  return null;
}

function NetworkMarker({ node }: { node: NetworkNode }) {
  return (
    <MapMarker longitude={node.coordinates[0]} latitude={node.coordinates[1]}>
      <MarkerContent>
        <span className={`hero-map-node hero-map-node--${node.type}`} aria-hidden="true" />
      </MarkerContent>
    </MapMarker>
  );
}

export default function HeroMapBackground() {
  const isMobile = useIsMobileMap();
  const viewport = isMobile ? mobileViewport : desktopViewport;

  const visibleNodes = useMemo(
    () => networkNodes.filter((node) => !isMobile || node.priority <= 2),
    [isMobile],
  );

  const visibleRoutes = useMemo(
    () => routeArcs.filter((route) => {
      if (!isMobile) return true;
      const mobileNodeIds = new Set(visibleNodes.map((node) => node.id));
      const mobileCoordinates = new Set(
        networkNodes
          .filter((node) => mobileNodeIds.has(node.id))
          .map((node) => node.coordinates.join(',')),
      );

      return mobileCoordinates.has(route.from.join(',')) && mobileCoordinates.has(route.to.join(','));
    }),
    [isMobile, visibleNodes],
  );

  return (
    <div className="hero-map-live absolute inset-0 z-0" aria-hidden="true">
      <Map
        className="h-full w-full"
        theme="dark"
        styles={{ dark: agricultureMapStyle, light: agricultureMapStyle }}
        center={viewport.center}
        zoom={viewport.zoom}
        bearing={viewport.bearing}
        pitch={viewport.pitch}
        minZoom={3.4}
        maxZoom={7}
        interactive={false}
      >
        <HeroMapCamera isMobile={isMobile} />
        <MapArc
          id="farmer-company-hero-routes"
          data={visibleRoutes}
          curvature={0.12}
          samples={32}
          interactive={false}
          paint={{
            'line-color': '#4ADE80',
            'line-width': isMobile ? 1 : 1.35,
            'line-opacity': isMobile ? 0.22 : 0.3,
          }}
        />
        {visibleNodes.map((node) => (
          <NetworkMarker key={node.id} node={node} />
        ))}
      </Map>
    </div>
  );
}
