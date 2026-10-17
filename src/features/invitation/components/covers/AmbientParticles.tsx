import React from "react";

interface AmbientParticlesProps {
  type: "xi" | "xi-gold" | "petal" | "blossom" | "confetti" | "stars";
  color?: string;
}

export function AmbientParticles({ type, color }: AmbientParticlesProps) {
  if (type === "stars") {
    const stars = [
      { left: "8%", color: "#f5e6c8", size: "22px", dur: "19s", delay: "-16s" },
      { left: "28%", color: "#ffffff", size: "16px", dur: "23s", delay: "-8s" },
      { left: "50%", color: "#f5e6c8", size: "20px", dur: "18s", delay: "-13s" },
      { left: "68%", color: "#ffffff", size: "14px", dur: "21s", delay: "-3s" },
      { left: "85%", color: "#d4a85c", size: "18px", dur: "24s", delay: "-7s" },
      { left: "93%", color: "#f5e6c8", size: "15px", dur: "20s", delay: "-14s" },
    ];
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {stars.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: p.left,
              top: "-30px",
              color: p.color,
              fontSize: p.size,
              animation: `ambient-fall ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          >
            ✦
          </div>
        ))}
      </div>
    );
  }

  if (type === "xi-gold") {
    const items = [
      { left: "10%", size: "14px", color: "#FFD700", dur: "22s", delay: "-7s" },
      { left: "24%", size: "20px", color: "#FFE066", dur: "24s", delay: "-15s" },
      { left: "42%", size: "18px", color: "#FFC107", dur: "20s", delay: "-4s" },
      { left: "64%", size: "15px", color: "#FF6B6B", dur: "21s", delay: "-11s" },
      { left: "75%", size: "22px", color: "#FFD700", dur: "19s", delay: "-8s" },
      { left: "88%", size: "16px", color: "#FFE066", dur: "23s", delay: "-12s" },
    ];
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: p.left,
              bottom: "-30px",
              fontSize: p.size,
              color: p.color,
              animation: `ambient-rise ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          >
            囍
          </div>
        ))}
      </div>
    );
  }
  if (type === "xi") {
    const items = [
      { left: "12%", size: "22px", color: color || "#FFF0E7", dur: "18s", delay: "-3s" },
      { left: "28%", size: "15px", color: color || "#710001", dur: "22s", delay: "-7s" },
      { left: "38%", size: "12px", color: color || "#FFF0E7", dur: "20s", delay: "-12s" },
      { left: "48%", size: "24px", color: color || "#FFF0E7", dur: "19s", delay: "-5s" },
      { left: "62%", size: "16px", color: color || "#8B0000", dur: "24s", delay: "-14s" },
      { left: "76%", size: "14px", color: color || "#710001", dur: "21s", delay: "-8s" },
      { left: "88%", size: "18px", color: color || "#A52A2A", dur: "23s", delay: "-16s" },
      { left: "20%", size: "13px", color: color || "#8B0000", dur: "25s", delay: "-10s" },
      { left: "70%", size: "20px", color: color || "#8B0000", dur: "17s", delay: "-2s" },
      { left: "92%", size: "15px", color: color || "#710001", dur: "22s", delay: "-9s" },
    ];
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: p.left,
              bottom: "-30px",
              fontSize: p.size,
              color: p.color,
              animation: `ambient-rise ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          >
            囍
          </div>
        ))}
      </div>
    );
  }

  if (type === "blossom") {
    const items = [
      { left: "15%", dur: "21s", delay: "-18s", size: "14px" },
      { left: "35%", dur: "19s", delay: "-5s", size: "18px" },
      { left: "65%", dur: "24s", delay: "-12s", size: "16px" },
      { left: "82%", dur: "20s", delay: "-2s", size: "15px" },
      { left: "88%", dur: "22s", delay: "-14s", size: "17px" },
    ];
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: p.left,
              top: "-30px",
              color: color || "rgba(255, 255, 255, 0.45)",
              fontSize: p.size,
              animation: `ambient-fall ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)" />
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45" />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (type === "confetti") {
    const items = [
      { left: "18%", color: "#FF0040", size: "14px", dur: "22s", delay: "-7s" },
      { left: "32%", color: "#CC0033", size: "16px", dur: "20s", delay: "-13s" },
      { left: "55%", color: "#AA0028", size: "13px", dur: "24s", delay: "-3s" },
      { left: "78%", color: "#FF0040", size: "17px", dur: "19s", delay: "-9s" },
      { left: "88%", color: "#CC0033", size: "15px", dur: "21s", delay: "-16s" },
    ];
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: p.left,
              top: "-30px",
              color: p.color,
              fontSize: p.size,
              animation: `ambient-fall ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          >
            <span style={{ display: "inline-block", width: "0.4em", height: "0.7em", backgroundColor: "currentColor", borderRadius: "1px" }} />
          </div>
        ))}
      </div>
    );
  }

  // Default: petal
  const petals = [
    { left: "12%", size: "18px", dur: "22s", delay: "-3s" },
    { left: "26%", size: "14px", dur: "19s", delay: "-8s" },
    { left: "42%", size: "20px", dur: "24s", delay: "-14s" },
    { left: "60%", size: "15px", dur: "21s", delay: "-5s" },
    { left: "78%", size: "19px", dur: "25s", delay: "-12s" },
    { left: "88%", size: "16px", dur: "20s", delay: "-7s" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: p.left,
            top: "-30px",
            color: color || "#d1db9c",
            fontSize: p.size,
            animation: `ambient-fall ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
