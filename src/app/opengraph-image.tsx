import { ImageResponse } from "next/og";

export const alt = "Vyasa · Your conversations searchable";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0908",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          color: "#F5F2EC",
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            fontFamily: "Georgia, serif",
          }}
        >
          Vyasa
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#ADA8A1",
            marginTop: 20,
            maxWidth: 900,
            lineHeight: 1.35,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Your conversations searchable
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#E8A04A",
            marginTop: 40,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          vyasa.avyaylabs.com
        </div>
      </div>
    ),
    { ...size },
  );
}
