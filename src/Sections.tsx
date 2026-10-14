import { useState } from "react";
import { Inv, Gift, groomShown, brideShown } from "./data";
import { Field, Helper, Hint, Input, Modal, OutlineButton, ResetInput, Row, Section, Segmented, Textarea, Toggle, Icon } from "./ui";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

export function Basic({ d, set }: P) {
  return (
    <Section title="Thông tin cơ bản">
      <Row>
        <Field label="Họ và tên đầy đủ của chú rể" half><Input placeholder="Ví dụ: Nguyễn Văn A" value={d.groomFull} onChange={(e) => set({ groomFull: e.target.value })} /></Field>
        <Field label="Họ và tên đầy đủ của cô dâu" half><Input placeholder="Ví dụ: Trần Thị B" value={d.brideFull} onChange={(e) => set({ brideFull: e.target.value })} /></Field>
      </Row>
      <Row>
        <Field label="Biệt danh của chú rể" half><ResetInput value={d.groomNick} onChange={(v) => set({ groomNick: v })} placeholder={d.groomFull} /></Field>
        <Field label="Biệt danh của cô dâu" half><ResetInput value={d.brideNick} onChange={(v) => set({ brideNick: v })} placeholder={d.brideFull} /></Field>
      </Row>
      <Row>
        <Field label="Danh xưng của chú rể" half><Input placeholder="Ví dụ: Chú rể" value={d.groomRole} onChange={(e) => set({ groomRole: e.target.value })} /></Field>
        <Field label="Danh xưng của cô dâu" half><Input placeholder="Ví dụ: Cô dâu" value={d.brideRole} onChange={(e) => set({ brideRole: e.target.value })} /></Field>
      </Row>
      <Field label="Thứ tự hiển thị" cap>
        <Segmented value={d.order} onChange={(v) => set({ order: v })}
          options={[{ value: "groom", label: "Gia đình chú rể trước" }, { value: "bride", label: "Gia đình cô dâu trước" }]} />
        <Helper>Tên và gia đình của phía được chọn sẽ hiển thị trước trên thiệp mời.</Helper>
      </Field>
    </Section>
  );
}

function LayoutIcon({ k }: { k: "grid" | "collage" | "3d" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      {k === "grid" && (<><rect x="2" y="2" width="9" height="9" rx="1.5" /><rect x="13" y="2" width="9" height="9" rx="1.5" /><rect x="2" y="13" width="9" height="9" rx="1.5" /><rect x="13" y="13" width="9" height="9" rx="1.5" /></>)}
      {k === "collage" && (<><rect x="2" y="2" width="20" height="10" rx="1.5" /><rect x="2" y="14" width="9" height="8" rx="1.5" /><rect x="13" y="14" width="9" height="8" rx="1.5" /></>)}
      {k === "3d" && <rect x="6" y="3" width="12" height="16" rx="1.5" opacity=".6" />}
    </svg>
  );
}

export function Album({ d, set }: P) {
  const add = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    set({ photos: [...d.photos, ...urls].slice(0, 20) });
  };
  return (
    <Section title="Album ảnh" enabled={d.albumOn} onEnabled={(v) => set({ albumOn: v })}>
      <Field label="Bố cục trang" cap>
        <Segmented value={d.albumLayout} onChange={(v) => set({ albumLayout: v })}
          options={[{ value: "grid", label: "Lưới", icon: <LayoutIcon k="grid" /> }, { value: "collage", label: "Ghép ảnh", icon: <LayoutIcon k="collage" /> }, { value: "3d", label: "3D", icon: <LayoutIcon k="3d" /> }]} />
      </Field>
      <div className="lbl-row"><span className="lbl">Album ảnh</span><span className="helper">{d.photos.length} ảnh</span></div>
      <div className="photos">
        {d.photos.map((p, i) => (
          <div className="photo" key={p}>
            <img src={p} alt="" />
            <button aria-label="Xoá ảnh" onClick={() => set({ photos: d.photos.filter((_, j) => j !== i) })}>{Icon.trash(12)}</button>
          </div>
        ))}
        {d.photos.length < 20 && (
          <label className="add-photo">
            {Icon.plus(20)}
            <span>Thêm ảnh</span>
            <input type="file" accept="image/*" multiple hidden onChange={(e) => add(e.target.files)} />
          </label>
        )}
      </div>
      <Helper>Hỗ trợ: JPG, PNG, GIF, WebP, HEIC. Tối đa 20 ảnh.</Helper>
    </Section>
  );
}

