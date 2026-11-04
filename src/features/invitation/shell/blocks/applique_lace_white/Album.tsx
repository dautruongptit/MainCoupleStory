import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Album({ ctx }: { ctx: InvitationCtx }) {
  const { d, albumPhotos, setActivePhotoIdx, setLightboxOpen } = ctx;
  const photos = albumPhotos && albumPhotos.length > 0 ? albumPhotos : (d.photos && d.photos.length > 0 ? d.photos : [
    "https://assets.chungdoi.com/photo-library/design/a99878c68915ea017811d86db5930f01ede631ca6334dcc1125243da38f43057.webp",
    "https://assets.chungdoi.com/photo-library/design/b62c19234c4be5c6ed3ae19efab7fce13b8e9d24a307fa5aa29d2f80ccf9801d.webp",
    "https://assets.chungdoi.com/photo-library/design/07e8c3900db4c71c2e032f1f394598dd7fec6e89944d5fd98d460c28b1ea5e9c.webp",
    "https://assets.chungdoi.com/photo-library/design/eea31561af67b361b07c74a5edcc43d40bed36315b562edcc71607620ad49293.webp",
    "https://assets.chungdoi.com/photo-library/design/f69d52c7bfeadfe284631051adadf43381334e051f4fddddb97bfa3821afe1df.webp",
    "https://assets.chungdoi.com/photo-library/design/e1fbb356fc938ca105458c018cc7efa8b25a6a967176fd756d294bca8bd5d3f2.webp",
    "https://assets.chungdoi.com/photo-library/design/07feab11f94d7b5bda86361dede0e45dafdb449c2831c2373accd478a7a0474e.webp",
    "https://assets.chungdoi.com/photo-library/design/0c61a0c7360e1ee108635c00f7315ebe86e698c8a97257cc2d2f2e63777363e4.webp"
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  if (!d.albumOn || photos.length === 0) return null;

  const prevPhoto = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const nextPhoto = () => {
    setCurrentIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handlePhotoClick = (index: number) => {
    setActivePhotoIdx(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative isolate z-10 flex w-full flex-col items-center" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <h2 className="uppercase font-bold text-[20px] md:text-[26px] w-full text-center" style={{ color: "rgb(255, 255, 255)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.01em" }}>
        <span>Album Ảnh</span>
      </h2>

      <div className="mt-4 w-full max-w-[414px] md:max-w-[640px]">
        <div className="relative h-[340px] md:h-[520px] touch-pan-y">
          <button
            type="button"
            aria-label="Previous photo"
            onClick={prevPhoto}
            className="flex absolute left-2 top-1/2 -translate-y-1/2 z-[200] w-9 h-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={nextPhoto}
            className="flex absolute right-2 top-1/2 -translate-y-1/2 z-[200] w-9 h-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
            {photos.map((src, idx) => {
              const diff = (idx - currentIdx + photos.length) % photos.length;
              let transform = "";
              let opacity = 0;
              let zIndex = 0;

              if (diff === 0) {
                // Active photo
                transform = "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)";
                opacity = 1;
                zIndex = 100;
              } else if (diff === 1 || diff === -photos.length + 1) {
                // Next photo (right)
                transform = "translateX(60%) translateZ(-150px) rotateY(45deg) scale(0.85)";
                opacity = 0.75;
                zIndex = 99;
              } else if (diff === 2) {
                transform = "translateX(120%) translateZ(-300px) rotateY(90deg) scale(0.7)";
                opacity = 0.5;
                zIndex = 98;
              } else if (diff === photos.length - 1) {
                // Prev photo (left)
                transform = "translateX(-60%) translateZ(-150px) rotateY(-45deg) scale(0.85)";
                opacity = 0.75;
                zIndex = 99;
              } else if (diff === photos.length - 2) {
                transform = "translateX(-120%) translateZ(-300px) rotateY(-90deg) scale(0.7)";
                opacity = 0.5;
                zIndex = 98;
              } else {
                transform = "translateX(0) translateZ(-400px) scale(0.5)";
                opacity = 0;
                zIndex = 50;
              }

              return (
                <div
                  key={idx}
                  onClick={() => handlePhotoClick(idx)}
                  className={`absolute h-[92%] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all ease-in-out ${diff === 0 ? "ring-2 ring-white/50" : ""}`}
                  style={{
                    aspectRatio: "0.75 / 1",
                    transitionDuration: "600ms",
                    transform,
                    opacity,
                    zIndex,
                    pointerEvents: diff === 0 ? "auto" : "none"
                  }}
                >
                  <img
                    alt={`Photo ${idx + 1}`}
                    className="h-full w-full object-cover"
                    src={src}
                    style={{ objectPosition: "50% 50%" }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-white/70">
          <span>{currentIdx + 1} / {photos.length}</span>
        </div>
      </div>
    </div>
  );
}
