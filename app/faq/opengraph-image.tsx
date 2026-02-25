import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FAQ | Orly";
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

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(1,124,56,0.15)",
            border: "1px solid rgba(1,124,56,0.35)",
            borderRadius: 999,
            padding: "8px 20px",
            marginBottom: 28,
            color: "#017C38",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          FAQ
        </div>

        {/* Logo wordmark */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#017C38",
            letterSpacing: "-4px",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Orly
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            maxWidth: 640,
            lineHeight: 1.4,
          }}
        >
          Frequently asked questions
        </div>

        {/* Bottom pill */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "10px 24px",
            color: "rgba(255,255,255,0.45)",
            fontSize: 20,
          }}
        >
          getorly.com/faq
        </div>
      </div>
    ),
    { ...size }
  );
}
