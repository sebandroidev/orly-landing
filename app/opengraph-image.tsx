import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Orly — Discover Local Services Around You";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d0d0d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(1,124,56,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Logo wordmark */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#017C38",
            letterSpacing: "-4px",
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          Orly
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Discover local services around you
        </div>

        {/* Bottom pill badge */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "10px 24px",
            color: "rgba(255,255,255,0.45)",
            fontSize: 20,
          }}
        >
          orly.app
        </div>
      </div>
    ),
    { ...size }
  );
}
