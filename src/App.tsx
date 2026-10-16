import { useCallback, useState } from "react";
import { Inv, defaultInv } from "./data";
import Header, { Mode } from "./Header";
import Preview from "./Preview";
import * as S from "./Sections";
import TopNav from "./TopNav";
import HeroPhoto from "./HeroPhoto";
import TutorialTour from "./TutorialTour";
import ShareModal from "./ShareModal";
import PublishCheckModal from "./PublishCheckModal";
import { loadCards, saveCards } from "./store";

export default function App() {
  const [d, setD] = useState<Inv>(defaultInv);
  const [mode, setMode] = useState<Mode>("edit");
  const [dirty, setDirty] = useState(0);
  const [toast, setToast] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [showPublishCheck, setShowPublishCheck] = useState(false);

  const cardId = typeof window !== "undefined" ? window.location.pathname.replace(/^\/edit\//, "").split("?")[0] : "";
  const cards = loadCards();
  const currentCard = cards.find((c) => c.id === cardId) || cards[0];
  const [isPublished, setIsPublished] = useState<boolean>(() => currentCard?.status === "published");

  const set = useCallback((p: Partial<Inv>) => {
    setD((prev) => ({ ...prev, ...p }));
    setDirty((n) => n + 1);
  }, []);

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
    setToast("Xuất bản thiệp thành công!");
    setTimeout(() => setToast(""), 2200);
    setShareOpen(true); // Open sharing & QR modal immediately upon publishing!
  };

  return (
    <>
      <TopNav />
      <Header
        mode={mode}
        onMode={setMode}
        dirty={dirty}
        onPublish={handlePublishRequest}
        onShare={() => setShareOpen(true)}
        isPublished={isPublished}
        templateId={d.templateId}
        templateName={d.templateName}
        templateThumb={d.templateThumb}
        onSelectTemplate={(tpl) =>
          set({
            templateId: tpl.id,
            templateName: tpl.name,
            templateThumb: "https://assets.chungdoi.com/template-previews/vi/" + tpl.img,
          })
        }
      />
      <main>
        {mode === "edit" ? (
          <div className="body">
            <S.Basic d={d} set={set} />
            <HeroPhoto d={d} set={set} />
            <S.Album d={d} set={set} />
            <S.Family d={d} set={set} />
            <S.Announce d={d} set={set} />
            <S.Ceremony d={d} set={set} />
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
          name={d.groomNick && d.brideNick ? `${d.groomNick} & ${d.brideNick}` : "Thiệp 1"}
          slug="z6dt5xo7"
          onClose={() => setShareOpen(false)}
        />
      )}
      <TutorialTour />
    </>
  );
}
