import { ImageResponse } from "next/og";

export const alt =
  "Modi Hyundai, authorised Hyundai dealer in Mumbai and Pune";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Branded social-share card, generated at build so we ship no binary
   asset. Replace with real dealership photography for launch if desired. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #001a3a 0%, #002c5f 55%, #0057b8 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#002c5f",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            H
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
              MODI HYUNDAI
            </span>
            <span
              style={{
                fontSize: 16,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#9cc3f2",
              }}
            >
              Customer First
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
          <span style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            New Hyundai Cars, Test Drives &amp; Service
          </span>
          <span style={{ fontSize: 34, color: "#bcd4f5", marginTop: 12 }}>
            Authorised Hyundai dealer in Mumbai &amp; Pune
          </span>
        </div>

        <div style={{ display: "flex", gap: 40, color: "#dce8f8", fontSize: 24 }}>
          <span>250,000+ cars sold</span>
          <span>98% customer satisfaction</span>
          <span>Creta · Venue · Alcazar</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
