import React from "react";

export type ParticleKind = "xi" | "xi-gold" | "petal" | "blossom" | "confetti" | "stars" | "heart";

interface AmbientParticlesProps {
  type: ParticleKind;
  color?: string;
  count?: number;
}

export function AmbientParticles({ type, color, count = 12 }: AmbientParticlesProps) {
  if (type === "heart") {
    const hearts = [
      { left: "30.3%", color: "#a8323b", size: "14px", dur: "24.8s", delay: "-21.6s", sway: "28px" },
      { left: "17.2%", color: "#ece4d8", size: "22px", dur: "25.9s", delay: "-10.3s", sway: "1px" },
      { left: "70.2%", color: "#c9a24a", size: "17px", dur: "25.7s", delay: "-8.4s", sway: "-28px" },
      { left: "33.5%", color: "#a8323b", size: "23px", dur: "20.1s", delay: "-19.7s", sway: "30px" },
      { left: "26.4%", color: "#c9a24a", size: "23px", dur: "25.5s", delay: "-13.4s", sway: "-13px" },
      { left: "83.3%", color: "#c9a24a", size: "22px", dur: "25.0s", delay: "-0.1s", sway: "-26px" },
      { left: "9.0%", color: "#a8323b", size: "18px", dur: "23.0s", delay: "-0.3s", sway: "5px" },
      { left: "69.7%", color: "#c9a24a", size: "13px", dur: "20.7s", delay: "-7.5s", sway: "24px" },
      { left: "18.2%", color: "#ece4d8", size: "22px", dur: "21.8s", delay: "-20.7s", sway: "26px" },
      { left: "51.8%", color: "#7a1f26", size: "21px", dur: "18.0s", delay: "-0.7s", sway: "-16px" },
      { left: "25.9%", color: "#7a1f26", size: "18px", dur: "24.5s", delay: "-23.2s", sway: "5px" },
      { left: "91.8%", color: "#c9a24a", size: "13px", dur: "20.1s", delay: "-0.4s", sway: "-11px" },
    ].slice(0, count);

    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {hearts.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left: p.left,
              top: "-30px",
              bottom: "auto",
              color: p.color,
              fontSize: p.size,
              ["--sway" as any]: p.sway,
              animation: `ambient-fall ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (type === "stars") {
    const stars = [
      { left: "6.5%", color: "#f5e6c8", size: "22px", dur: "19.0s", delay: "-16.2s", sway: "18px" },
      { left: "14.2%", color: "#ffffff", size: "16px", dur: "21.5s", delay: "-8.4s", sway: "-14px" },
      { left: "22.8%", color: "#d4a85c", size: "20px", dur: "18.2s", delay: "-13.1s", sway: "22px" },
      { left: "31.4%", color: "#ffffff", size: "14px", dur: "23.0s", delay: "-3.5s", sway: "-19px" },
      { left: "40.0%", color: "#f5e6c8", size: "19px", dur: "20.1s", delay: "-17.8s", sway: "12px" },
      { left: "49.5%", color: "#d4a85c", size: "18px", dur: "24.2s", delay: "-7.2s", sway: "-24px" },
      { left: "58.1%", color: "#ffffff", size: "15px", dur: "19.8s", delay: "-14.6s", sway: "15px" },
      { left: "67.3%", color: "#f5e6c8", size: "21px", dur: "22.4s", delay: "-5.8s", sway: "-16px" },
      { left: "75.7%", color: "#ffffff", size: "14px", dur: "18.7s", delay: "-11.3s", sway: "20px" },
      { left: "83.2%", color: "#d4a85c", size: "23px", dur: "24.8s", delay: "-19.1s", sway: "-11px" },
      { left: "90.6%", color: "#f5e6c8", size: "16px", dur: "20.5s", delay: "-9.7s", sway: "25px" },
      { left: "96.0%", color: "#ffffff", size: "17px", dur: "22.0s", delay: "-1.5s", sway: "-18px" },
    ].slice(0, count);

    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {stars.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left: p.left,
              top: "-30px",
              bottom: "auto",
              color: p.color,
              fontSize: p.size,
              ["--sway" as any]: p.sway,
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
      { left: "7.2%", size: "18px", color: "#FFD700", dur: "22.1s", delay: "-7.4s", sway: "16px" },
      { left: "15.8%", size: "22px", color: "#FFE066", dur: "24.5s", delay: "-15.2s", sway: "-19px" },
      { left: "24.1%", size: "15px", color: "#FFC107", dur: "20.3s", delay: "-4.6s", sway: "24px" },
      { left: "32.6%", size: "20px", color: "#FF6B6B", dur: "21.8s", delay: "-11.8s", sway: "-12px" },
      { left: "41.5%", size: "24px", color: "#FFD700", dur: "19.2s", delay: "-8.1s", sway: "18px" },
      { left: "50.0%", size: "16px", color: "#FFE066", dur: "23.4s", delay: "-17.5s", sway: "-22px" },
      { left: "58.4%", size: "21px", color: "#FFC107", dur: "20.8s", delay: "-3.2s", sway: "14px" },
      { left: "67.0%", size: "14px", color: "#FFD700", dur: "22.7s", delay: "-13.4s", sway: "-17px" },
      { left: "75.2%", size: "23px", color: "#FFE066", dur: "19.6s", delay: "-6.9s", sway: "21px" },
      { left: "82.8%", size: "17px", color: "#FF6B6B", dur: "24.1s", delay: "-18.7s", sway: "-15px" },
      { left: "90.1%", size: "20px", color: "#FFD700", dur: "21.3s", delay: "-10.5s", sway: "25px" },
      { left: "95.5%", size: "16px", color: "#FFE066", dur: "23.0s", delay: "-1.8s", sway: "-20px" },
    ].slice(0, count);

    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left: p.left,
              top: "auto",
              bottom: "-30px",
              fontSize: p.size,
              color: p.color,
              fontFamily: "serif",
              ["--sway" as any]: p.sway,
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
      { left: "6.8%", size: "22px", color: color || "#C41230", dur: "20.5s", delay: "-4.2s", sway: "18px" },
      { left: "14.5%", size: "15px", color: color || "#710001", dur: "22.8s", delay: "-14.1s", sway: "-15px" },
      { left: "23.2%", size: "19px", color: color || "#8B0000", dur: "19.3s", delay: "-8.7s", sway: "22px" },
      { left: "31.9%", size: "24px", color: color || "#A52A2A", dur: "23.6s", delay: "-16.4s", sway: "-19px" },
      { left: "40.5%", size: "16px", color: color || "#C41230", dur: "21.1s", delay: "-2.8s", sway: "13px" },
      { left: "49.0%", size: "20px", color: color || "#710001", dur: "24.4s", delay: "-18.9s", sway: "-24px" },
      { left: "57.6%", size: "14px", color: color || "#8B0000", dur: "18.8s", delay: "-6.3s", sway: "16px" },
      { left: "66.2%", size: "21px", color: color || "#C41230", dur: "22.2s", delay: "-12.5s", sway: "-18px" },
      { left: "74.8%", size: "17px", color: color || "#710001", dur: "20.0s", delay: "-9.1s", sway: "20px" },
      { left: "82.5%", size: "23px", color: color || "#8B0000", dur: "24.9s", delay: "-17.2s", sway: "-12px" },
      { left: "89.8%", size: "15px", color: color || "#A52A2A", dur: "19.5s", delay: "-5.0s", sway: "23px" },
      { left: "95.5%", size: "18px", color: color || "#C41230", dur: "21.7s", delay: "-1.4s", sway: "-16px" },
    ].slice(0, count);

    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left: p.left,
              top: "auto",
              bottom: "-30px",
              fontSize: p.size,
              color: p.color,
              fontFamily: "serif",
              ["--sway" as any]: p.sway,
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
      { left: "7.0%", size: "17px", color: color || "#c0524f", dur: "22.5s", delay: "-16.8s", sway: "14px" },
      { left: "15.4%", size: "13px", color: color || "#b03235", dur: "23.0s", delay: "-12.7s", sway: "-18px" },
      { left: "23.8%", size: "22px", color: color || "#d14f4a", dur: "20.2s", delay: "-5.6s", sway: "21px" },
      { left: "32.2%", size: "16px", color: color || "#a82b28", dur: "24.1s", delay: "-19.3s", sway: "-15px" },
      { left: "41.0%", size: "19px", color: color || "#c0524f", dur: "19.7s", delay: "-8.4s", sway: "17px" },
      { left: "49.5%", size: "14px", color: color || "#b03235", dur: "21.9s", delay: "-14.2s", sway: "-22px" },
      { left: "58.0%", size: "20px", color: color || "#d14f4a", dur: "23.5s", delay: "-3.1s", sway: "16px" },
      { left: "66.5%", size: "15px", color: color || "#a82b28", dur: "18.9s", delay: "-11.0s", sway: "-19px" },
      { left: "75.0%", size: "21px", color: color || "#c0524f", dur: "24.6s", delay: "-17.6s", sway: "23px" },
      { left: "83.2%", size: "14px", color: color || "#b03235", dur: "20.8s", delay: "-6.9s", sway: "-12px" },
      { left: "90.5%", size: "18px", color: color || "#d14f4a", dur: "22.3s", delay: "-15.1s", sway: "25px" },
      { left: "96.0%", size: "16px", color: color || "#a82b28", dur: "21.0s", delay: "-2.0s", sway: "-17px" },
    ].slice(0, count);

    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left: p.left,
              top: "-30px",
              bottom: "auto",
              color: p.color,
              fontSize: p.size,
              ["--sway" as any]: p.sway,
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
      { left: "6.5%", color: "#FF0040", size: "14px", dur: "25.1s", delay: "-7.4s", sway: "-13px" },
      { left: "14.8%", color: "#CC0033", size: "17px", dur: "18.7s", delay: "-6.9s", sway: "10px" },
      { left: "23.0%", color: "#AA0028", size: "11px", dur: "20.6s", delay: "-16.6s", sway: "-20px" },
      { left: "31.5%", color: "#B80030", size: "19px", dur: "22.8s", delay: "-18.1s", sway: "15px" },
      { left: "40.0%", color: "#FF0040", size: "15px", dur: "24.0s", delay: "-19.8s", sway: "-26px" },
      { left: "49.0%", color: "#CC0033", size: "20px", dur: "18.9s", delay: "-3.4s", sway: "26px" },
      { left: "57.5%", color: "#B80030", size: "14px", dur: "25.3s", delay: "-13.9s", sway: "-21px" },
      { left: "66.0%", color: "#AA0028", size: "16px", dur: "19.5s", delay: "-9.2s", sway: "18px" },
      { left: "74.5%", color: "#FF0040", size: "18px", dur: "23.4s", delay: "-15.0s", sway: "-14px" },
      { left: "82.8%", color: "#CC0033", size: "12px", dur: "21.2s", delay: "-11.5s", sway: "22px" },
      { left: "90.2%", color: "#B80030", size: "17px", dur: "24.5s", delay: "-5.3s", sway: "-17px" },
      { left: "96.0%", color: "#FF0040", size: "15px", dur: "20.1s", delay: "-1.8s", sway: "19px" },
    ].slice(0, count);

    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left: p.left,
              top: "-30px",
              bottom: "auto",
              color: p.color,
              fontSize: p.size,
              ["--sway" as any]: p.sway,
              animation: `ambient-fall ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "0.4em",
                height: "0.7em",
                backgroundColor: "currentColor",
                borderRadius: "1px",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Default: petal (gentle botanical leaves / petals)
  const petals = [
    { left: "6.8%", size: "18px", dur: "22.2s", delay: "-3.5s", sway: "17px" },
    { left: "15.0%", size: "14px", dur: "19.5s", delay: "-8.8s", sway: "-15px" },
    { left: "23.5%", size: "20px", dur: "24.1s", delay: "-14.3s", sway: "23px" },
    { left: "32.0%", size: "15px", dur: "21.0s", delay: "-5.2s", sway: "-19px" },
    { left: "41.0%", size: "19px", dur: "25.4s", delay: "-12.7s", sway: "14px" },
    { left: "49.5%", size: "16px", dur: "20.6s", delay: "-7.9s", sway: "-24px" },
    { left: "58.0%", size: "21px", dur: "23.8s", delay: "-16.1s", sway: "18px" },
    { left: "66.5%", size: "14px", dur: "18.9s", delay: "-4.4s", sway: "-16px" },
    { left: "75.0%", size: "20px", dur: "22.7s", delay: "-11.8s", sway: "21px" },
    { left: "83.2%", size: "17px", dur: "24.9s", delay: "-18.5s", sway: "-13px" },
    { left: "90.5%", size: "19px", dur: "20.2s", delay: "-9.3s", sway: "25px" },
    { left: "96.0%", size: "15px", dur: "23.0s", delay: "-1.9s", sway: "-17px" },
  ].slice(0, count);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: p.left,
            top: "-30px",
            bottom: "auto",
            color: color || "#d1db9c",
            fontSize: p.size,
            ["--sway" as any]: p.sway,
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

export default AmbientParticles;
