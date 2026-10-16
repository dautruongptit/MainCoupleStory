import { useCallback, useEffect, useState } from "react";
import { Inv, defaultInv, blankInv } from "./data";
import Header, { Mode } from "./Header";
import Preview from "./Preview";
import * as S from "./Sections";
import TopNav from "./TopNav";
import HeroPhoto from "./HeroPhoto";
import TutorialTour from "./TutorialTour";
import ShareModal from "./ShareModal";
import PublishCheckModal from "./PublishCheckModal";
import { loadCards, saveCards, loadInv, saveInv } from "./store";
import { TPL_CDN, templateById } from "./templates";

export default function App() {
  const cardId = typeof window !== "undefined" ? window.location.pathname.replace(/^\/edit\//, "").split("?")[0] : "";
  const [d, setD] = useState<Inv>(() => {
    const known = loadCards().some((c) => c.id === cardId);
    const saved = known ? loadInv(cardId) : null;
    if (saved) {
      // blob: URL của ảnh vừa tải lên chỉ sống trong phiên trước, không dùng lại được sau khi tải trang.
      const alive = (u: string) => !u.startsWith("blob:");
      return { ...defaultInv, ...saved, photos: saved.photos.filter(alive), heroPhoto: alive(saved.heroPhoto) ? saved.heroPhoto : "" };
    }
    const tpl = templateById(loadCards().find((c) => c.id === cardId)?.tplId);
    // thiệp mới tạo từ mẫu: nội dung trống; vào /edit/... không thuộc thiệp nào thì dùng dữ liệu demo
    return tpl
      ? { ...blankInv, templateId: tpl.id, templateName: tpl.name, templateThumb: TPL_CDN + tpl.img }
      : defaultInv;
  });
  const [mode, setMode] = useState<Mode>("edit");
  const [dirty, setDirty] = useState(0);
  const [toast, setToast] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [justPublished, setJustPublished] = useState(false);
  const [showPublishCheck, setShowPublishCheck] = useState(false);

  const cards = loadCards();
  const currentCard = cards.find((c) => c.id === cardId) || cards[0];
  const [isPublished, setIsPublished] = useState<boolean>(() => currentCard?.status === "published");

  const set = useCallback((p: Partial<Inv>) => {
    setD((prev) => ({ ...prev, ...p }));
    setDirty((n) => n + 1);
  }, []);

  useEffect(() => {
    // chỉ ghi cho thiệp có thật trong danh sách, tránh tạo khóa lưu trữ theo id tùy ý trên URL
    if (dirty > 0 && loadCards().some((c) => c.id === cardId)) saveInv(cardId, d);
  }, [d, dirty, cardId]);

  const handlePublishRequest = () => {
    setShowPublishCheck(true);
  };

  const handleConfirmPublish = () => {
    const all = loadCards();
    const updated = all.map((c) =>
      c.id === (currentCard?.id || cardId) ? { ...c, status: "published" as const } : c
    );
    saveCards(updated);
    setIsPublished(true);
    setShowPublishCheck(false);
    setJustPublished(true);
    setShareOpen(true); // Open sharing & QR modal immediately upon publishing!
  };

  const handleOpenShare = () => {
    setJustPublished(false);
    setShareOpen(true);
  };

  return (
    <div className="editor-page-root">
      <TopNav />
      <Header
        mode={mode}
        onMode={setMode}
        dirty={dirty}
        onPublish={handlePublishRequest}
        onShare={handleOpenShare}
        isPublished={isPublished}
        templateId={d.templateId}
        templateName={d.templateName}
        templateThumb={d.templateThumb}
        onSelectTemplate={(tpl) =>
          set({
            templateId: tpl.id,
            templateName: tpl.name,
            templateThumb: TPL_CDN + tpl.img,
          })
        }
      />
      <main>
        {mode === "edit" ? (
          <div className="body">
            <S.Basic d={d} set={set} />
            <HeroPhoto d={d} set={set} />
            <S.Family d={d} set={set} />
            <S.Announce d={d} set={set} />
            <S.Ceremony d={d} set={set} />
            <S.Album d={d} set={set} />
            <S.Banquet d={d} set={set} />
            <S.Rsvp d={d} set={set} />
            <S.Dress d={d} set={set} />
            <S.Schedule d={d} set={set} />
            <S.Guestbook d={d} set={set} />
            <S.GiftBox d={d} set={set} />
            <S.Thanks d={d} set={set} />
            <S.Music d={d} set={set} />
            <S.Envelope d={d} set={set} />
            <S.Share d={d} set={set} />
          </div>
        ) : (
          <Preview d={d} set={set} />
        )}
      </main>
      {toast && <div className="toast">{toast}</div>}
      {showPublishCheck && (
        <PublishCheckModal
          card={currentCard}
          d={d}
          onConfirm={handleConfirmPublish}
          onCancel={() => setShowPublishCheck(false)}
        />
      )}
      {shareOpen && isPublished && (
        <ShareModal
          name={d.groomNick && d.brideNick ? `${d.groomNick} & ${d.brideNick}` : "Hoàng Long & Bảo Ngọc"}
          slug="z6dt5xo7"
          justPublished={justPublished}
          onClose={() => setShareOpen(false)}
        />
      )}
      <TutorialTour />
    </div>
  );
}
