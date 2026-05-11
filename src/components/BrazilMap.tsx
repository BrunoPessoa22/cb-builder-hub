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
      maxBounds: [
        [-90, -42],
        [-22, 12],
      ],
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
      map.addSource("br", { type: "geojson", data: BR_GEOJSON_URL });
      map.addLayer({
        id: "br-fill",
        type: "fill",
        source: "br",
        paint: {
          "fill-color": "#FFFFFF",
          "fill-opacity": 0.06,
        },
      });
      map.addLayer({
        id: "br-outline",
        type: "line",
        source: "br",
        paint: {
          "line-color": "rgba(255,255,255,0.35)",
          "line-width": 1.2,
        },
      });
      map.addLayer({
        id: "br-states-outline",
        type: "line",
        source: "br",
        paint: {
          "line-color": "rgba(255,255,255,0.10)",
          "line-width": 0.6,
        },
      });
    });

    const sorted = [...CITIES].sort((a, b) => (a.tier === "capital" ? 1 : -1));
    sorted.forEach((c) => {
      const el = document.createElement("div");
      el.className = `cb-marker cb-marker--${c.tier}`;
      el.innerHTML = `
        <span class="cb-marker__pulse"></span>
        <span class="cb-marker__dot"></span>
        <span class="cb-marker__label">${c.name} <em>/ ${c.state}</em></span>
      `;
      new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([c.lng, c.lat])
        .addTo(map);
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

  const capitalCount = CITIES.filter(c => c.tier === "capital").length;
  const poloCount = CITIES.filter(c => c.tier === "polo").length;

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] border border-[var(--line)]">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-mute)] bg-[var(--bg)]/85 backdrop-blur px-2 py-1 border border-[var(--line)]">
          {capitalCount + poloCount} cidades prioritárias
        </div>
        <div className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--fg-mute)] bg-[var(--bg)]/85 backdrop-blur px-2 py-1 border border-[var(--line)] flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="block w-2.5 h-2.5 bg-[var(--accent)]"></span>capital</span>
          <span className="flex items-center gap-1.5"><span className="block w-1.5 h-1.5 bg-[var(--accent)]"></span>polo</span>
        </div>
      </div>
    </div>
  );
}
