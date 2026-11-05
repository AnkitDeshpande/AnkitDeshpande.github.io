import { ImageResponse } from "next/og";

export const alt = "Ankit Deshpande · Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1a1a2e",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#e03e3e",
            }}
          />
          <div
            style={{
              fontSize: 24,
              color: "#9a9ab8",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1,
              color: "#f8f8f2",
              letterSpacing: "-0.03em",
            }}
          >
            ANKIT
          </div>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1.05,
              color: "#e03e3e",
              letterSpacing: "-0.03em",
            }}
          >
            DESHPANDE
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: 32,
              color: "#9a9ab8",
            }}
          >
            Backend Engineer · Java · Spring Boot · Cloud
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #3a3a6a",
            paddingTop: "24px",
            fontSize: 24,
            color: "#6a6a8a",
          }}
        >
          <div>ankitdeshpande.dev</div>
          <div>Bengaluru, India</div>
        </div>
      </div>
    ),
    size
  );
}
