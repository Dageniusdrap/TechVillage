import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const title = "TechVillage";
  const desc = "Smart Living in Batam";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg,#eef2ff 0%,#e0e7ff 50%,#c7d2fe 100%)",
          color: "#0f172a",
          fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
          padding: 64,
        }}
      >
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>🏡 {title}</span>
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 28, marginTop: 12, opacity: 0.9 }}>{desc}</span>
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 18, marginTop: 24, opacity: 0.8 }}>Modern homes • 24/7 security • Green spaces</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
