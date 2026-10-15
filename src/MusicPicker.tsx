import { useEffect, useState } from "react";

type Song = { title: string; artist: string; uses: number; dur: string };

const LIBRARY: Song[] = [
  { title: "Beautiful In White", artist: "Shane Filan", uses: 18376, dur: "3:54" },
  { title: "Em Đồng Ý (I Do)", artist: "Đức Phúc x 911", uses: 13568, dur: "3:35" },
  { title: "Lễ Đường", artist: "Kai Đinh", uses: 11453, dur: "4:09" },
  { title: "Perfect", artist: "Ed Sheeran", uses: 7608, dur: "4:23" },
  { title: "Ordinary (Wedding Version)", artist: "Alex Warren", uses: 3274, dur: "3:07" },
  { title: "Marry You", artist: "Bruno Mars", uses: 3086, dur: "3:40" },
  { title: "50 Năm Về Sau", artist: "F47 & meChill & Đặng Thanh Tuyền", uses: 2805, dur: "4:59" },
  { title: "I Do", artist: "911", uses: 2676, dur: "3:23" },
  { title: "Hơn Cả Yêu", artist: "Đức Phúc", uses: 2224, dur: "4:08" },
  { title: "My Love", artist: "Westlife", uses: 2111, dur: "3:52" },
  { title: "Young and Beautiful", artist: "Lana Del Rey", uses: 1574, dur: "3:56" },
  { title: "Cưới Thôi", artist: "Masew x Masiu x B Ray", uses: 1447, dur: "3:00" },
  { title: "Một Đời", artist: "14 Casper & Bon Nghiêm", uses: 1212, dur: "5:28" },
  { title: "Đám Cưới Nha", artist: "Hồng Thanh x Mie", uses: 1134, dur: "3:05" },
  { title: "Christina Perri - A Thousand Years", artist: "LatinHype", uses: 1125, dur: "4:46" },
  { title: "Xứng Đôi Cưới Thôi", artist: "Lê Thiện Hiếu", uses: 886, dur: "3:22" },
  { title: "Until I Found You", artist: "Stephen Sanchez, Em Beihold", uses: 787, dur: "2:55" },
  { title: "You Are The Reason", artist: "Calum Scott", uses: 741, dur: "3:15" },
  { title: "Can't Help Falling In Love", artist: "Elvis Presley", uses: 621, dur: "3:00" },
  { title: "Ngày Xuân Vui Cưới (Giao Hưởng)", artist: "IOF VIET NAM", uses: 579, dur: "3:37" },
  { title: "Yêu Là Cưới", artist: "Phát Hồ", uses: 482, dur: "2:52" },
  { title: "Photograph", artist: "Ed Sheeran", uses: 475, dur: "4:34" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", uses: 146, dur: "4:41" },
  { title: "Nơi Này Có Anh", artist: "Sơn Tùng M-TP", uses: 129, dur: "4:38" },
  { title: "Canon in D Major", artist: "Johann Pachelbel", uses: 112, dur: "3:54" },
  { title: "At Last", artist: "Etta James", uses: 28, dur: "3:00" },
  { title: "The Way You Look Tonight", artist: "Frank Sinatra", uses: 28, dur: "3:15" },
  { title: "Unchained Melody", artist: "Righteous Brothers", uses: 27, dur: "3:30" },
];

export default function MusicPicker({ current, onPick, onClose }: { current: string; onPick: (name: string) => void; onClose: () => void }) {
  const [tab, setTab] = useState<"lib" | "mine">("lib");
  const [q, setQ] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);
  const [mine, setMine] = useState<Song[]>([]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const list = (tab === "lib" ? LIBRARY : mine).filter((s) => (s.title + " " + s.artist).toLowerCase().includes(q.trim().toLowerCase()));

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files).map((f) => ({ title: f.name.replace(/\.[^.]+$/, ""), artist: "Nhạc của bạn", uses: 0, dur: "--:--" }));
    setMine((m) => [...added, ...m]);
    setTab("mine");
  };

  return (
    <div className="mp-back" onMouseDown={onClose}>
      <div className="mp" onMouseDown={(e) => e.stopPropagation()}>
        <div className="mp-head">
          <button aria-label="Đóng" className="mp-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
          <h2>Chọn Nhạc Nền</h2>
          <div style={{ width: 32 }} />
        </div>
        <div className="mp-tabs">
          <button className={"mp-btn" + (tab === "lib" ? " primary" : "")} onClick={() => setTab("lib")}>Thư Viện</button>
          <div style={{ flex: 1 }} />
          <label className={"mp-btn" + (tab === "mine" ? " primary" : "")} style={{ cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
            <span>Thêm nhạc</span>
            <input type="file" accept="audio/*" multiple hidden onChange={(e) => addFiles(e.target.files)} />
          </label>
        </div>
        <div className="mp-search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
          <input placeholder="Tìm kiếm bài hát..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="mp-list">
          {list.map((s) => (
            <div className={"mp-row" + (current === s.title ? " sel" : "")} key={s.title + s.artist} onClick={() => { onPick(s.title); onClose(); }}>
              <button type="button" className="mp-play" aria-label={playing === s.title ? "Dừng" : "Phát"}
                onClick={(e) => { e.stopPropagation(); setPlaying(playing === s.title ? null : s.title); }}>
                {playing === s.title ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
              <div className="mp-info"><p className="t">{s.title}</p><p className="a">{s.artist}</p></div>
              <div className="mp-meta">{s.uses > 0 && <span className="mp-badge">{s.uses} lượt dùng</span>}<span>{s.dur}</span></div>
            </div>
          ))}
          {list.length === 0 && <p className="mp-empty">{tab === "mine" ? "Bạn chưa thêm bài nhạc nào." : "Không tìm thấy bài hát."}</p>}
        </div>
        <div className="mp-foot">
          <button className="mp-none" onClick={() => { onPick(""); onClose(); }}>Không Sử Dụng Nhạc</button>
        </div>
      </div>
    </div>
  );
}
