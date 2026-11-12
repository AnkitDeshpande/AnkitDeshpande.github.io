import Image from "next/image";

const DEPTH = 26;
const HALF = DEPTH / 2;

/**
 * A real CSS 3D box: the portrait is the front face, the four edges are
 * crimson-tinted side panels, so the photo has physical thickness when the
 * camera rotates around it. Width comes from --slab-w on the parent.
 */
export function PortraitSlab() {
  return (
    <div
      className="relative"
      style={{
        width: "var(--slab-w)",
        height: "calc(var(--slab-w) * 1.5)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Front face: the portrait, with the name knocked out of it. */}
      <div
        className="absolute inset-0 overflow-hidden bg-bg-card"
        style={{ transform: `translateZ(${HALF}px)` }}
      >
        <Image
          src="/images/profile/ankit-portrait-3d.jpg"
          alt="Ankit Deshpande"
          fill
          priority
          sizes="(max-width: 1024px) 56vw, 30vw"
          className="object-cover"
        />

        <svg
          viewBox="0 0 1000 1500"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full select-none font-display"
          aria-hidden="true"
        >
          <text
            x="500"
            y="1226"
            textAnchor="middle"
            fontSize="220"
            fontWeight="800"
            letterSpacing="-6"
            fill="var(--color-bg)"
            stroke="var(--color-crimson)"
            strokeWidth="3"
            paintOrder="stroke"
            textLength="930"
            lengthAdjust="spacingAndGlyphs"
          >
            ANKIT
          </text>
          <text
            x="500"
            y="1368"
            textAnchor="middle"
            fontSize="118"
            fontWeight="800"
            letterSpacing="-3"
            fill="var(--color-bg)"
            stroke="var(--color-crimson)"
            strokeWidth="3"
            paintOrder="stroke"
            textLength="930"
            lengthAdjust="spacingAndGlyphs"
          >
            DESHPANDE
          </text>
        </svg>

        <div
          className="pointer-events-none absolute inset-0 border border-crimson/40"
          aria-hidden="true"
        />
      </div>

      {/* Back face */}
      <div
        className="absolute inset-0 border border-border bg-bg-card"
        style={{ transform: `translateZ(-${HALF}px) rotateY(180deg)` }}
        aria-hidden="true"
      />

      {/* Right edge */}
      <div
        className="absolute top-0 bg-[#2a1626]"
        style={{
          width: DEPTH,
          height: "100%",
          left: `calc(50% - ${HALF}px)`,
          transform: `translateX(calc(var(--slab-w) / 2)) rotateY(90deg)`,
        }}
        aria-hidden="true"
      />

      {/* Left edge */}
      <div
        className="absolute top-0 bg-[#241320]"
        style={{
          width: DEPTH,
          height: "100%",
          left: `calc(50% - ${HALF}px)`,
          transform: `translateX(calc(var(--slab-w) / -2)) rotateY(-90deg)`,
        }}
        aria-hidden="true"
      />

      {/* Top edge */}
      <div
        className="absolute left-0 bg-[#33203a]"
        style={{
          width: "100%",
          height: DEPTH,
          top: `calc(50% - ${HALF}px)`,
          transform: `translateY(calc(var(--slab-w) * -0.75)) rotateX(90deg)`,
        }}
        aria-hidden="true"
      />

      {/* Bottom edge */}
      <div
        className="absolute left-0 bg-[#1c1019]"
        style={{
          width: "100%",
          height: DEPTH,
          top: `calc(50% - ${HALF}px)`,
          transform: `translateY(calc(var(--slab-w) * 0.75)) rotateX(-90deg)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
