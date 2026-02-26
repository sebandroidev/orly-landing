import Image from "next/image";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function PhoneMockup({
  src,
  alt = "App screenshot",
  className = "",
  width = 220,
  height = 440,
}: PhoneMockupProps) {
  return (
    <div className={`relative flex-shrink-0 ${className}`} style={{ width, height }}>
      {/* Phone body */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: Math.round(width * 0.118),
          background: "#0d0d0d",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.55), inset 0 0 0 1.5px rgba(255,255,255,0.13)",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute z-10"
          style={{
            top: Math.round(height * 0.022),
            left: "50%",
            transform: "translateX(-50%)",
            width: Math.round(width * 0.29),
            height: Math.round(height * 0.033),
            borderRadius: 999,
            background: "#000",
          }}
        />

        {/* Screen */}
        {src ? (
          <Image src={src} alt={alt} fill className="object-cover object-top" />
        ) : (
          <PlaceholderScreen width={width} height={height} />
        )}
      </div>

      {/* Volume buttons */}
      <div
        className="absolute rounded-full"
        style={{
          left: -2,
          top: Math.round(height * 0.19),
          width: 2.5,
          height: Math.round(height * 0.065),
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: -2,
          top: Math.round(height * 0.28),
          width: 2.5,
          height: Math.round(height * 0.065),
          background: "rgba(255,255,255,0.1)",
        }}
      />
      {/* Power button */}
      <div
        className="absolute rounded-full"
        style={{
          right: -2,
          top: Math.round(height * 0.22),
          width: 2.5,
          height: Math.round(height * 0.1),
          background: "rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
}

function PlaceholderScreen({ width, height }: { width: number; height: number }) {
  const px = Math.round(width * 0.09);

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: "#0f0f0f", paddingTop: Math.round(height * 0.105) }}
    >
      {/* Status bar */}
      <div
        className="flex justify-between items-center mb-4"
        style={{ paddingInline: px }}
      >
        <div
          className="rounded-full"
          style={{ height: 8, width: Math.round(width * 0.22), background: "rgba(255,255,255,0.1)" }}
        />
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{ height: 7, width: 7, background: "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div
        className="rounded-2xl mb-4"
        style={{
          marginInline: px,
          height: Math.round(height * 0.07),
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      />

      {/* Category pills */}
      <div className="flex gap-2 mb-4 overflow-hidden" style={{ paddingInline: px }}>
        {[0.24, 0.2, 0.28, 0.18].map((ratio, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-full"
            style={{
              width: Math.round(width * ratio),
              height: Math.round(height * 0.055),
              background: i === 0 ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </div>

      {/* List items */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 mb-2"
          style={{
            marginInline: px,
            padding: Math.round(width * 0.055),
            height: Math.round(height * 0.12),
            borderRadius: Math.round(width * 0.07),
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="flex-shrink-0"
            style={{
              width: Math.round(width * 0.18),
              height: Math.round(width * 0.18),
              borderRadius: Math.round(width * 0.045),
              background: "rgba(255,255,255,0.07)",
            }}
          />
          <div className="flex-1 min-w-0">
            <div
              className="rounded-full mb-2"
              style={{
                height: 8,
                width: Math.round(width * 0.42),
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <div
              className="rounded-full"
              style={{
                height: 6,
                width: Math.round(width * 0.28),
                background: "rgba(255,255,255,0.05)",
              }}
            />
          </div>
          <div className="flex flex-col items-end gap-1">
            <div
              className="rounded-full"
              style={{ height: 7, width: Math.round(width * 0.14), background: "rgba(255,255,255,0.07)" }}
            />
            <div
              className="rounded-full"
              style={{ height: 5, width: Math.round(width * 0.1), background: "rgba(255,255,255,0.04)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
