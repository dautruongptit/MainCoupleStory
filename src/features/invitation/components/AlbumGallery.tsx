import { useRef, useState, useEffect, type ReactNode } from "react";

interface CropSettings {
  x: number;
  y: number;
  z: number;
}

interface AlbumGalleryProps {
  photos: string[];
  photoCrops?: Record<string, CropSettings>;
  layout?: "grid" | "collage" | "3d";
  onPhotoClick?: (url: string) => void;
  titleColor?: string;
}

const EASE = "cubic-bezier(.4,0,.2,1)";
const OPACITY = [1, 0.75, 0.5, 0.3, 0.3];
const SCALE = [1, 0.85, 0.7, 0.7, 0.7];

function offsetOf(i: number, active: number, n: number) {
  let d = (((i - active) % n) + n) % n;
  if (d >= n / 2) d -= n;
  return d;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 3D Ring Carousel layout
 * Adapted strictly from Figma specification: Design 3D Ring Carousel
 */
function RingCarouselView({
  photos,
  photoCrops = {},
  onPhotoClick,
}: {
  photos: string[];
  photoCrops?: Record<string, CropSettings>;
  onPhotoClick?: (url: string) => void;
}) {
  const n = photos.length;
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const go = (d: number) => {
    if (n <= 1) return;
    setActive((a) => (((a + d) % n) + n) % n);
  };

  // Safe active bounds if photos array shrinks
  useEffect(() => {
    if (active >= n) setActive(0);
  }, [n, active]);

  if (n === 0) return null;

  return (
    <div className="relative w-full flex flex-col items-center select-none py-2">
      {/* 3D Stage */}
      <div
        className="relative w-full h-[340px] md:h-[480px] flex items-center justify-center overflow-visible"
        style={{
          perspective: 1000,
          perspectiveOrigin: "50% 50%",
          touchAction: "pan-y",
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          touchY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null || touchY.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          const dy = e.changedTouches[0].clientY - touchY.current;
          touchX.current = null;
          touchY.current = null;
          // Only trigger if horizontal swipe is dominant
          if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
            go(dx < 0 ? 1 : -1);
          }
        }}
      >
        {photos.map((url, i) => {
          const o = offsetOf(i, active, n);
          const a = Math.abs(o);
          const crop = photoCrops[url];

          // For ring visuals, only show visible cards (within 2 offsets when many items)
          const isVisible = n <= 5 || a <= 2;

          return (
            <div
              key={url + i}
              data-testid={`carousel-item-${i}`}
              className="absolute overflow-hidden shadow-2xl transition-all"
              style={{
                height: "92%",
                aspectRatio: "2 / 3",
                borderRadius: 16,
                zIndex: 100 - a,
                opacity: isVisible ? OPACITY[Math.min(a, 4)] : 0,
                pointerEvents: isVisible ? "auto" : "none",
                cursor: o === 0 ? "zoom-in" : "pointer",
                boxShadow:
                  (o === 0 ? "0 0 0 2px rgba(255,255,255,0.4), " : "") +
                  "0 20px 30px -8px rgba(0,0,0,0.22), 0 8px 12px -6px rgba(0,0,0,0.15)",
                transform: `translateX(${o * 58}%) translateZ(${-a * 140}px) rotateY(${o * 42}deg) scale(${SCALE[Math.min(a, 4)]})`,
                transition: `all 850ms ${EASE}`,
              }}
              onClick={() => {
                if (o === 0) {
                  onPhotoClick?.(url);
                } else {
                  setActive(i);
                }
              }}
            >
              <img
                src={url}
                alt={`Wedding photo ${i + 1}`}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover transition-transform"
                style={
                  crop
                    ? {
                        objectPosition: `${crop.x}% ${crop.y}%`,
                        transform: `scale(${crop.z})`,
                        transformOrigin: `${crop.x}% ${crop.y}%`,
                      }
                    : undefined
                }
              />
              {o === 0 && (
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-end justify-center pb-2 pointer-events-none">
                  <span className="text-[11px] text-white/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    🔍 Xem ảnh
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Navigation arrows (shown when more than 1 photo) */}
        {n > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-0 p-0 cursor-pointer bg-[rgba(30,25,25,0.65)] hover:bg-[rgba(20,15,15,0.9)] text-white shadow-lg transition-transform active:scale-95"
              style={{ width: 36, height: 36, zIndex: 200 }}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-0 p-0 cursor-pointer bg-[rgba(30,25,25,0.65)] hover:bg-[rgba(20,15,15,0.9)] text-white shadow-lg transition-transform active:scale-95"
              style={{ width: 36, height: 36, zIndex: 200 }}
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      {/* Counter indicator */}
      {n > 1 && (
        <div
          className="text-center mt-3 text-xs md:text-sm font-medium tracking-wide opacity-75 tabular-nums"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {`${active + 1} / ${n}`}
        </div>
      )}
    </div>
  );
}

/**
 * Grid layout: uniform grid with 2 columns on mobile, 2 or 3 columns on desktop
 */
function GridLayoutView({
  photos,
  photoCrops = {},
  onPhotoClick,
}: {
  photos: string[];
  photoCrops?: Record<string, CropSettings>;
  onPhotoClick?: (url: string) => void;
}) {
  const n = photos.length;
  if (n === 0) return null;

  // Single photo case: centered showcase
  if (n === 1) {
    const url = photos[0];
    const crop = photoCrops[url];
    return (
      <div className="w-full flex justify-center py-2 px-4">
        <div
          className="group relative aspect-[3/4] w-full max-w-[320px] rounded-2xl overflow-hidden cursor-pointer shadow-md border border-black/5"
          onClick={() => onPhotoClick?.(url)}
        >
          <img
            src={url}
            alt="Wedding photo 1"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            style={
              crop
                ? {
                    objectPosition: `${crop.x}% ${crop.y}%`,
                    transform: `scale(${crop.z})`,
                    transformOrigin: `${crop.x}% ${crop.y}%`,
                  }
                : undefined
            }
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-xs font-semibold px-2.5 py-1 bg-black/50 rounded-full backdrop-blur-sm">
              🔍 Xem ảnh
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[460px] md:max-w-[720px] mx-auto px-4 py-2">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {photos.map((url, i) => {
          const crop = photoCrops[url];
          return (
            <div
              key={url + i}
              data-testid={`grid-item-${i}`}
              className="group relative aspect-square sm:aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-black/5 bg-black/5"
              onClick={() => onPhotoClick?.(url)}
            >
              <img
                src={url}
                alt={`Wedding photo ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                style={
                  crop
                    ? {
                        objectPosition: `${crop.x}% ${crop.y}%`,
                        transform: `scale(${crop.z})`,
                        transformOrigin: `${crop.x}% ${crop.y}%`,
                      }
                    : undefined
                }
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-xs font-medium px-2 py-0.5 bg-black/60 rounded-full backdrop-blur-sm">
                  🔍 Xem ảnh
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Collage layout: varied sizes and masonry style (not uniform grid)
 */
function CollageLayoutView({
  photos,
  photoCrops = {},
  onPhotoClick,
}: {
  photos: string[];
  photoCrops?: Record<string, CropSettings>;
  onPhotoClick?: (url: string) => void;
}) {
  const n = photos.length;
  if (n === 0) return null;

  // Single photo: centered showcase
  if (n === 1) {
    const url = photos[0];
    const crop = photoCrops[url];
    return (
      <div className="w-full flex justify-center py-2 px-4">
        <div
          className="group relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-black/5"
          onClick={() => onPhotoClick?.(url)}
        >
          <img
            src={url}
            alt="Wedding photo 1"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            style={
              crop
                ? {
                    objectPosition: `${crop.x}% ${crop.y}%`,
                    transform: `scale(${crop.z})`,
                    transformOrigin: `${crop.x}% ${crop.y}%`,
                  }
                : undefined
            }
          />
        </div>
      </div>
    );
  }

  // 3 photos special artistic collage
  if (n === 3) {
    return (
      <div className="w-full max-w-[460px] md:max-w-[700px] mx-auto px-4 py-2">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div
            className="col-span-2 group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-black/5"
            onClick={() => onPhotoClick?.(photos[0])}
          >
            <img
              src={photos[0]}
              alt="Wedding photo 1"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              style={
                photoCrops[photos[0]]
                  ? {
                      objectPosition: `${photoCrops[photos[0]].x}% ${photoCrops[photos[0]].y}%`,
                      transform: `scale(${photoCrops[photos[0]].z})`,
                      transformOrigin: `${photoCrops[photos[0]].x}% ${photoCrops[photos[0]].y}%`,
                    }
                  : undefined
              }
            />
          </div>
          {photos.slice(1).map((url, idx) => {
            const crop = photoCrops[url];
            return (
              <div
                key={url + idx}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-sm bg-black/5"
                onClick={() => onPhotoClick?.(url)}
              >
                <img
                  src={url}
                  alt={`Wedding photo ${idx + 2}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  style={
                    crop
                      ? {
                          objectPosition: `${crop.x}% ${crop.y}%`,
                          transform: `scale(${crop.z})`,
                          transformOrigin: `${crop.x}% ${crop.y}%`,
                        }
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Multi-photo masonry collage with alternating aspect ratios
  const ASPECTS = [
    "aspect-[3/4]",
    "aspect-square",
    "aspect-[4/5]",
    "aspect-[16/10]",
    "aspect-[2/3]",
    "aspect-[4/3]",
  ];

  return (
    <div className="w-full max-w-[480px] md:max-w-[760px] mx-auto px-4 py-2">
      <div className="columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:_balance]">
        {photos.map((url, i) => {
          const crop = photoCrops[url];
          const aspect = ASPECTS[i % ASPECTS.length];
          return (
            <div
              key={url + i}
              data-testid={`collage-item-${i}`}
              className={`break-inside-avoid mb-3 md:mb-4 group relative ${aspect} rounded-xl md:rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow border border-black/5 bg-black/5`}
              onClick={() => onPhotoClick?.(url)}
            >
              <img
                src={url}
                alt={`Wedding photo ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                style={
                  crop
                    ? {
                        objectPosition: `${crop.x}% ${crop.y}%`,
                        transform: `scale(${crop.z})`,
                        transformOrigin: `${crop.x}% ${crop.y}%`,
                      }
                    : undefined
                }
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-xs font-medium px-2 py-0.5 bg-black/60 rounded-full backdrop-blur-sm">
                  🔍 Xem ảnh
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Unified AlbumGallery Component
 */
export default function AlbumGallery({
  photos,
  photoCrops = {},
  layout = "grid",
  onPhotoClick,
}: AlbumGalleryProps) {
  if (!photos || photos.length === 0) return null;

  if (layout === "3d") {
    return (
      <RingCarouselView
        photos={photos}
        photoCrops={photoCrops}
        onPhotoClick={onPhotoClick}
      />
    );
  }

  if (layout === "collage") {
    return (
      <CollageLayoutView
        photos={photos}
        photoCrops={photoCrops}
        onPhotoClick={onPhotoClick}
      />
    );
  }

  return (
    <GridLayoutView
      photos={photos}
      photoCrops={photoCrops}
      onPhotoClick={onPhotoClick}
    />
  );
}
