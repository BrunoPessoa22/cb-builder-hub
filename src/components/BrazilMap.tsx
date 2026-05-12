"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { CITIES } from "@/lib/cities";

const STYLE_URL = "https://tiles.openfreemap.org/styles/dark";
const BR_GEOJSON_URL = "/br-states.json";

const BR_BOUNDS: [[number, number], [number, number]] = [
  [-74.5, -34],
  [-32, 6],
];

const ACCENT = "#FF5A1F";
const INK = "#0A0A0A";
const PAPER = "#FAFAFA";
const FG_MUTE = "#A1A1AA";

const cityFeatures = {
  type: "FeatureCollection" as const,
  features: CITIES.map((c) => ({
    type: "Feature" as const,
    geometry: { type: "Point" as const, coordinates: [c.lng, c.lat] },
    properties: { name: c.name, state: c.state, tier: c.tier },
  })),
};

export default function BrazilMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      bounds: BR_BOUNDS,
      fitBoundsOptions: { padding: { top: 32, bottom: 32, left: 12, right: 12 }, animate: false },
      maxBounds: [[-90, -42], [-22, 12]],
      minZoom: 2.8,
      maxZoom: 9,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchZoomRotate: true,
    });
    mapRef.current = map;

    map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      // Brazil silhouette overlay (precise outline regardless of basemap)
      map.addSource("br", { type: "geojson", data: BR_GEOJSON_URL });
      map.addLayer({
        id: "br-fill",
        type: "fill",
        source: "br",
        paint: { "fill-color": "#FFFFFF", "fill-opacity": 0.05 },
      });
      map.addLayer({
        id: "br-states-outline",
        type: "line",
        source: "br",
        paint: { "line-color": "rgba(255,255,255,0.08)", "line-width": 0.5 },
      });
      map.addLayer({
        id: "br-outline",
        type: "line",
        source: "br",
        paint: { "line-color": "rgba(255,255,255,0.32)", "line-width": 1.0 },
      });

      // Cities: native GL points with collision-aware labels
      map.addSource("cities", { type: "geojson", data: cityFeatures });

      // Halo / pulse ring (drawn under)
      map.addLayer({
        id: "city-halo",
        type: "circle",
        source: "cities",
        paint: {
          "circle-color": ACCENT,
          "circle-radius": ["case", ["==", ["get", "tier"], "capital"], 10, 7],
          "circle-opacity": 0.18,
          "circle-blur": 0.4,
        },
      });

      // Solid pin
      map.addLayer({
        id: "city-pin",
        type: "circle",
        source: "cities",
        paint: {
          "circle-color": ACCENT,
          "circle-radius": ["case", ["==", ["get", "tier"], "capital"], 5.5, 3.5],
          "circle-stroke-color": INK,
          "circle-stroke-width": 1.5,
        },
      });

      // Capital labels — always visible (with collision)
      map.addLayer({
        id: "city-label-capital",
        type: "symbol",
        source: "cities",
        filter: ["==", ["get", "tier"], "capital"],
        layout: {
          "text-field": ["concat", ["get", "name"], "  /  ", ["get", "state"]],
          "text-font": ["Noto Sans Regular"],
          "text-size": 11,
          "text-offset": [0, 1.2],
          "text-anchor": "top",
          "text-letter-spacing": 0.08,
          "text-transform": "uppercase",
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-padding": 4,
        },
        paint: {
          "text-color": PAPER,
          "text-halo-color": INK,
          "text-halo-width": 2,
          "text-halo-blur": 0.5,
        },
      });

      // Polo labels — only at higher zoom (less clutter)
      map.addLayer({
        id: "city-label-polo",
        type: "symbol",
        source: "cities",
        filter: ["==", ["get", "tier"], "polo"],
        minzoom: 5,
        layout: {
          "text-field": ["concat", ["get", "name"], "  /  ", ["get", "state"]],
          "text-font": ["Noto Sans Regular"],
          "text-size": 9.5,
          "text-offset": [0, 1.0],
          "text-anchor": "top",
          "text-letter-spacing": 0.08,
          "text-transform": "uppercase",
          "text-allow-overlap": false,
          "text-padding": 3,
        },
        paint: {
          "text-color": FG_MUTE,
          "text-halo-color": INK,
          "text-halo-width": 2,
        },
      });

      // Click-to-zoom on city pin
      map.on("click", "city-pin", (e) => {
        const feat = e.features?.[0];
        if (!feat) return;
        const [lng, lat] = (feat.geometry as any).coordinates;
        map.easeTo({ center: [lng, lat], zoom: Math.max(map.getZoom(), 6), duration: 700 });
      });
      map.on("mouseenter", "city-pin", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "city-pin", () => { map.getCanvas().style.cursor = ""; });
    });

    const onResize = () => {
      try {
        map.fitBounds(BR_BOUNDS, { padding: { top: 32, bottom: 32, left: 12, right: 12 }, animate: false });
      } catch {}
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const capitalCount = CITIES.filter((c) => c.tier === "capital").length;
  const poloCount = CITIES.filter((c) => c.tier === "polo").length;

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] border border-[var(--line)] overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-mute)] bg-[var(--bg)]/85 backdrop-blur px-2 py-1 border border-[var(--line)]">
          {capitalCount + poloCount} cidades prioritárias
        </div>
        <div className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--fg-mute)] bg-[var(--bg)]/85 backdrop-blur px-2 py-1 border border-[var(--line)] flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="block w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>capital</span>
          <span className="flex items-center gap-1.5"><span className="block w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>polo</span>
        </div>
      </div>
    </div>
  );
}
