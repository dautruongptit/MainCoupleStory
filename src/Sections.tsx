import { useRef, useState } from "react";
import MusicPicker from "./MusicPicker";
import { CropModal } from "./HeroPhoto";
import { Inv, Gift, groomShown, brideShown } from "./data";
import { Field, Helper, Hint, Input, Modal, OutlineButton, ResetInput, Row, Section, Segmented, Textarea, Toggle, Icon } from "./ui";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

export function Basic({ d, set }: P) {
  return (
    <Section title="Thông tin cơ bản" icon={<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}>
      <Field label="Lời mở đầu" cap>
        <label className="inline-toggle"><span className="inline-r" style={{ marginLeft: "auto" }}><em>Mặc định</em><Toggle on={d.introCustom} onChange={(v) => set({ introCustom: v })} /></span></label>
        {d.introCustom ? (
          <Input placeholder="The Wedding Of" value={d.introText} onChange={(e) => set({ introText: e.target.value })} />
        ) : (
          <div className="hint intro-hint">
            <svg width="16" height="16" fill="none" stroke="#fbbd23" viewBox="0 0 24 24" style={{ flex: "none", marginTop: 2 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <span>Đang dùng chữ mặc định của mẫu:<b style={{ display: "block", marginTop: 4, fontWeight: 500 }}>“The Wedding Of”</b></span>
          </div>
        )}
      </Field>
      <Row>
        <Field label="Họ tên chú rể" half><Input placeholder="VD: Nguyễn Thế Bảo" value={d.groomFull} onChange={(e) => set({ groomFull: e.target.value })} /></Field>
        <Field label="Họ tên cô dâu" half><Input placeholder="VD: Trần Ngọc Ánh" value={d.brideFull} onChange={(e) => set({ brideFull: e.target.value })} /></Field>
      </Row>
      <Row>
        <Field label="Tên ngắn chú rể" half><ResetInput value={d.groomNick} onChange={(v) => set({ groomNick: v })} placeholder={d.groomFull} /></Field>
        <Field label="Tên ngắn cô dâu" half><ResetInput value={d.brideNick} onChange={(v) => set({ brideNick: v })} placeholder={d.brideFull} /></Field>
      </Row>
      <Row>
        <Field label="Danh xưng chú rể" half><Input placeholder="VD: Trưởng Nam" value={d.groomRole} onChange={(e) => set({ groomRole: e.target.value })} /></Field>
        <Field label="Danh xưng cô dâu" half><Input placeholder="VD: Út Nữ" value={d.brideRole} onChange={(e) => set({ brideRole: e.target.value })} /></Field>
      </Row>
      <Field label="Thứ tự hiển thị" cap>
        <Segmented value={d.order} onChange={(v) => set({ order: v })}
          options={[{ value: "groom", label: "Nhà trai trước" }, { value: "bride", label: "Nhà gái trước" }]} />
        <Helper>{d.order === "groom" ? "Hiển thị tên chú rể và nhà trai trước trên thiệp" : "Hiển thị tên cô dâu và nhà gái trước trên thiệp"}</Helper>
      </Field>
    </Section>
  );
}

function LayoutIcon({ k }: { k: "grid" | "collage" | "3d" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      {k === "grid" && (<><rect x="2" y="2" width="9" height="9" rx="1.5" /><rect x="13" y="2" width="9" height="9" rx="1.5" /><rect x="2" y="13" width="9" height="9" rx="1.5" /><rect x="13" y="13" width="9" height="9" rx="1.5" /></>)}
      {k === "collage" && (<><rect x="2" y="2" width="20" height="10" rx="1.5" /><rect x="2" y="14" width="9" height="8" rx="1.5" /><rect x="13" y="14" width="9" height="8" rx="1.5" /></>)}
      {k === "3d" && (<>
        <rect x="-3.5" y="-6" width="7" height="12" rx="1" fill="currentColor" opacity=".15" stroke="currentColor" strokeWidth="1" transform="translate(4.5,11) skewY(4)" />
        <rect x="-3.5" y="-6" width="7" height="12" rx="1" fill="currentColor" opacity=".15" stroke="currentColor" strokeWidth="1" transform="translate(19.5,11) skewY(-4)" />
        <rect x="6" y="3" width="12" height="16" rx="1.5" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.5" />
      </>)}
    </svg>
  );
}

export function Album({ d, set }: P) {
  const [up, setUp] = useState<{ done: number; total: number } | null>(null);
  const latest = useRef(d.photos);
  latest.current = d.photos;
  const add = async (files: FileList | null) => {
    if (!files || up) return;
    const list = Array.from(files).slice(0, 20 - d.photos.length);
    if (!list.length) return;
    const urls: string[] = [];
    setUp({ done: 0, total: list.length });
    for (const f of list) {
      await new Promise((r) => setTimeout(r, 300));
      urls.push(URL.createObjectURL(f));
      setUp({ done: urls.length, total: list.length });
    }
    set({ photos: [...latest.current, ...urls].slice(0, 20) });
    setUp(null);
  };
  const upText = up ? `Đang tải lên ${Math.min(up.done + 1, up.total)}/${up.total}...` : "";
  const [menu, setMenu] = useState<number | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [crop, setCrop] = useState<number | null>(null);
  const move = (from: number, to: number) => {
    if (from === to) return;
    const next = [...d.photos];
    next.splice(to, 0, next.splice(from, 1)[0]);
    set({ photos: next });
  };
  const galleryIcon = (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  );
  return (
    <Section title="Thư viện ảnh" icon={galleryIcon} enabled={d.albumOn} onEnabled={(v) => set({ albumOn: v })} enabledLabel="Hiện">
      <Field label="KIỂU HIỂN THỊ" cap>
        <Segmented value={d.albumLayout} onChange={(v) => set({ albumLayout: v })}
          options={[{ value: "grid", label: "Lưới", icon: <LayoutIcon k="grid" /> }, { value: "collage", label: "Ghép ảnh", icon: <LayoutIcon k="collage" /> }, { value: "3d", label: "3D", icon: <LayoutIcon k="3d" /> }]} />
      </Field>
      <div className="lbl-row"><span className="lbl">Thư viện ảnh</span><span className="helper">{d.photos.length} ảnh</span></div>
      {up && (
        <div className="up-prog">
          <progress value={Math.round((up.done / up.total) * 100)} max={100} />
          <p>{upText}</p>
        </div>
      )}
      {d.photos.length === 0 ? (
        <label className="album-empty-add">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
          <span style={{ fontSize: "13px", fontWeight: 500 }}>Thêm ảnh</span>
          <input type="file" accept="image/*" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
        </label>
      ) : (
        <div className="photos">
          {d.photos.map((p, i) => (
            <div className={"photo" + (drag === i ? " drag" : "")} key={p} draggable
              onDragStart={() => { setDrag(i); setMenu(null); }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (drag !== null) move(drag, i); setDrag(null); }}
              onDragEnd={() => setDrag(null)}>
              <img src={p} alt={`Gallery ${i + 1}`} draggable={false}
                style={d.photoCrops[p] ? { objectPosition: `${d.photoCrops[p].x}% ${d.photoCrops[p].y}%`, transform: `scale(${d.photoCrops[p].z})`, transformOrigin: `${d.photoCrops[p].x}% ${d.photoCrops[p].y}%` } : undefined} />
              <button type="button" className="photo-menu" aria-label="Menu" onClick={() => setMenu(menu === i ? null : i)}>
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="3" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="8" cy="13" r="1.5" /></svg>
              </button>
              {menu === i && (
                <div className="photo-pop">
                  <button type="button" aria-label="Cắt ảnh" title="Cắt ảnh" onClick={() => { setCrop(i); setMenu(null); }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14M2 6h14a2 2 0 0 1 2 2v14" /></svg>
                  </button>
                  <button type="button" className="del" aria-label="Xóa ảnh" title="Xóa ảnh" onClick={() => { set({ photos: d.photos.filter((_, j) => j !== i) }); setMenu(null); }}>{Icon.trash(20)}</button>
                  <button type="button" aria-label="Chuyển lên trước" title="Chuyển lên trước" disabled={i === 0} onClick={() => { move(i, i - 1); setMenu(null); }}>{Icon.back(20)}</button>
                  <button type="button" aria-label="Chuyển ra sau" title="Chuyển ra sau" disabled={i === d.photos.length - 1} onClick={() => { move(i, i + 1); setMenu(null); }}>{Icon.chevronRight(20)}</button>
                </div>
              )}
            </div>
          ))}
          {up ? (
            <div className="add-photo disabled">
              <span className="spinner" />
              <span>{upText}</span>
            </div>
          ) : d.photos.length < 20 && (
            <label className="add-photo">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
              <span>Thêm ảnh</span>
              <input type="file" accept="image/*" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
            </label>
          )}
        </div>
      )}
      <Helper>Hỗ trợ: JPG, PNG, GIF, WebP, HEIC. Tối đa 20 ảnh/lần.</Helper>
      {crop !== null && d.photos[crop] && (
        <CropModal title="Điều chỉnh ảnh" aspect={1} src={d.photos[crop]}
          zoom0={d.photoCrops[d.photos[crop]]?.z ?? 1} x0={d.photoCrops[d.photos[crop]]?.x ?? 50} y0={d.photoCrops[d.photos[crop]]?.y ?? 50}
          onApply={(z, x, y) => set({ photoCrops: { ...d.photoCrops, [d.photos[crop]]: { z, x, y } } })} onClose={() => setCrop(null)} />
      )}
    </Section>
  );
}

export function Family({ d, set }: P) {
  return (
    <Section title="Thông tin gia đình" enabled={d.familyOn} onEnabled={(v) => set({ familyOn: v })} enabledLabel="Hiện">
      <p className="sub">Nhà trai</p>
      <Field label="Danh xưng"><Input placeholder="VD: Ông Bà" value={d.groomFamTitle} onChange={(e) => set({ groomFamTitle: e.target.value })} /></Field>
      <Row>
        <Field label="Ông" half><Input placeholder="VD: Nguyễn Văn Hùng" value={d.groomFather} onChange={(e) => set({ groomFather: e.target.value })} /></Field>
        <Field label="Bà" half><Input placeholder="VD: Trần Thị Lan" value={d.groomMother} onChange={(e) => set({ groomMother: e.target.value })} /></Field>
      </Row>
      <Field label="Địa chỉ nhà trai"><Textarea rows={2} placeholder="Địa chỉ nhà trai" value={d.groomAddr} onChange={(e) => set({ groomAddr: e.target.value })} /></Field>
      <hr className="divider" />
      <p className="sub">Nhà gái</p>
      <Field label="Danh xưng"><Input placeholder="VD: Ông Bà" value={d.brideFamTitle} onChange={(e) => set({ brideFamTitle: e.target.value })} /></Field>
      <Row>
        <Field label="Ông" half><Input placeholder="VD: Trần Văn Minh" value={d.brideFather} onChange={(e) => set({ brideFather: e.target.value })} /></Field>
        <Field label="Bà" half><Input placeholder="VD: Phạm Thị Hoa" value={d.brideMother} onChange={(e) => set({ brideMother: e.target.value })} /></Field>
      </Row>
      <Field label="Địa chỉ nhà gái"><Textarea rows={2} placeholder="Địa chỉ nhà gái" value={d.brideAddr} onChange={(e) => set({ brideAddr: e.target.value })} /></Field>
    </Section>
  );
}

export function Announce({ d, set }: P) {
  return (
    <Section title="Lời thông báo" enabled={d.announceOn} onEnabled={(v) => set({ announceOn: v })} enabledLabel="Hiện">
      <Field label="Câu thông báo (để trống nếu không muốn hiện)">
        <Textarea rows={2} placeholder={"VD: TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}
          value={[d.announcementLine1, d.announcementLine2].filter((x) => x !== undefined).join("\n")}
          onChange={(e) => { const [a = "", ...r] = e.target.value.split("\n"); set({ announcementLine1: a, announcementLine2: r.join("\n") }); }} />
      </Field>
    </Section>
  );
}

export function Ceremony({ d, set }: P) {
  const upd = (i: number, p: Partial<Inv["ceremonies"][number]>) =>
    set({ ceremonies: d.ceremonies.map((c, j) => (j === i ? { ...c, ...p } : c)) });
  return (
    <Section title="Lễ" >
      <Field label="Tiêu đề mục"><Input value={d.ceremonyTitle} onChange={(e) => set({ ceremonyTitle: e.target.value })} /></Field>
      <Helper>Tiêu đề in phía trên mục này trên thiệp. Để trống nếu bạn muốn bỏ hẳn.</Helper>
      {d.ceremonies.length === 0 && <Hint>Bạn có tổ chức lễ vu quy/lễ thành hôn tại nhà không? Nếu có, hãy bấm nút bên dưới để thêm lễ!</Hint>}
      {d.ceremonies.map((c, i) => (
        <div className="mini-col" key={i}>
          <Row>
            <Field label="Tên lễ" half><Input placeholder="Ví dụ: Lễ gia tiên" value={c.title} onChange={(e) => upd(i, { title: e.target.value })} /></Field>
            <button className="icon-ghost sm" aria-label="Xoá lễ" onClick={() => set({ ceremonies: d.ceremonies.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
          </Row>
          <Row>
            <Field label="Ngày" half><Input type="date" value={c.date} onChange={(e) => upd(i, { date: e.target.value })} /></Field>
            <Field label="Giờ" half><Input type="time" value={c.time} onChange={(e) => upd(i, { time: e.target.value })} /></Field>
          </Row>
          <Field label="Địa điểm"><Input value={c.place} onChange={(e) => upd(i, { place: e.target.value })} /></Field>
        </div>
      ))}
      <OutlineButton onClick={() => set({ ceremonies: [...d.ceremonies, { title: "", date: "", time: "", place: "" }] })}>
        {Icon.plus(16)} Thêm lễ
      </OutlineButton>
    </Section>
  );
}

export function Banquet({ d, set }: P) {
  return (
    <Section title="Tiệc cưới" enabled={d.partyOn} onEnabled={(v) => set({ partyOn: v })} enabledLabel="Hiện">
      <Segmented value={d.banquetType} onChange={(v) => set({ banquetType: v })}
        options={[{ value: "wedding", label: "Tiệc cưới" }, { value: "reception", label: "Tiệc báo hỷ" }, { value: "engagement", label: "Tiệc đính hôn" }]} />
      <Field label="Tiêu đề mục"><Input value={d.banquetTitle} onChange={(e) => set({ banquetTitle: e.target.value })} /></Field>
      <Helper>Tiêu đề in phía trên mục này trên thiệp. Để trống nếu bạn muốn bỏ hẳn.</Helper>
      <Field label="Ngày tổ chức"><Input type="date" value={d.date} onChange={(e) => set({ date: e.target.value })} /></Field>
      <Field label="Giờ tổ chức"><Input type="time" value={d.time} onChange={(e) => set({ time: e.target.value })} /></Field>
      <Helper>Giờ chính hiển thị lớn trên thiệp, dùng cho đếm ngược và thêm vào lịch.</Helper>
      <Field label="Định dạng giờ">
        <Segmented value={d.clock} onChange={(v) => set({ clock: v })} options={[{ value: "24h", label: "24 giờ" }, { value: "ampm", label: "Sáng/Chiều" }]} />
      </Field>
      <div className="mini-col">
        <div className="inline-toggle">
          <div><strong>Giờ Đón khách &amp; Khai tiệc</strong><Helper>Thiệp chỉ hiển thị giờ tổ chức. Bật để thêm giờ đón khách và khai tiệc.</Helper></div>
          <span className="inline-r"><em>{d.hideWelcomeTimes ? "Ẩn" : "Hiển thị"}</em><Toggle on={!d.hideWelcomeTimes} onChange={(v) => set({ hideWelcomeTimes: !v })} /></span>
        </div>
        {!d.hideWelcomeTimes && (
          <Row>
            <Field label="Giờ đón khách" half><Input type="time" value={d.welcomeTime} onChange={(e) => set({ welcomeTime: e.target.value })} /></Field>
            <Field label="Giờ khai tiệc" half><Input type="time" value={d.startTime} onChange={(e) => set({ startTime: e.target.value })} /></Field>
          </Row>
        )}
      </div>
      <label className="inline-toggle"><span className="lbl">Đồng hồ đếm ngược</span><span className="inline-r"><em>{d.countdown ? "Hiện" : "Ẩn"}</em><Toggle on={d.countdown} onChange={(v) => set({ countdown: v })} /></span></label>
      <hr className="divider" />
      <Field label="Tiêu đề mục địa điểm"><Input value={d.locTitle} onChange={(e) => set({ locTitle: e.target.value })} /></Field>
      <Field label="Địa chỉ"><Textarea rows={2} placeholder="Địa chỉ tiệc cưới" value={d.address} onChange={(e) => set({ address: e.target.value })} /></Field>
      <label className="inline-toggle"><span className="lbl">Bản đồ</span><span className="inline-r"><em>{d.showMap ? "Hiện" : "Ẩn"}</em><Toggle on={d.showMap} onChange={(v) => set({ showMap: v })} /></span></label>
      <Helper>Bản đồ nằm trong phần này, nên ẩn cả phần thì bản đồ cũng ẩn theo, và công tắc riêng của bản đồ nằm ở đây.</Helper>
      <MapBox d={d} set={set} />
    </Section>
  );
}

function MapBox({ d, set }: P) {
  const [edit, setEdit] = useState(false);
  return (
    <div className="mini-col">
      <div className="mini-row">
        <p className="helper">Bản đồ tự động hiển thị theo địa chỉ tiệc cưới. Chỉ nên thay đổi nếu vị trí trên bản đồ không chính xác.</p>
        <button type="button" className="link-btn" onClick={() => setEdit(!edit)}>{edit ? "Xong" : "Thay đổi"}</button>
      </div>
      {edit && (
        <Field label="Liên kết bản đồ tùy chỉnh"><Input placeholder="https://maps.google.com/..." value={d.mapUrl} onChange={(e) => set({ mapUrl: e.target.value })} /></Field>
      )}
    </div>
  );
}

export function Rsvp({ d, set }: P) {
  const upd = (i: number, v: string) => set({ questions: d.questions.map((q, j) => (j === i ? v : q)) });
  return (
    <Section title="Xác nhận tham dự (RSVP)" enabled={d.rsvpOn} onEnabled={(v) => set({ rsvpOn: v })} enabledLabel="Hiện">
      <Hint>Khách mời có thể xác nhận tham dự trực tiếp trên thiệp. Xem danh sách xác nhận trong trang Quản lý khách mời</Hint>
      <Field label="Kiểu hiển thị" cap>
        <Segmented value={d.rsvpDisplay} onChange={(v) => set({ rsvpDisplay: v })} options={[{ value: "button", label: "Nút bấm" }, { value: "inline", label: "Hiện trực tiếp" }]} />
        <Helper>{d.rsvpDisplay === "button" ? "Khách bấm nút để mở form xác nhận trong cửa sổ popup" : "Form xác nhận hiển thị trực tiếp trên thiệp"}</Helper>
      </Field>
      <Field label="Số người mỗi thiệp" cap>
        <Segmented value={d.partyMode} onChange={(v) => set({ partyMode: v })} options={[{ value: "free", label: "Khách tự chọn" }, { value: "limit", label: "Giới hạn" }]} />
        <Helper>{d.partyMode === "free" ? "Khách tự điền số người sẽ đến." : "Giới hạn số người tối đa cho mỗi thiệp."}</Helper>
      </Field>
      {d.partyMode === "limit" && (
        <Field label="Giới hạn tối đa"><Input type="number" min={1} value={d.partyLimit} onChange={(e) => set({ partyLimit: Math.max(1, Number(e.target.value) || 1) })} /></Field>
      )}
      <Field label="Câu hỏi thêm cho khách mời">
        <Helper>Khách trả lời khi xác nhận tham dự trên thiệp</Helper>
        {d.questions.map((q, i) => (
          <Row key={i}>
            <Input value={q} placeholder="Nhập câu hỏi" onChange={(e) => upd(i, e.target.value)} />
            <button className="icon-ghost sm" aria-label="Xoá câu hỏi" onClick={() => set({ questions: d.questions.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
          </Row>
        ))}
        <OutlineButton onClick={() => set({ questions: [...d.questions, ""] })}>{Icon.plus(16)} Thêm câu hỏi</OutlineButton>
      </Field>
    </Section>
  );
}

export function Dress({ d, set }: P) {
  return (
    <Section title="Dress Code" enabled={d.dressOn} onEnabled={(v) => set({ dressOn: v })} enabledLabel="">
      <Hint>Bật để gợi ý trang phục cho khách mời theo màu sắc chủ đạo của tiệc cưới.</Hint>
      <Field label="Gợi ý trang phục"><Textarea value={d.dressText} onChange={(e) => set({ dressText: e.target.value })} /></Field>
      <Field label="Bảng màu trang phục (Dress code colors)">
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "4px" }}>
          {(d.dressColors || ["#651212", "#8d3a3a", "#ffb2b2"]).map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="color"
                value={c}
                onChange={(e) => {
                  const updated = [...(d.dressColors || ["#651212", "#8d3a3a", "#ffb2b2"])];
                  updated[i] = e.target.value;
                  set({ dressColors: updated });
                }}
                style={{ width: "32px", height: "32px", border: "0", borderRadius: "50%", cursor: "pointer", background: "none" }}
              />
              <span style={{ fontSize: "11px", opacity: 0.8 }}>{c}</span>
            </div>
          ))}
        </div>
      </Field>
    </Section>
  );
}

export function Schedule({ d, set }: P) {
  const upd = (i: number, p: Partial<{ time: string; text: string }>) =>
    set({ sched: d.sched.map((s, j) => (j === i ? { ...s, ...p } : s)) });

  const move = (from: number, to: number) => {
    if (to < 0 || to >= d.sched.length) return;
    const next = [...d.sched];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    set({ sched: next });
  };

  const remove = (i: number) => {
    set({ sched: d.sched.filter((_, j) => j !== i) });
  };

  return (
    <Section
      title={d.schedTitle || "LỊCH TRÌNH NGÀY CƯỚI"}
      onTitle={(v) => set({ schedTitle: v })}
      enabled={d.schedOn}
      onEnabled={(v) => set({ schedOn: v })}
      enabledLabel="Hiện"
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 7v5l3 3" />
        </svg>
      }
    >
      <div className="space-y-3 pt-2">
        {d.sched.map((s, i) => (
          <div className="sched-card" key={i}>
            <div className="sched-card-header">
              <span className="sched-card-title">Hoạt động {i + 1}</span>
              <div className="sched-card-actions">
                <button
                  type="button"
                  className="sched-btn-icon"
                  disabled={i === 0}
                  onClick={() => move(i, i - 1)}
                  aria-label="Di chuyển lên"
                  title="Di chuyển lên"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="sched-btn-icon"
                  disabled={i === d.sched.length - 1}
                  onClick={() => move(i, i + 1)}
                  aria-label="Di chuyển xuống"
                  title="Di chuyển xuống"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="sched-btn-icon delete"
                  onClick={() => remove(i)}
                  aria-label="Xóa hoạt động"
                  title="Xóa"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="sched-card-body">
              <div className="sched-input-group">
                <label>Giờ</label>
                <div className="sched-time-input-wrap">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 7v5l3 3" />
                  </svg>
                  <Input
                    type="text"
                    value={s.time}
                    placeholder="09:00"
                    onChange={(e) => upd(i, { time: e.target.value })}
                  />
                </div>
              </div>
              <div className="sched-input-group">
                <label>Nội dung</label>
                <Input
                  type="text"
                  value={s.text}
                  placeholder="VD: Đón khách"
                  onChange={(e) => upd(i, { text: e.target.value })}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn-outline-pill-full"
          onClick={() => set({ sched: [...d.sched, { time: "18:00", text: "" }] })}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm hoạt động
        </button>

        <Helper>Bật để hiển thị lịch trình các hoạt động trong ngày cưới (đón khách, lễ gia tiên, khai tiệc...) cho khách mời.</Helper>
      </div>
    </Section>
  );
}

export function Guestbook({ d, set }: P) {
  return (
    <Section title="Sổ lưu bút" enabled={d.guestOn} onEnabled={(v) => set({ guestOn: v })} enabledLabel="Hiện">
      <a className="mini-card link-card" href="#guests">
        <div><strong>{d.wishes.length} lời chúc</strong><Helper>Xem và quản lý</Helper></div>
        {Icon.chevronRight(16)}
      </a>
    </Section>
  );
}

export const VN_BANKS = [
  { code: "ICB", name: "VietinBank", bin: "970415", shortName: "VietinBank" },
  { code: "VCB", name: "Vietcombank", bin: "970436", shortName: "Vietcombank" },
  { code: "BIDV", name: "BIDV", bin: "970418", shortName: "BIDV" },
  { code: "MB", name: "MB Bank", bin: "970422", shortName: "MB Bank" },
  { code: "TCB", name: "Techcombank", bin: "970407", shortName: "Techcombank" },
  { code: "ACB", name: "ACB", bin: "970416", shortName: "ACB" },
  { code: "VPB", name: "VPBank", bin: "970432", shortName: "VPBank" },
  { code: "TPB", name: "TPBank", bin: "970423", shortName: "TPBank" },
  { code: "VBA", name: "Agribank", bin: "970405", shortName: "Agribank" },
  { code: "STB", name: "Sacombank", bin: "970403", shortName: "Sacombank" },
  { code: "HDB", name: "HDBank", bin: "970437", shortName: "HDBank" },
  { code: "VIB", name: "VIB", bin: "970441", shortName: "VIB" },
  { code: "SHB", name: "SHB", bin: "970443", shortName: "SHB" },
  { code: "MSB", name: "MSB", bin: "970426", shortName: "MSB" },
  { code: "OCB", name: "OCB", bin: "970448", shortName: "OCB" },
  { code: "SEAB", name: "SeABank", bin: "970440", shortName: "SeABank" },
  { code: "CAKE", name: "Cake by VPBank", bin: "546034", shortName: "Cake" },
  { code: "TIMO", name: "Timo", bin: "963388", shortName: "Timo" },
];

export function GiftBox({ d, set }: P) {
  const [openModal, setOpenModal] = useState(false);
  const [openOtherModal, setOpenOtherModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [who, setWho] = useState<Gift["who"]>("groom");
  const [customLabel, setCustomLabel] = useState("");
  const [selectedBank, setSelectedBank] = useState(VN_BANKS[0]);
  const [bankSearch, setBankSearch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handleOpenAdd = () => {
    setEditId(null);
    setWho("groom");
    setCustomLabel("");
    setSelectedBank(VN_BANKS[0]);
    setAccountNumber("");
    setAccountName("");
    setBankSearch("");
    setOpenModal(true);
  };

  const handleEdit = (g: Gift) => {
    setEditId(g.id);
    setWho(g.who);
    setCustomLabel(g.customLabel || "");
    const found = VN_BANKS.find((b) => b.code === g.bankCode) || {
      code: g.bankCode,
      name: g.bankName,
      bin: g.bankBin || "970415",
      shortName: g.bankName,
    };
    setSelectedBank(found);
    setAccountNumber(g.accountNumber);
    setAccountName(g.accountName);
    setBankSearch("");
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    set({ gifts: d.gifts.filter((g) => g.id !== id) });
  };

  const handleSave = () => {
    if (!accountNumber.trim() || !accountName.trim()) return;
    const cleanNum = accountNumber.trim().replace(/[\s-]+/g, "");
    const cleanName = accountName.trim().toUpperCase();
    const qrUrl = `https://api.vietqr.io/image/${selectedBank.bin || "970415"}-${cleanNum}-print.png?accountName=${encodeURIComponent(cleanName)}`;

    if (editId) {
      set({
        gifts: d.gifts.map((g) =>
          g.id === editId
            ? {
                ...g,
                who,
                customLabel: who === "custom" ? customLabel.trim() : undefined,
                bankName: selectedBank.name,
                bankCode: selectedBank.code,
                bankBin: selectedBank.bin,
                bankLogo: `https://api.vietqr.io/img/${selectedBank.code}.png`,
                accountNumber: cleanNum,
                accountName: cleanName,
                qrUrl,
              }
            : g
        ),
      });
    } else {
      const newGift: Gift = {
        id: "gift-" + Date.now(),
        who,
        customLabel: who === "custom" ? customLabel.trim() : undefined,
        bankName: selectedBank.name,
        bankCode: selectedBank.code,
        bankBin: selectedBank.bin,
        bankLogo: `https://api.vietqr.io/img/${selectedBank.code}.png`,
        accountNumber: cleanNum,
        accountName: cleanName,
        qrUrl,
      };
      set({ gifts: [...d.gifts, newGift] });
    }
    setOpenModal(false);
  };

  const getWhoTitle = (g: Gift) => {
    if (g.who === "custom" && g.customLabel) return g.customLabel;
    if (g.who === "groom") return "Chú Rể";
    if (g.who === "bride") return "Cô Dâu";
    return "Tùy chọn";
  };

  const filteredBanks = VN_BANKS.filter(
    (b) =>
      b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.code.toLowerCase().includes(bankSearch.toLowerCase())
  );

  return (
    <Section
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      }
      title={d.giftTitle || "Hộp Quà Mừng"}
      onTitle={(v) => set({ giftTitle: v })}
      enabled={d.giftOn}
      onEnabled={(v) => set({ giftOn: v })}
      enabledLabel="Hiện"
    >
      <div className="space-y-3 pt-2">
        <div className="space-y-3">
          {d.gifts.length === 0 ? (
            <div className="empty-box">Chưa có tài khoản nào. Nhấn nút bên dưới để thêm.</div>
          ) : (
            d.gifts.map((g) => (
              <div className="flex items-start gap-3 rounded-xl border border-base-300 bg-base-100 p-3" key={g.id}>
                <div
                  className="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "rgba(225, 29, 72, 0.08)" }}
                >
                  <img
                    alt={g.bankName}
                    className="w-full h-full object-contain p-1.5"
                    src={g.bankLogo || `https://api.vietqr.io/img/${g.bankCode}.png`}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight break-words">{getWhoTitle(g)}</p>
                  <p className="text-xs text-base-content/70 mt-1 break-words">{g.accountName}</p>
                  <p className="text-xs font-mono text-base-content/70 mt-0.5 break-all">{g.accountNumber}</p>
                  <p className="text-xs text-base-content/50 mt-0.5 break-words">{g.bankName}</p>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    className="btn btn-xs btn-ghost btn-square"
                    aria-label="Sửa"
                    onClick={() => handleEdit(g)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-xs btn-ghost btn-square text-error/80 hover:text-error"
                    aria-label="Xóa"
                    onClick={() => handleDelete(g.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            type="button"
            className="btn-outline-pill-full"
            onClick={handleOpenAdd}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm tài khoản ngân hàng
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs w-full opacity-70 text-center"
            data-bot-screenshot-id="editor-gift-add-method"
            onClick={() => setOpenOtherModal(true)}
          >
            Phương thức khác
          </button>
        </div>

        {/* Display Mode Selector (3 Tabs) */}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-base-content/60">KIỂU HIỂN THỊ</p>
          <div className="flex items-stretch gap-1 p-1 bg-base-200 rounded-lg" style={{ backgroundColor: "#171412" }}>
            <button
              type="button"
              className={`flex-1 flex flex-col items-center justify-center gap-1 px-1.5 py-2 text-[11px] leading-tight text-center rounded-md transition-all sm:flex-row sm:gap-1.5 sm:py-1.5 sm:px-3 sm:text-sm ${
                d.giftDisplayMode === "gift_box"
                  ? "shadow-sm font-medium"
                  : "hover:text-base-content"
              }`}
              style={{
                backgroundColor: d.giftDisplayMode === "gift_box" ? "#26221f" : "transparent",
                color: d.giftDisplayMode === "gift_box" ? "#fc0081" : "rgba(255, 255, 255, 0.6)",
              }}
              onClick={() => set({ giftDisplayMode: "gift_box" })}
            >
              <span className="shrink-0" aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                </svg>
              </span>
              <span className="block text-balance">Hộp quà</span>
            </button>
            <button
              type="button"
              className={`flex-1 flex flex-col items-center justify-center gap-1 px-1.5 py-2 text-[11px] leading-tight text-center rounded-md transition-all sm:flex-row sm:gap-1.5 sm:py-1.5 sm:px-3 sm:text-sm ${
                d.giftDisplayMode === "envelope"
                  ? "shadow-sm font-medium"
                  : "hover:text-base-content"
              }`}
              style={{
                backgroundColor: d.giftDisplayMode === "envelope" ? "#26221f" : "transparent",
                color: d.giftDisplayMode === "envelope" ? "#fc0081" : "rgba(255, 255, 255, 0.6)",
              }}
              onClick={() => set({ giftDisplayMode: "envelope" })}
            >
              <span className="shrink-0" aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="block text-balance">Phong bì</span>
            </button>
            <button
              type="button"
              className={`flex-1 flex flex-col items-center justify-center gap-1 px-1.5 py-2 text-[11px] leading-tight text-center rounded-md transition-all sm:flex-row sm:gap-1.5 sm:py-1.5 sm:px-3 sm:text-sm ${
                d.giftDisplayMode === "qr_inline"
                  ? "shadow-sm font-medium"
                  : "hover:text-base-content"
              }`}
              style={{
                backgroundColor: d.giftDisplayMode === "qr_inline" ? "#26221f" : "transparent",
                color: d.giftDisplayMode === "qr_inline" ? "#fc0081" : "rgba(255, 255, 255, 0.6)",
              }}
              onClick={() => set({ giftDisplayMode: "qr_inline" })}
            >
              <span className="shrink-0" aria-hidden="true">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h8v8H3V3zm2 2v4h4V5H5z" />
                  <rect x="6" y="6" width="2" height="2" />
                  <path d="M13 3h8v8h-8V3zm2 2v4h4V5h-4z" />
                  <rect x="16" y="6" width="2" height="2" />
                  <path d="M3 13h8v8H3v-8zm2 2v4h4v-4H5z" />
                  <rect x="6" y="16" width="2" height="2" />
                  <rect x="13" y="13" width="3" height="3" />
                  <rect x="18" y="13" width="3" height="3" />
                  <rect x="13" y="18" width="3" height="3" />
                  <rect x="18" y="18" width="3" height="3" />
                </svg>
              </span>
              <span className="block text-balance">Hiện QR trực tiếp</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: ADD / EDIT VIETQR BANK */}
      {openModal && (
        <Modal
          title={editId ? "Sửa tài khoản ngân hàng" : "Thêm tài khoản ngân hàng"}
          onClose={() => setOpenModal(false)}
        >
          <div className="space-y-4 pt-1">
            {/* For Who */}
            <div>
              <label className="lbl">Dành cho</label>
              <div className="chips">
                <button
                  type="button"
                  className={who === "groom" ? "chip active" : "chip"}
                  onClick={() => setWho("groom")}
                >
                  Chú Rể
                </button>
                <button
                  type="button"
                  className={who === "bride" ? "chip active" : "chip"}
                  onClick={() => setWho("bride")}
                >
                  Cô Dâu
                </button>
                <button
                  type="button"
                  className={who === "custom" ? "chip active" : "chip"}
                  onClick={() => setWho("custom")}
                >
                  Tùy chọn
                </button>
              </div>
            </div>

            {who === "custom" && (
              <Field label="Tiêu đề hiển thị">
                <Input
                  placeholder="VD: Gia đình Chú Rể, Bố Mẹ..."
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                />
              </Field>
            )}

            {/* Select Bank */}
            <div>
              <label className="lbl">Chọn ngân hàng</label>
              <Input
                placeholder="Tìm tên hoặc mã ngân hàng..."
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <div className="bank-select-grid">
                {filteredBanks.slice(0, 12).map((b) => {
                  const sel = selectedBank.code === b.code;
                  return (
                    <button
                      type="button"
                      key={b.code}
                      className={`bank-pill ${sel ? "selected" : ""}`}
                      onClick={() => setSelectedBank(b)}
                    >
                      <img
                        src={`https://api.vietqr.io/img/${b.code}.png`}
                        alt={b.name}
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                        }}
                      />
                      <span>{b.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Account Number */}
            <Field label="Số tài khoản *">
              <Input
                autoFocus
                placeholder="Nhập số tài khoản"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Field>

            {/* Account Name */}
            <Field label="Tên chủ tài khoản *">
              <Input
                placeholder="VD: NGUYEN VAN A"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value.toUpperCase())}
              />
            </Field>

            {/* Actions */}
            <div className="modal-actions">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setOpenModal(false)}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn-primary"
                disabled={!accountNumber.trim() || !accountName.trim()}
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: OTHER PAYMENT METHODS */}
      {openOtherModal && (
        <Modal
          title="Chọn phương thức nhận quà"
          onClose={() => setOpenOtherModal(false)}
        >
          <div className="space-y-4 pt-1">
            <p className="text-xs uppercase opacity-60 font-semibold">Phổ biến</p>
            <div className="payment-methods-grid">
              <button
                type="button"
                className="payment-method-card"
                onClick={() => {
                  setOpenOtherModal(false);
                  handleOpenAdd();
                }}
              >
                <div
                  className="payment-icon-wrap"
                  style={{ backgroundColor: "rgba(225, 29, 72, 0.08)" }}
                >
                  <img
                    alt="VietQR"
                    className="w-full h-full object-contain p-1"
                    src="https://chungdoi.com/icons/payments/vietqr.svg"
                  />
                </div>
                <span className="payment-title">VietQR</span>
              </button>

              <button
                type="button"
                className="payment-method-card"
                onClick={() => {
                  setOpenOtherModal(false);
                  handleOpenAdd();
                }}
              >
                <div
                  className="payment-icon-wrap"
                  style={{ backgroundColor: "rgba(0, 48, 135, 0.08)" }}
                >
                  <img
                    alt="PayPal"
                    className="w-full h-full object-contain p-1"
                    src="https://chungdoi.com/icons/payments/paypal.svg"
                  />
                </div>
                <span className="payment-title">PayPal</span>
              </button>

              <button
                type="button"
                className="payment-method-card"
                onClick={() => {
                  setOpenOtherModal(false);
                  handleOpenAdd();
                }}
              >
                <div
                  className="payment-icon-wrap"
                  style={{ backgroundColor: "rgba(22, 51, 0, 0.08)" }}
                >
                  <img
                    alt="Wise"
                    className="w-full h-full object-contain p-1"
                    src="https://chungdoi.com/icons/payments/wise.svg"
                  />
                </div>
                <span className="payment-title">Wise</span>
              </button>

              <button
                type="button"
                className="payment-method-card"
                data-bot-screenshot-id="editor-gift-registry"
                onClick={() => {
                  setOpenOtherModal(false);
                  handleOpenAdd();
                }}
              >
                <div
                  className="payment-icon-wrap"
                  style={{ backgroundColor: "rgba(124, 58, 237, 0.08)" }}
                >
                  <img
                    alt="Danh sách quà cưới"
                    className="w-full h-full object-contain p-1"
                    src="https://chungdoi.com/icons/payments/registry.svg"
                  />
                </div>
                <span className="payment-title">Danh sách quà cưới</span>
              </button>

              <button
                type="button"
                className="payment-method-card"
                onClick={() => {
                  setOpenOtherModal(false);
                  handleOpenAdd();
                }}
              >
                <div
                  className="payment-icon-wrap"
                  style={{ backgroundColor: "rgba(15, 118, 110, 0.08)" }}
                >
                  <img
                    alt="Ngân hàng"
                    className="w-full h-full object-contain p-1"
                    src="https://api.vietqr.io/img/ICB.png"
                  />
                </div>
                <span className="payment-title">Ngân hàng</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Section>
  );
}

export function Thanks({ d, set }: P) {
  return (
    <Section title="Lời cảm ơn" enabled={d.thanksOn} onEnabled={(v) => set({ thanksOn: v })} enabledLabel="Hiện">
      <Field label="Lời cảm ơn"><Textarea rows={3} placeholder="Cảm ơn bạn đã đến chung vui cùng chúng tôi!" value={d.thanks} onChange={(e) => set({ thanks: e.target.value })} /></Field>
    </Section>
  );
}

export function Music({ d, set }: P) {
  const [pick, setPick] = useState(false);
  return (
    <Section
      title="Nhạc nền"
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      }
    >
      <div className="music-box-container">
        <div className="music-disc-large">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </div>
        <p className="music-track-name">{d.musicName || "Chưa chọn nhạc nền"}</p>
        <button type="button" className="music-choose-btn" onClick={() => setPick(true)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          Chọn nhạc
        </button>
        {d.musicName && (
          <button
            type="button"
            className="link-btn"
            style={{ marginTop: 10 }}
            onClick={() => set({ musicName: "" })}
          >
            Bỏ chọn
          </button>
        )}
      </div>
      {pick && <MusicPicker current={d.musicName} onPick={(n) => set({ musicName: n })} onClose={() => setPick(false)} />}
    </Section>
  );
}

export function Envelope({ d, set }: P) {
  return (
    <Section title="Phong bì">
      <Field label="Lời mời">
        <Input placeholder="VD: Kính Mời" value={d.envelopeInviteMessage} onChange={(e) => set({ envelopeInviteMessage: e.target.value })} />
      </Field>
      <Helper>Áp dụng cho tất cả khách. Để thay đổi riêng từng khách, chỉnh trong phần <a className="link-btn" href="/guests">Quản lý khách mời</a>.</Helper>
    </Section>
  );
}

export function Share({ d, set }: P) {
  return (
    <Section title="Ảnh xem trước khi chia sẻ">
      <Helper>Ảnh hiển thị khi bạn gửi link thiệp qua Zalo, Facebook, Messenger. Chọn 1 trong 2 kiểu bên dưới.</Helper>
      <Segmented value={d.shareStyle} onChange={(v) => set({ shareStyle: v })} options={[{ value: "envelope", label: "Phong bì thiệp" }, { value: "photo", label: "Ảnh của bạn" }]} />
      <Helper>{d.shareStyle === "envelope" ? "Phong bì thiệp của bạn. Với link mời riêng, ảnh sẽ hiện tên khách được mời." : "Dùng ảnh đầu tiên trong thư viện làm ảnh chia sẻ."}</Helper>
      <p className="lbl">Xem trước</p>
      <div className="share-card">
        <div className="share-img">
          {d.shareStyle === "photo" && d.photos[0] ? <img src={d.photos[0]} alt="" /> : <span className="share-env">{d.envelopeText || "Lời mời"}<br />❦</span>}
        </div>
        <div className="share-txt">
          <small>chungdoi.com</small>
          <strong>{groomShown(d)} &amp; {brideShown(d)}</strong>
          <span>Thân mời quý khách đến dự lễ cưới của {groomShown(d)} &amp; {brideShown(d)}</span>
        </div>
      </div>
      <Helper>Zalo và Facebook lưu tạm ảnh xem trước, nên ảnh có thể chưa cập nhật ngay sau khi bạn chỉnh sửa.</Helper>
    </Section>
  );
}
