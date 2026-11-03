import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Lightbox({ ctx }: { ctx: InvitationCtx }) {
  const { lightboxOpen, setLightboxOpen, activePhotoIdx, setActivePhotoIdx, albumPhotos, d } = ctx;
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

  if (!lightboxOpen) return null;

  const currentPhoto = photos[activePhotoIdx] || photos[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((activePhotoIdx - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((activePhotoIdx + 1) % photos.length);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md select-none animate-fadeIn"
      onClick={() => setLightboxOpen(false)}
    >
      {/* Top bar */}
      <div className="absolute top-4 left-4 z-10 text-white font-mono text-sm bg-black/50 px-3 py-1 rounded-full shadow">
        {activePhotoIdx + 1} / {photos.length}
      </div>

      <button
        type="button"
        onClick={() => setLightboxOpen(false)}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors text-xl"
        aria-label="Đóng lightbox"
      >
        ✕
      </button>

      {/* Prev / Next buttons */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors text-2xl"
        aria-label="Ảnh trước"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors text-2xl"
        aria-label="Ảnh tiếp"
      >
        ›
      </button>

      {/* Main Image */}
      <div
        className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto}
          alt={`Wedding photo ${activePhotoIdx + 1}`}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl transition-all duration-300"
        />
      </div>
    </div>
  );
}
