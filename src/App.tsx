import { useCallback, useState } from "react";
import { Inv, defaultInv } from "./data";
import Header, { Mode } from "./Header";
import Preview from "./Preview";
import * as S from "./Sections";
import TopNav from "./TopNav";

export default function App() {
  const [d, setD] = useState<Inv>(defaultInv);
  const [mode, setMode] = useState<Mode>("edit");
  const [dirty, setDirty] = useState(0);
  const [toast, setToast] = useState("");

  const set = useCallback((p: Partial<Inv>) => {
    setD((prev) => ({ ...prev, ...p }));
    setDirty((n) => n + 1);
  }, []);

  const publish = () => {
    setToast("Đã xuất bản (demo)");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <>
      <TopNav />
      <Header
        mode={mode}
        onMode={setMode}
        dirty={dirty}
        onPublish={publish}
        templateName={d.templateName}
        templateThumb={d.templateThumb}
      />
      <main>
        {mode === "edit" ? (
          <div className="body">
            <S.Basic d={d} set={set} />
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
    </>
  );
}
