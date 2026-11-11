// Sinh khối họ "mahal_pink" (Mahal - Hồng) từ HTML gốc đã tách (docs/survey/blocks/mahal_pink/NN.jsx).
// Chạy: node scripts/clone/gen_mahal_pink.cjs
const fs = require("fs");
const path = require("path");
const { J } = require("./jsxkit.cjs");

const RIV = "docs/survey/blocks/mahal_pink";
const OUT = "src/features/invitation/shell/blocks/mahal_pink";
const raw = (i) => fs.readFileSync(path.join(RIV, String(i).padStart(2, "0") + ".jsx"), "utf8");

const kit = require("./genkit.cjs").make({
  OUT,
  TOKENS: [
    [/\/images\/themes\/mahal-pink/g, "t.assets"],
    [/rgb\(125, 39, 50\)/g, "t.ink"],
    [/rgb\(102, 112, 73\)/g, "t.sub"],
    [/rgb\(252, 241, 224\)/g, "t.paper"],
    [/(?<![\w(])125, 39, 50/g, "t.inkRgb"],
  ],
  EAGER: new Set(["arch-frame", "flower1", "paper"]),
  imgRe: /<img ([^>]*?)src="(\/images\/(?:themes\/mahal-pink|envelope)\/([^"]+?)(?:\.webp|\.svg)?)"/g,
});
const { smallest } = kit;

// ---- Paper ----
kit.emit("Paper", raw(0));

// ---- Hero ----
{
  const j = new J(raw(1));
  j.text("Văn Hoàng", "n1").text("Lan Anh", "n2");
  kit.emit("Hero", j.src);
}

// ---- Family ----
{
  const j = new J(raw(2));
  j.text("THÔNG TIN LỄ&nbsp;CƯỚI", 'd.ceremonyTitle || "THÔNG TIN LỄ\\u00a0CƯỚI"');
  j.textEach("Ông Bà", ["fams[0].title", "fams[1].title"]);
  j.text("Đỗ Duy Khang", "fams[0].f").text("Đỗ Ngọc Hân", "fams[0].m");
  j.text("Hoàng Thanh Tùng", "fams[1].f").text("Hoàng Minh Nguyệt", "fams[1].m");
  j.text("Số 24, phố Hàng Bông,\nquận Hoàn Kiếm, Hà Nội", "fams[0].addr");
  j.text("Số 108, phố Đội Cấn,\nquận Ba Đình, Hà Nội", "fams[1].addr");
  j.text("TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI", '(d.announcementLine1 || "TRÂN TRỌNG BÁO TIN") + "\\n" + (d.announcementLine2 || "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI")');
  j.text("Đỗ Văn Hoàng", "full1").text("Hoàng Lan Anh", "full2");
  {
    const row = smallest(j, "div", (s) => s.includes("LỄ THÀNH HÔN") && s.includes("Tức ngày") && !s.includes("<img"));
    const tpl = new J(j.slice(row));
    tpl.text("LỄ THÀNH HÔN\nTiệc cưới Trống Đồng Cảnh&nbsp;Hồ", 'c.title + (c.place && !c.title.includes(c.place) ? "\\n" + c.place : "")');
    tpl.text("VÀO LÚC 18:00", '"VÀO LÚC " + formatTime(c.time, d.clock)');
    tpl.text("THỨ BA", "WEEKDAYS_FULL[cd.getDay()].toUpperCase()");
    tpl.text("15", "String(cd.getDate())");
    tpl.text("THÁNG 06", '"THÁNG " + String(cd.getMonth() + 1).padStart(2, "0")');
    tpl.text("2027", "cd.getFullYear()");
    tpl.rep(">(Tức ngày 11 tháng 5 năm Đinh&nbsp;Mùi)<", ">{c.lunar ? <>(<>{c.lunar}</>)</> : \"\"}<");
    j.splice(row.s, row.e, `{d.ceremonies.map((c, ci) => { const cd = parseDate(c.date); return (<React.Fragment key={ci}>${tpl.src}</React.Fragment>); })}`);
  }
  {
    const fam = smallest(j, "div", (s) => s.includes("{fams[0].title}") && s.includes("{fams[1].title}"));
    j.splice(fam.s, fam.e, "{d.familyOn && (" + j.slice(fam) + ")}");
    const ann = smallest(j, "div", (s) => s.includes("TRÂN TRỌNG BÁO TIN"));
    const nm = smallest(j, "div", (s) => s.includes("{full1}") && s.includes("{full2}"));
    j.splice(ann.s, nm.e, "{d.announceOn && (<>" + j.src.slice(ann.s, nm.e) + "</>)}");
  }
  kit.emit("Family", j.src, { cond: "(d.familyOn || d.announceOn || d.ceremonies.length > 0)" });
}