export function Family({ d, set }: P) {
  return (
    <Section title="Thông tin gia đình" enabled={d.familyOn} onEnabled={(v) => set({ familyOn: v })}>
      <p className="sub">Gia đình chú rể</p>
      <Field label="Tiêu đề"><Input placeholder="Ví dụ: Ông bà" value={d.groomFamTitle} onChange={(e) => set({ groomFamTitle: e.target.value })} /></Field>
      <Row>
        <Field label="Cha" half><Input placeholder="Ví dụ: Nguyễn Văn A" value={d.groomFather} onChange={(e) => set({ groomFather: e.target.value })} /></Field>
        <Field label="Mẹ" half><Input placeholder="Ví dụ: Vương Thị B" value={d.groomMother} onChange={(e) => set({ groomMother: e.target.value })} /></Field>
      </Row>
      <Field label="Địa chỉ nhà chú rể"><Textarea rows={2} placeholder="Địa chỉ nhà chú rể" value={d.groomAddr} onChange={(e) => set({ groomAddr: e.target.value })} /></Field>
      <hr className="divider" />
      <p className="sub">Gia đình cô dâu</p>
      <Field label="Tiêu đề"><Input placeholder="Ví dụ: Ông bà" value={d.brideFamTitle} onChange={(e) => set({ brideFamTitle: e.target.value })} /></Field>
      <Row>
        <Field label="Cha" half><Input placeholder="Ví dụ: Lê Văn C" value={d.brideFather} onChange={(e) => set({ brideFather: e.target.value })} /></Field>
        <Field label="Mẹ" half><Input placeholder="Ví dụ: Phạm Thị D" value={d.brideMother} onChange={(e) => set({ brideMother: e.target.value })} /></Field>
      </Row>
      <Field label="Địa chỉ nhà cô dâu"><Textarea rows={2} placeholder="Địa chỉ nhà cô dâu" value={d.brideAddr} onChange={(e) => set({ brideAddr: e.target.value })} /></Field>
    </Section>
  );
}

export function Announce({ d, set }: P) {
  return (
    <Section title="Lời báo tin" enabled={d.announceOn} onEnabled={(v) => set({ announceOn: v })}>
      <Field label="Dòng tiêu đề 1">
        <Input placeholder="TRÂN TRỌNG BÁO TIN" value={d.announcementLine1} onChange={(e) => set({ announcementLine1: e.target.value })} />
      </Field>
      <Field label="Dòng tiêu đề 2">
        <Input placeholder="LỄ THÀNH HÔN CỦA CON CHÚNG TÔI" value={d.announcementLine2} onChange={(e) => set({ announcementLine2: e.target.value })} />
      </Field>
      <Field label="Nội dung tùy chỉnh (để trống nếu muốn ẩn)">
        <Textarea rows={2} placeholder="Ví dụ: Chúng tôi trân trọng kính mời bạn đến chứng kiến lễ cưới của con chúng tôi." value={d.announce} onChange={(e) => set({ announce: e.target.value })} />
      </Field>
    </Section>
  );
}

