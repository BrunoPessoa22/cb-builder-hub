"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

type City = { name: string; state: string; lng: number; lat: number };

const CITIES: City[] = [
  { name: "Manaus",         state: "AM", lng: -60.025, lat: -3.10 },
  { name: "Fortaleza",      state: "CE", lng: -38.543, lat: -3.71 },
  { name: "Recife",         state: "PE", lng: -34.881, lat: -8.05 },
  { name: "Salvador",       state: "BA", lng: -38.510, lat: -12.97 },
  { name: "Brasília",       state: "DF", lng: -47.929, lat: -15.78 },
  { name: "Goiânia",        state: "GO", lng: -49.253, lat: -16.68 },
  { name: "Belo Horizonte", state: "MG", lng: -43.940, lat: -19.92 },
  { name: "Rio de Janeiro", state: "RJ", lng: -43.196, lat: -22.91 },
  { name: "São Paulo",      state: "SP", lng: -46.633, lat: -23.55 },
  { name: "Curitiba",       state: "PR", lng: -49.273, lat: -25.43 },
  { name: "Florianópolis",  state: "SC", lng: -48.548, lat: -27.59 },
  { name: "Porto Alegre",   state: "RS", lng: -51.230, lat: -30.03 },
];

const STYLE = {
  version: 8 as const,
  sources: {
    "carto-dark": {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [
    { id: "bg", type: "background" as const, paint: { "background-color": "#0A0A0A" } },
    { id: "carto", type: "raster" as const, source: "carto-dark", paint: { "raster-opacity": 0.85 } },
  ],
};

const BR_BOUNDS: [[number, number], [number, number]] = [
  [-78, -36],
  [-30, 8],
];

export default function BrazilMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE as any,
      bounds: BR_BOUNDS,
      fitBoundsOptions: { padding: 30 },
      maxBounds: [
        [-90, -45],
        [-20, 15],
      ],
      minZoom: 3,
      maxZoom: 8,
      attributionControl: false,
      cooperativeGestures: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchZoomRotate: true,
    });
    mapRef.current = map;

    map.touchZoomRotate.disableRotation();

    map.addControl(new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

    CITIES.forEach((c) => {
      const el = document.createElement("div");
      el.className = "cb-marker";
      el.innerHTML = `
        <span class="cb-marker__pulse"></span>
        <span class="cb-marker__dot"></span>
        <span class="cb-marker__label">${c.name} <em>/ ${c.state}</em></span>
      `;
      new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([c.lng, c.lat])
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] md:h-[560px] border border-[var(--line)]">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute top-3 left-3 z-10 mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-mute)] bg-[var(--bg)]/80 backdrop-blur px-2 py-1 border border-[var(--line)] pointer-events-none">
        12 cidades prioritárias
      </div>
    </div>
  );
}