// ---- Album ----
{
  const j = new J(raw(3));
  j.rep('aria-label="Previous photo"', 'aria-label="Previous photo" onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + albumPhotos.length) % albumPhotos.length)}');
  j.rep('aria-label="Next photo"', 'aria-label="Next photo" onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % albumPhotos.length)}');
  const box = smallest(j, "div", (s) => s.includes("Wedding photo 1") && s.includes("Wedding photo 2"));
  j.setChildren(box, `{albumPhotos.map((src, i) => { const nA = albumPhotos.length; let o = (((i - activePhotoIdx) % nA) + nA) % nA; if (o > nA / 2) o -= nA; const a = Math.abs(o); const sg = o < 0 ? -1 : 1; const st = a === 0 ? { transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 100 } : { transform: \`translateX(\${sg * 60 * a}%) translateZ(\${-150 * a}px) rotateY(\${sg * 45 * a}deg) scale(\${a === 1 ? 0.85 : 0.7})\`, opacity: a === 1 ? 0.75 : a === 2 ? 0.5 : 0.3, zIndex: 100 - a }; return (<div key={i} onClick={() => setActivePhotoIdx(i)} className={"absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out " + (a === 0 ? "ring-2 ring-white/30" : "")} style={{ aspectRatio: Math.min(1.2, Math.max(0.5, ratios[i] ?? 2 / 3)), transitionDuration: "1100ms", ...st }}><img alt={"Wedding photo " + (i + 1)} className="h-full w-full object-cover" src={src} style={(() => { const c = d.photoCrops?.[src]; return c ? { objectPosition: c.x + "% " + c.y + "%", transform: "scale(" + c.z + ")", transformOrigin: c.x + "% " + c.y + "%" } : { objectPosition: "50% 50%" }; })()} onLoad={(e) => { const m = e.currentTarget; const q = m.naturalWidth / m.naturalHeight; setRatios((r) => ({ ...r, [i]: q })); }} /></div>); })}`);
  j.rep(">1 / 9<", ">{activePhotoIdx + 1} / {albumPhotos.length}<");
  kit.emit("Album", j.src, { cond: "d.albumOn && d.photos.length > 0", pre: "  const [ratios, setRatios] = React.useState<Record<number, number>>({});" });
}

// ---- Banquet (nút RSVP nằm trong cùng section) ----
{
  const j = new J(raw(4));
  j.text("THÔNG TIN TIỆC&nbsp;CƯỚI", 'd.banquetTitle.trim() || "THÔNG TIN TIỆC\\u00a0CƯỚI"');
  j.text("Tiệc cưới sẽ diễn ra vào&nbsp;lúc:", '"Tiệc cưới sẽ diễn ra vào\\u00a0lúc:"');
  j.text("18:00", "formatTime(d.startTime || d.time, d.clock)");
  j.text("THỨ BA", "WEEKDAYS_FULL[dt.getDay()].toUpperCase()");
  j.textFirst("15", "String(dt.getDate())");
  j.text("THÁNG 06", '"THÁNG " + String(dt.getMonth() + 1).padStart(2, "0")');
  j.text("2027", "dt.getFullYear()");
  j.rep(">(Tức ngày 11 tháng 5 năm Đinh&nbsp;Mùi)<", ">({nb(lunarLabel(dt))})<");
  j.text("216 ngày 2 giờ 43 phút 36 giây", "cdText");
  j.text("17:00", "formatTime(d.welcomeTime, d.clock)");
  j.text("19:30", "formatTime(d.startTime || d.time, d.clock)");
  j.text("Tháng 6 / 2027", '"Tháng " + (g.m + 1) + " / " + g.y');
  {
    const grid = j.all((n) => j.cls(n).includes("grid-cols-7") && j.cls(n).includes("gap-y-0.5"))[0];
    const kids = j.childrenOf(grid);
    const emptyKid = kids.find((k) => !k.text.includes("<span"));
    const normalKid = kids.find((k) => k.text.includes(">1<"));
    const normal = new J(normalKid.text).text("1", "n");
    const selKid = kids.find((k) => k.text.includes("svg"));
    const selected = new J(selKid.text).text("15", "n");
    const emptyCls = /className="([^"]*)"/.exec(emptyKid.text)[1];
    j.setChildren(grid, `{g.cells.map((n, i) => n === null ? <div key={i} className="${emptyCls}"></div> : n === g.selected ? React.cloneElement(${selected.src}, { key: i }) : React.cloneElement(${normal.src}, { key: i }))}`);
  }
  {
    const a = j.all((n) => j.tag(n) === "a" && /google\.com\/calendar/.test(j.attr(n, "href") || ""))[0];
    j.rep("href=" + j.attr(a.node, "href"), "href={googleCalendarUrl(d)}");
  }
  {
    const welcomeDiv = smallest(j, "div", (s) => s.includes("Đón khách") && s.includes("Khai tiệc") && !s.includes("Cùng"));
    j.splice(welcomeDiv.s, welcomeDiv.e, "{!d.hideWelcomeTimes && (" + j.slice(welcomeDiv) + ")}");
    const cdw = smallest(j, "div", (s) => s.includes("Cùng đếm"));
    j.splice(cdw.s, cdw.e, "{d.countdown && (" + j.slice(cdw) + ")}");
    j.rep('<button type="button" className="text-[13px]', '<button type="button" onClick={() => setRsvpOpen(true)} className="text-[13px]');
    const rs = smallest(j, "div", (s) => s.includes("XÁC NHẬN THAM DỰ"));
    j.splice(rs.s, rs.e, "{d.rsvpOn && (" + j.slice(rs) + ")}");
  }
  const pre = `  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const left = Math.max(0, Math.floor((new Date(d.date + "T" + (d.time || "00:00")).getTime() - now) / 1000));
  const cdText = Math.floor(left / 86400) + " ngày " + Math.floor((left % 86400) / 3600) + " giờ " + Math.floor((left % 3600) / 60) + " phút " + (left % 60) + " giây";
`;
  kit.emit("Banquet", j.src, { cond: "d.partyOn", pre });
}

