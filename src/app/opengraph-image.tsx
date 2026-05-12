import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cultura Builder Hub — Seja o builder de IA da sua cidade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          color: "#FAFAFA",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#FF5A1F",
            }}
          >
            <div style={{ display: "flex", width: 28, height: 2, background: "#FF5A1F" }} />
            <div style={{ display: "flex" }}>Programa Builders Locais · Beta</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "#FAFAFA",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ display: "flex" }}>Seja o</div>
              <div
                style={{
                  display: "flex",
                  background: "#FF5A1F",
                  color: "#0A0A0A",
                  padding: "0 18px 6px",
                }}
              >
                builder
              </div>
              <div style={{ display: "flex" }}>de IA</div>
            </div>
            <div style={{ display: "flex", marginTop: 10 }}>da sua cidade.</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#C7C2BA",
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            Builders certificados que treinam empresas em IA agêntica em todo o Brasil.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: "flex-end",
              fontSize: 13,
              color: "#A1A1AA",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>builder.culturabuilder.com</div>
            <div style={{ display: "flex", color: "#FF5A1F", fontWeight: 700 }}>
              Powered by AWS · NVIDIA Inception
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