export function Ceremony({ d, set }: P) {
  const upd = (i: number, p: Partial<Inv["ceremonies"][number]>) =>
    set({ ceremonies: d.ceremonies.map((c, j) => (j === i ? { ...c, ...p } : c)) });
  return (
    <Section title="Lễ" >
      <Field label="Tiêu đề phần"><Input value={d.ceremonyTitle} onChange={(e) => set({ ceremonyTitle: e.target.value })} /></Field>
      <Helper>Tiêu đề hiển thị phía trên phần này trên thiệp mời. Để trống nếu muốn ẩn.</Helper>
      {d.ceremonies.length === 0 && <Hint>Bạn có tổ chức nghi lễ nào tại nhà không? Nếu có, hãy nhấn nút bên dưới để thêm lễ!</Hint>}
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
        {Icon.plus(16)} Thêm lễ mới
      </OutlineButton>
    </Section>
  );
}

export function Banquet({ d, set }: P) {
  return (
    <Section title="Tiệc cưới" enabled={d.partyOn} onEnabled={(v) => set({ partyOn: v })}>
      <Segmented value={d.banquetType} onChange={(v) => set({ banquetType: v })}
        options={[{ value: "wedding", label: "Tiệc cưới" }, { value: "reception", label: "Tiệc chiêu đãi" }, { value: "engagement", label: "Tiệc đính hôn" }]} />
      <Field label="Tiêu đề phần"><Input value={d.banquetTitle} onChange={(e) => set({ banquetTitle: e.target.value })} /></Field>
      <Helper>Tiêu đề hiển thị phía trên phần này trên thiệp mời. Để trống nếu muốn ẩn.</Helper>
      <Field label="Ngày diễn ra sự kiện"><Input type="date" value={d.date} onChange={(e) => set({ date: e.target.value })} /></Field>
      <Field label="Thời gian sự kiện"><Input type="time" value={d.time} onChange={(e) => set({ time: e.target.value })} /></Field>
      <Helper>Thời gian chính hiển thị trên thiệp, dùng để đếm ngược và thêm vào lịch.</Helper>
      <Field label="Định dạng thời gian">
        <Segmented value={d.clock} onChange={(v) => set({ clock: v })} options={[{ value: "24h", label: "Hệ 24 giờ" }, { value: "ampm", label: "SA/CH" }]} />
      </Field>
      <div className="mini-col">
        <div className="inline-toggle">
          <div><strong>Giờ đón khách và giờ khai tiệc</strong><Helper>Mặc định thẻ chỉ hiển thị thời gian sự kiện. Bật lên để thêm giờ đón khách và giờ khai tiệc.</Helper></div>
          <span className="inline-r"><em>{d.hideWelcomeTimes ? "Ẩn" : "Hiển thị"}</em><Toggle on={!d.hideWelcomeTimes} onChange={(v) => set({ hideWelcomeTimes: !v })} /></span>
        </div>
        {!d.hideWelcomeTimes && (
          <Row>
            <Field label="Giờ đón khách" half><Input type="time" value={d.welcomeTime} onChange={(e) => set({ welcomeTime: e.target.value })} /></Field>
            <Field label="Giờ khai tiệc" half><Input type="time" value={d.startTime} onChange={(e) => set({ startTime: e.target.value })} /></Field>
          </Row>
        )}
      </div>
      <label className="inline-toggle"><span className="lbl">Đếm ngược</span><span className="inline-r"><em>{d.countdown ? "Hiển thị" : "Ẩn"}</em><Toggle on={d.countdown} onChange={(v) => set({ countdown: v })} /></span></label>
      <hr className="divider" />
      <Field label="Tiêu đề phần địa điểm"><Input value={d.locTitle} onChange={(e) => set({ locTitle: e.target.value })} /></Field>
      <Field label="Địa chỉ"><Textarea rows={2} placeholder="Địa chỉ tiệc cưới" value={d.address} onChange={(e) => set({ address: e.target.value })} /></Field>
      <label className="inline-toggle"><span className="lbl">Bản đồ</span><span className="inline-r"><em>{d.showMap ? "Hiển thị" : "Ẩn"}</em><Toggle on={d.showMap} onChange={(v) => set({ showMap: v })} /></span></label>
      <Helper>Bản đồ thuộc về phần này. Khi ẩn cả phần, bản đồ cũng biến mất.</Helper>
      <MapBox d={d} set={set} />
    </Section>
  );
}