// ---- Venue ----
{
  const j = new J(raw(5));
  j.text("Tiệc cưới sẽ tổ chức&nbsp;tại", 'd.locTitle || "Tiệc cưới sẽ tổ chức\\u00a0tại"');
  j.text("Tiệc cưới Trống Đồng Cảnh Hồ\nHà Nội", "d.address");
  const ifr = j.all((n) => j.tag(n) === "iframe")[0];
  j.rep("src=" + j.attr(ifr.node, "src"), 'src={"https://maps.google.com/maps?q=" + encodeURIComponent(d.address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed"}');
  const dir = j.all((n) => j.tag(n) === "a" && /maps\/dir/.test(j.attr(n, "href") || ""))[0];
  j.rep("href=" + j.attr(dir.node, "href"), 'href={d.mapUrl || "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(d.address)}');
  const mapBox = smallest(j, "div", (s) => s.includes("<iframe"));
  j.splice(mapBox.s, mapBox.e, "{d.showMap && (" + j.slice(mapBox) + ")}");
  kit.emit("Venue", j.src, { cond: "d.partyOn" });
}

// ---- Dress ----
{
  const j = new J(raw(6));
  j.text("DRESS CODE", 'd.dressTitle || "DRESS CODE"');
  j.text("Trang phục dự tiệc", "d.dressText");
  const sw = j.all((n) => j.cls(n) === "flex flex-wrap justify-center gap-4 md:gap-6")[0];
  j.setChildren(sw, '{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(125, 39, 50, 0.19)` } : {}) }}></div>))}');
  kit.emit("Dress", j.src, { cond: "d.dressOn", extra: 'import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";\n' });
}

// ---- Schedule (icon là ảnh nền, mỗi icon một kích thước) ----
{
  const j = new J(raw(7));
  j.text("LỊCH TRÌNH NGÀY&nbsp;CƯỚI", 'd.schedTitle || "LỊCH TRÌNH NGÀY\\u00a0CƯỚI"');
  const ol = j.all((n) => j.tag(n) === "ol")[0];
  const lis = j.childrenOf(ol);
  const tpl = new J(lis[0].text);
  tpl.text(
    "14:00",
    'icon ? (<span className="relative inline-block"><span aria-hidden="true" className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2 right-full" style={{ marginRight: "39px" }}><span aria-hidden="true" className="relative z-10 block shrink-0 bg-contain bg-center bg-no-repeat" style={{ width: icon === "medallion-candle" ? "40px" : icon === "medallion-pen" ? "44px" : "37px", height: "39px", backgroundImage: `url("${t.assets}/${icon}.webp")` }}></span></span>{ev.time}</span>) : ev.time'
  );
  tpl.text("Lễ gia tiên tại nhà gái", "ev.text");
  tpl.rep('className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10"', 'className={"absolute left-1/2 -translate-x-1/2 w-px " + lineCls}');
  j.setChildren(ol, `{d.sched.map((ev, i) => { const n = d.sched.length; const st = Math.floor((n - 3) / 2); const icon = n >= 3 && i >= st && i < st + 3 ? t.scheduleIcons.split(",")[i - st] : null; const lineCls = n === 1 ? "hidden" : i === 0 ? "top-1/2 -bottom-8 md:-bottom-10" : i === n - 1 ? "-top-8 md:-top-10 bottom-1/2" : "-top-8 md:-top-10 -bottom-8 md:-bottom-10"; return (${tpl.src.replace('<li className="contents">', '<li key={i} className="contents">')}); })}`);
  kit.emit("Schedule", j.src, { cond: "d.schedOn" });
}

