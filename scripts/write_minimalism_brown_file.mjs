import fs from 'fs';

let body = fs.readFileSync('docs/real_minimalism_nau_clean_jsx.txt', 'utf8');

// Replace external assets.chungdoi.com photo-library URLs with local /images/photo-library URLs
body = body.replace(/https:\/\/assets\.chungdoi\.com\/photo-library\/design\//g, '/images/photo-library/design/');

// In React JSX, comments <!-- ... --> must be removed
body = body.replace(/<!--[\s\S]*?-->/g, '');

// Wrap <style> tags in JSX template strings: <style>{`...`}</style>
body = body.replace(/<style>([\s\S]*?)<\/style>/g, (m, css) => `<style>{\`${css}\`}</style>`);

// Lonely & between tags
body = body.replace(/>\s*&\s*</g, '>&amp;<');

// React JSX attribute fixes
body = body.replace(/\ballowfullscreen="[^"]*"/g, 'allowFullScreen');
body = body.replace(/\ballowfullscreen\b/g, 'allowFullScreen');
body = body.replace(/\breferrerpolicy=/g, 'referrerPolicy=');
body = body.replace(/\bmaxlength="(\d+)"/gi, 'maxLength={$1}');
body = body.replace(/\brequired=""/g, 'required');
body = body.replace(/\brows="(\d+)"/g, 'rows={$1}');

// Newlines with pre-line
body = body.replace('TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI', 'TRÂN TRỌNG BÁO TIN{"\\n"}LỄ THÀNH HÔN CỦA CON CHÚNG TÔI');
body = body.replace('LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA', 'LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI{"\\n"}TƯ GIA');

// Remove trailing </main>
body = body.replace(/<\/main>\s*$/, '');

const componentContent = `import React, { useState, useRef, useEffect } from "react";
import type { Inv } from "@/types/invitation";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate, buildIcs } from "@/utils/date";

export interface MinimalismBrownProps {
  d: Inv;
  set: (p: Partial<Inv>) => void;
  standalone?: boolean;
}

export function MinimalismBrown({ d, set }: MinimalismBrownProps) {
  const gName = groomShown(d) || "Hoàng Nam";
  const bName = brideShown(d) || "Thảo Vy";
  const dt = parseDate(d.date || "2026-01-03");

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  const addToCalendar = () => {
    const blob = new Blob([buildIcs(d)], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = \`dam-cuoi-\${gName}-\${bName}.ics\`;
    a.click();
  };

  return (
    <div className="min-h-screen w-full select-none">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src={d.musicUrl || "/music/my-love-westlife.mp3"}
        loop
        preload="auto"
      />

      {/* Floating Audio Button */}
      <div className="music-floating-wrap fixed top-4 right-4 z-50">
        <button
          className={\`music-floating-btn \${isPlayingMusic ? "playing" : ""}\`}
          onClick={toggleMusic}
          aria-label={isPlayingMusic ? "Tắt nhạc" : "Phát nhạc"}
          title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "rgba(124, 106, 96, 0.85)",
            color: "#FFFAF7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            border: "2px solid rgba(255,255,255,0.4)",
            cursor: "pointer",
          }}
        >
          <svg className={\`w-5 h-5 \${isPlayingMusic ? "animate-spin" : ""}\`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </button>
      </div>

      ${body}
    </div>
  );
}
`;

fs.writeFileSync('src/features/invitation/components/MinimalismBrown.tsx', componentContent);
console.log('Saved src/features/invitation/components/MinimalismBrown.tsx');