function MapBox({ d, set }: P) {
  const [edit, setEdit] = useState(false);
  return (
    <div className="mini-col">
      <div className="mini-row">
        <p className="helper">Bản đồ được tạo tự động từ địa chỉ tiệc cưới. Chỉ chỉnh sửa nếu vị trí trên bản đồ chưa chính xác.</p>
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
    <Section title="Xác nhận tham dự" enabled={d.rsvpOn} onEnabled={(v) => set({ rsvpOn: v })}>
      <Hint>Khách mời có thể xác nhận tham dự trực tiếp trên thiệp. Xem danh sách xác nhận ở trang quản lý khách mời.</Hint>
      <Field label="Kiểu hiển thị" cap>
        <Segmented value={d.rsvpDisplay} onChange={(v) => set({ rsvpDisplay: v })} options={[{ value: "button", label: "Nút bấm" }, { value: "inline", label: "Hiển thị trực tiếp" }]} />
        <Helper>{d.rsvpDisplay === "button" ? "Khách nhấn nút để mở mẫu xác nhận dạng cửa sổ." : "Mẫu xác nhận hiển thị trực tiếp trên thiệp."}</Helper>
      </Field>
      <Field label="Số người mỗi thiệp mời" cap>
        <Segmented value={d.partyMode} onChange={(v) => set({ partyMode: v })} options={[{ value: "free", label: "Khách tự quyết định" }, { value: "limit", label: "Đặt giới hạn" }]} />
        <Helper>{d.partyMode === "free" ? "Khách tự điền số người tham dự." : "Giới hạn số người tối đa cho mỗi thiệp."}</Helper>
      </Field>
      {d.partyMode === "limit" && (
        <Field label="Giới hạn tối đa"><Input type="number" min={1} value={d.partyLimit} onChange={(e) => set({ partyLimit: Math.max(1, Number(e.target.value) || 1) })} /></Field>
      )}
      <Field label="Câu hỏi bổ sung cho khách">
        <Helper>Các câu hỏi khách trả lời khi xác nhận tham dự.</Helper>
        {d.questions.map((q, i) => (
          <Row key={i}>
            <Input value={q} placeholder="Nhập câu hỏi" onChange={(e) => upd(i, e.target.value)} />
            <button className="icon-ghost sm" aria-label="Xoá câu hỏi" onClick={() => set({ questions: d.questions.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
          </Row>
        ))}
        <OutlineButton onClick={() => set({ questions: [...d.questions, ""] })}>{Icon.plus(16)} Câu hỏi mới</OutlineButton>
      </Field>
    </Section>
  );
}

export function Dress({ d, set }: P) {
  return (
    <Section title="Trang phục" enabled={d.dressOn} onEnabled={(v) => set({ dressOn: v })} enabledLabel={d.dressOn ? "Hiển thị" : "Ẩn"}>
      <Hint>Khi bật, tính năng này có thể gợi ý màu trang phục cho khách dựa trên tông màu chủ đạo của đám cưới.</Hint>
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
  return (
    <Section title="Lịch trình ngày cưới" enabled={d.schedOn} onEnabled={(v) => set({ schedOn: v })} enabledLabel={d.schedOn ? "Hiển thị" : "Ẩn"}>
      <Hint>Bật để hiển thị lịch trình ngày cưới (đón khách, lễ cưới, tiệc chiêu đãi...) để khách xem nhanh.</Hint>
      {d.sched.map((s, i) => (
        <Row key={i}>
          <Field half><Input type="time" value={s.time} onChange={(e) => upd(i, { time: e.target.value })} /></Field>
          <Field half><Input value={s.text} onChange={(e) => upd(i, { text: e.target.value })} /></Field>
          <button className="icon-ghost sm" aria-label="Xoá mục" onClick={() => set({ sched: d.sched.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
        </Row>
      ))}
      <OutlineButton onClick={() => set({ sched: [...d.sched, { time: "12:00", text: "" }] })}>{Icon.plus(16)} Thêm mục</OutlineButton>
    </Section>
  );
}

export function Guestbook({ d, set }: P) {
  return (
    <Section title="Lời chúc của khách" enabled={d.guestOn} onEnabled={(v) => set({ guestOn: v })}>
      <a className="mini-card link-card" href="#guests">
        <div><strong>{d.wishes.length} lời chúc</strong><Helper>Xem và quản lý</Helper></div>
        {Icon.chevronRight(16)}
      </a>
    </Section>
  );
}

const WHO: [Gift["who"], string][] = [["bride", "Cô dâu"], ["groom", "Chú rể"], ["custom", "Tùy chọn"]];

export function GiftBox({ d, set }: P) {
  const [pick, setPick] = useState(false);
  const [who, setWho] = useState<Gift["who"]>("bride");
  const [bankName, setBankName] = useState("Vietcombank");
  const [bankCode, setBankCode] = useState("VCB");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const close = () => {
    setPick(false);
    setAccountNumber("");
    setAccountName("");
  };

  const save = () => {
    if (!accountNumber.trim() || !accountName.trim()) return;
    const qrUrl = `https://api.vietqr.io/image/970436-${accountNumber.trim()}-print.png?accountName=${encodeURIComponent(accountName.trim().toUpperCase())}`;
    const newGift: Gift = {
      id: "gift-" + Date.now(),
      who,
      bankName: bankName.trim(),
      bankCode: bankCode.trim(),
      accountNumber: accountNumber.trim(),
      accountName: accountName.trim().toUpperCase(),
      qrUrl,
    };
    set({ gifts: [...d.gifts, newGift] });
    close();
  };

  const whoLabel = (w: Gift["who"]) => WHO.find(([v]) => v === w)?.[1] || "Khác";

  return (
    <Section title={d.giftTitle} onTitle={(v) => set({ giftTitle: v })} enabled={d.giftOn} onEnabled={(v) => set({ giftOn: v })}>
      {d.gifts.length === 0 && <div className="empty-box">Chưa có tài khoản mừng cưới nào. Nhấn nút bên dưới để thêm.</div>}
      {d.gifts.map((g, i) => (
        <div className="mini-card" key={g.id || i}>
          <div>
            <strong>{g.bankName} ({g.bankCode}) · {whoLabel(g.who)}</strong>
            <Helper>STK: {g.accountNumber} - Chủ TK: {g.accountName}</Helper>
          </div>
          <button className="icon-ghost sm" aria-label="Xoá" onClick={() => set({ gifts: d.gifts.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
        </div>
      ))}
      <OutlineButton onClick={() => setPick(true)}>{Icon.plus(16)} Thêm tài khoản mừng cưới</OutlineButton>

      {pick && (
        <Modal title="Thêm tài khoản mừng cưới" onClose={close}>
          <div className="lbl">Áp dụng cho</div>
          <div className="chips">
            {WHO.map(([v, l]) => (
              <button key={v} className={who === v ? "chip active" : "chip"} onClick={() => setWho(v)}>{l}</button>
            ))}
          </div>
          <Field label="Tên ngân hàng">
            <Input value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Ví dụ: Vietcombank, MB Bank, VietinBank..." />
          </Field>
          <Field label="Mã ngân hàng (viết tắt)">
            <Input value={bankCode} onChange={(e) => setBankCode(e.target.value)} placeholder="Ví dụ: VCB, MB, ICB, TCB..." />
          </Field>
          <Field label="Số tài khoản *">
            <Input autoFocus value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Số tài khoản ngân hàng" />
          </Field>
          <Field label="Tên chủ tài khoản *">
            <Input value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="LÊ NGỌC ÁNH" />
          </Field>
          <div className="modal-actions">
            <button className="btn-outline" onClick={close}>Hủy</button>
            <button className="btn-primary" disabled={!accountNumber.trim() || !accountName.trim()} onClick={save}>Lưu</button>
          </div>
        </Modal>
      )}
    </Section>
  );
}

export function Thanks({ d, set }: P) {
  return (
    <Section title="Lời cảm ơn" enabled={d.thanksOn} onEnabled={(v) => set({ thanksOn: v })}>
      <Field label="Lời cảm ơn"><Textarea rows={3} placeholder="Nhập lời cảm ơn" value={d.thanks} onChange={(e) => set({ thanks: e.target.value })} /></Field>
    </Section>
  );
}

export function Music({ d, set }: P) {
  const [pick, setPick] = useState(false);
  const [name, setName] = useState("");
  return (
    <Section title="Nhạc nền">
      <div className="music-empty">
        <div className="music-dot">{Icon.music(28)}</div>
        <p>{d.musicName || "Chưa chọn nhạc"}</p>
        <button className="btn-primary" style={{ height: 36 }} onClick={() => { setName(d.musicName); setPick(true); }}>{Icon.music(16)} Chọn nhạc</button>
        {d.musicName && <button className="link-btn" onClick={() => set({ musicName: "" })}>Bỏ chọn</button>}
      </div>
      {pick && (
        <Modal title="Chọn nhạc" onClose={() => setPick(false)}>
          <Field label="Tên bài hát"><Input autoFocus value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <div className="modal-actions">
            <button className="btn-outline" onClick={() => setPick(false)}>Hủy</button>
            <button className="btn-primary" onClick={() => { set({ musicName: name.trim() }); setPick(false); }}>Lưu</button>
          </div>
        </Modal>
      )}
    </Section>
  );
}

export function Envelope({ d, set }: P) {
  return (
    <Section title="Bì thư & Lời mời">
      <Field label="Tên khách mời mặc định trên bì thư">
        <Input placeholder="Ví dụ: Gia đình Anh Mạnh" value={d.envelopeGuest} onChange={(e) => set({ envelopeGuest: e.target.value })} />
      </Field>
      <Field label="Lời mời dự tiệc trên bì thư">
        <Input placeholder="Ví dụ: đến dự buổi tiệc chung vui cùng gia đình" value={d.envelopeInviteMessage} onChange={(e) => set({ envelopeInviteMessage: e.target.value })} />
      </Field>
      <Helper>Áp dụng cho mọi khách mời xem thiệp. Mỗi liên kết mời riêng có thể hiển thị tên khách tương ứng.</Helper>
    </Section>
  );
}

export function Share({ d, set }: P) {
  return (
    <Section title="Ảnh xem trước khi chia sẻ">
      <Helper>Hình ảnh hiển thị khi chia sẻ liên kết thiệp cưới lên mạng xã hội. Chọn một trong hai kiểu.</Helper>
      <Segmented value={d.shareStyle} onChange={(v) => set({ shareStyle: v })} options={[{ value: "envelope", label: "Phong bì thiệp cưới" }, { value: "photo", label: "Ảnh của bạn" }]} />
      <Helper>{d.shareStyle === "envelope" ? "Phong bì thiệp cưới của bạn. Mỗi liên kết mời riêng sẽ hiển thị tên khách." : "Dùng ảnh đầu tiên trong album làm ảnh chia sẻ."}</Helper>
      <p className="lbl">Xem trước</p>
      <div className="share-card">
        <div className="share-img">
          {d.shareStyle === "photo" && d.photos[0] ? <img src={d.photos[0]} alt="" /> : <span className="share-env">{d.envelopeText || "Lời mời"}<br />❦</span>}
        </div>
        <div className="share-txt">
          <small>chungdoi.com</small>
          <strong>{groomShown(d)} &amp; {brideShown(d)}</strong>
          <span>Trân trọng kính mời bạn đến dự lễ cưới của chú rể và cô dâu.</span>
        </div>
      </div>
      <Helper>Mạng xã hội lưu tạm ảnh xem trước nên có thể chưa cập nhật ngay sau khi chỉnh sửa.</Helper>
    </Section>
  );
}