// ---- 08 chứa cả Sổ lưu bút lẫn Hộp quà (hai div anh em trong một khung) ----
const wrap = new J(raw(8));
const outer = wrap.all((n) => wrap.tag(n) === "div")[0];
const parts = wrap.childrenOf(outer);

// ---- Guestbook ----
{
  const j = new J(parts[0].text);
  j.rep('<form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">', '<form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]" onSubmit={handleSendWish}>');
  j.rep('defaultValue=""', "value={wishName} onChange={(e) => setWishName(e.target.value)}");
  j.rep('rows="4"', "rows={4} value={wishMsg} onChange={(e) => setWishMsg(e.target.value)}");
  j.rep('maxLength="500"', "maxLength={500}");
  j.rep('maxLength="10000"', "maxLength={10000}");
  const list = j.all((n) => j.cls(n).startsWith("mt-8 w-full space-y-3"))[0];
  const items = j.childrenOf(list);
  const tpl = new J(items[0].text);
  const nameM = />([^<]*)<\/span><span className="text-xs opacity-70">/.exec(items[0].text);
  const atM = /<span className="text-xs opacity-70">([^<]*)<\/span>/.exec(items[0].text);
  const msgM = /<p className="mt-2 leading-relaxed">([^<]*)<\/p>/.exec(items[0].text);
  tpl.text(nameM[1], "w.name").text(atM[1], "w.at").text(msgM[1], "w.msg");
  j.setChildren(list, `{d.wishes.map((w, wi) => (<React.Fragment key={wi}>${tpl.src}</React.Fragment>))}`);
  kit.emit("Guestbook", j.src, { cond: "d.guestOn" });
}

// ---- Gifts ----
{
  const j = new J(parts[1].text);
  j.textFirst("Hộp Quà&nbsp;Mừng", 'd.giftTitle || "Hộp Quà\\u00a0Mừng"');
  j.textFirst("Hộp Quà Mừng", 'd.giftTitle || "Hộp Quà Mừng"');
  j.rep('aria-label="Mở hộp mừng cưới"', 'aria-label="Mở hộp mừng cưới" onClick={() => setGiftModalOpen(true)}');
  j.rep('<dialog className="modal modal-bottom sm:modal-middle">', '<dialog className={`modal modal-bottom sm:modal-middle ${giftModalOpen ? "modal-open" : ""}`} open={giftModalOpen}>');
  j.rep('<button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3', '<button type="button" onClick={() => setGiftModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3');
  j.rep('<form method="dialog" className="modal-backdrop"><button type="submit">close</button></form>', '<div className="modal-backdrop" onClick={() => setGiftModalOpen(false)}><button type="button">close</button></div>');
  const cards = j.all((n) => j.cls(n).startsWith("flex flex-col items-center gap-4 sm:flex-row"))[0];
  const kid = j.childrenOf(cards)[0];
  const tpl = new J(kid.text);
  tpl.text("Chú Rể - THIEP CUOI DEMO", 'giftTitle(g) + " - " + g.accountName');
  tpl.text("Vietcombank", "g.bankName").text("0000000000", "g.accountNumber").text("THIEP CUOI DEMO", "g.accountName");
  const im = tpl.all((n) => tpl.tag(n) === "img")[0];
  tpl.rep("alt=" + tpl.attr(im.node, "alt"), "alt={`QR - ${giftTitle(g)} - ${g.accountName}`}");
  tpl.rep("src=" + tpl.attr(im.node, "src"), "src={g.qrUrl}");
  tpl.rep('<button type="button" className="mt-', '<button type="button" onClick={() => saveQr(g)} className="mt-');
  j.setChildren(cards, `{d.gifts.map((g) => (<React.Fragment key={g.id}>${tpl.src}</React.Fragment>))}`);
  {
    const bt = j.all((n) => j.tag(n) === "button" && j.attr(n, "aria-label") === '"Mở hộp mừng cưới"')[0];
    j.splice(bt.s, bt.e, '{(d.giftDisplayMode || "envelope") === "envelope" ? (' + j.slice(bt) + ') : <AltGiftWidget ctx={ctx} mode={d.giftDisplayMode} />}');
  }
  kit.emit("Gifts", j.src, { cond: "d.giftOn && d.gifts.length > 0", extra: "import { AltGiftWidget } from \"@/features/invitation/shell/blocks/shared/GiftWidgets\";\n" });
}

// ---- Footer ----
{
  const j = new J(raw(9));
  j.text("Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!", "d.thanks");
  const th = smallest(j, "span", (s) => s.includes("{d.thanks}") && s.startsWith("<span"));
  j.splice(th.s, th.e, "{d.thanksOn && (" + j.slice(th) + ")}");
  kit.emit("Footer", j.src);
}

console.log("done");
