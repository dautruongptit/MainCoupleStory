// Sinh khối họ "jasmine_green" (Mai Lan - Xanh) từ HTML gốc đã tách (docs/survey/blocks/jasmine_green/main/NN.jsx).
// Chạy: node scripts/clone/gen_jasmine_green.cjs   (dựng từ bộ sinh mahal_pink: cùng bố cục, khác dữ liệu)
const fs = require("fs");
const path = require("path");
const { J } = require("./jsxkit.cjs");

const RIV = "docs/survey/blocks/jasmine_green/main";
const ROOT = "docs/survey/blocks/jasmine_green";
const { blocksDirOf } = require("../lib/template_paths.cjs");
const OUT = blocksDirOf("jasmine_green"); // templates/<id>/blocks hoặc templates/_shared/<họ>
const raw = (i) => fs.readFileSync(path.join(RIV, String(i).padStart(2, "0") + ".jsx"), "utf8");
const rawRoot = (i) => fs.readFileSync(path.join(ROOT, String(i).padStart(2, "0") + ".jsx"), "utf8");

const kit = require("./genkit.cjs").make({
  OUT,
  TOKENS: [
    [/\/images\/themes\/jasmine-green/g, "t.assets"],
    [/rgb\(46, 71, 51\)/g, "t.ink"],
    [/(?<![\w(])46, 71, 51/g, "t.inkRgb"],
  ],
  EAGER: new Set(["paper", "ribbon3", "flower11", "flower10", "frame", "goldheart", "goldline", "goldheart3", "calendar-heart"]),
  imgRe: /<img ([^>]*?)src="(\/images\/(?:themes\/jasmine-green|envelope|giftbox\/mini|giftbox)\/([^"]+?)(?:\.webp|\.svg)?)"/g,
});
const { smallest } = kit;

// Trang gốc: heading h1-h6 không khai báo font-weight có weight 400 (chữ thường kế thừa 300 từ body), local thì kế thừa 300.
const emitRaw = kit.emit;
kit.emit = (name, src, o) => emitRaw(name, src.replace(/<(h[1-6])\b([^>]*?)style=\{\{ ([^}]*)\}\}/g, (m, tag, pre, st) => (/fontWeight/.test(st) || /\bfont-(?:thin|light|normal|medium|semibold|bold|extrabold|black)\b/.test(pre) ? m : "<" + tag + pre + "style={{ fontWeight: \"400\", " + st + "}}")), o);

// ---- Paper ----
kit.emit("Paper", "<>" + rawRoot(1) + rawRoot(2) + "</>");

// ---- Hero ----
{
  const j = new J(raw(0));
  j.text("Quốc Bảo", "n1").text("Tuệ Anh", "n2");
  // cỡ chữ inline của bản gốc đổi theo khổ (JS gốc chọn theo breakpoint md): 46px desktop / 40px mobile
  j.src = j.src.split('fontSize: "46px"').join('fontSize: isMd ? "46px" : "40px"');
  kit.emit("Hero", j.src);
}

// ---- Family ----
{
  const j = new J(raw(1));
  j.text("THÔNG TIN LỄ&nbsp;CƯỚI", 'd.ceremonyTitle || "THÔNG TIN LỄ\\u00a0CƯỚI"');
  j.textEach("Ông Bà", ["fams[0].title", "fams[1].title"]);
  j.text("Ngô Thanh Tùng", "fams[0].f").text("Ngô Minh Nguyệt", "fams[0].m");
  j.text("Dương Quang Huy", "fams[1].f").text("Dương Như Khuê", "fams[1].m");
  j.text("Số 86 Núi Thành,\nphường Hòa Cường, Đà Nẵng", "fams[0].addr");
  j.text("Số 31 Lê Văn Hiến,\nphường Ngũ Hành Sơn, Đà Nẵng", "fams[1].addr");
  j.text("TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI", '(d.announcementLine1 || "TRÂN TRỌNG BÁO TIN") + "\\n" + (d.announcementLine2 || "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI")');
  j.text("Ngô Quốc Bảo", "full1").text("Dương Tuệ Anh", "full2");
  {
    const row = smallest(j, "div", (s) => s.includes("LỄ THÀNH HÔN") && s.includes("Tức ngày") && !s.includes("<img"));
    const tpl = new J(j.slice(row));
    tpl.text("LỄ THÀNH HÔN\nTrung tâm Tiệc cưới Sun&nbsp;Palace", 'c.title + (c.place && !c.title.includes(c.place) ? "\\n" + c.place : "")');
    tpl.text("VÀO LÚC 19:00", '"VÀO LÚC " + formatTime(c.time, d.clock)');
    tpl.text("THỨ HAI", "WEEKDAYS_FULL[cd.getDay()].toUpperCase()");
    tpl.text("02", "String(cd.getDate()).padStart(2, \"0\")");
    tpl.text("THÁNG 08", '"THÁNG " + String(cd.getMonth() + 1).padStart(2, "0")');
    tpl.text("2027", "cd.getFullYear()");
    tpl.rep(">(Tức ngày 1 tháng 7 năm Đinh&nbsp;Mùi)<", ">{c.lunar ? <>(<>{c.lunar}</>)</> : \"\"}<");
    j.splice(row.s, row.e, `{d.ceremonies.map((c, ci) => { const cd = parseDate(c.date); return (<React.Fragment key={ci}>${tpl.src}</React.Fragment>); })}`);
  }
  {
    const fam = smallest(j, "div", (s) => s.includes("{fams[0].title}") && s.includes("{fams[1].title}"));
    j.splice(fam.s, fam.e, "{d.familyOn && (" + j.slice(fam) + ")}");
    const ann = smallest(j, "div", (s) => s.includes("TRÂN TRỌNG BÁO TIN"));
    const nm = smallest(j, "div", (s) => s.includes("{full1}") && s.includes("{full2}"));
    j.splice(ann.s, nm.e, "{d.announceOn && (<>" + j.src.slice(ann.s, nm.e) + "</>)}");
  }
  // tên bố mẹ 14px/12px và tên đầy đủ 45px/40px (desktop/mobile)
  j.src = j.src.split('fontSize: "14px"').join('fontSize: isMd ? "14px" : "12px"').split('fontSize: "45px"').join('fontSize: isMd ? "45px" : "40px"');
  kit.emit("Family", j.src, { cond: "(d.familyOn || d.announceOn || d.ceremonies.length > 0)" });
}

// ---- Album ----
{
  const j = new J(raw(2));
  j.rep('aria-label="Previous photo"', 'aria-label="Previous photo" onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + albumPhotos.length) % albumPhotos.length)}');
  j.rep('aria-label="Next photo"', 'aria-label="Next photo" onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % albumPhotos.length)}');
  const box = smallest(j, "div", (s) => s.includes("Wedding photo 1") && s.includes("Wedding photo 2"));
  j.setChildren(box, `{albumPhotos.map((src, i) => { const nA = albumPhotos.length; let o = (((i - activePhotoIdx) % nA) + nA) % nA; if (o > nA / 2) o -= nA; const a = Math.abs(o); const sg = o < 0 ? -1 : 1; const st = a === 0 ? { transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 100 } : { transform: \`translateX(\${sg * 60 * a}%) translateZ(\${-150 * a}px) rotateY(\${sg * 45 * a}deg) scale(\${a === 1 ? 0.85 : 0.7})\`, opacity: a === 1 ? 0.75 : a === 2 ? 0.5 : 0.3, zIndex: 100 - a }; return (<div key={i} onClick={() => setActivePhotoIdx(i)} className={"absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out " + (a === 0 ? "ring-2 ring-white/30" : "")} style={{ aspectRatio: Math.min(1.2, Math.max(0.5, ratios[i] ?? 2 / 3)), transitionDuration: "1100ms", ...st }}><img alt={"Wedding photo " + (i + 1)} className="h-full w-full object-cover" src={src} style={(() => { const c = d.photoCrops?.[src]; return c ? { objectPosition: c.x + "% " + c.y + "%", transform: "scale(" + c.z + ")", transformOrigin: c.x + "% " + c.y + "%" } : { objectPosition: "50% 50%" }; })()} onLoad={(e) => { const m = e.currentTarget; const q = m.naturalWidth / m.naturalHeight; setRatios((r) => ({ ...r, [i]: q })); }} /></div>); })}`);
  j.rep(">1 / 9<", ">{activePhotoIdx + 1} / {albumPhotos.length}<");
  kit.emit("Album", j.src, { cond: "d.albumOn && d.photos.length > 0", pre: "  const [ratios, setRatios] = React.useState<Record<number, number>>({});" });
}

// ---- Banquet (nút RSVP nằm trong cùng section) ----
{
  const j = new J("<>" + raw(3) + raw(4) + "</>");
  j.text("THÔNG TIN TIỆC&nbsp;CƯỚI", 'd.banquetTitle.trim() || "THÔNG TIN TIỆC\\u00a0CƯỚI"');
  j.text("Tiệc cưới sẽ diễn ra vào&nbsp;lúc:", '"Tiệc cưới sẽ diễn ra vào\\u00a0lúc:"');
  j.text("19:00", "formatTime(d.time, d.clock)");
  j.text("THỨ HAI", "WEEKDAYS_FULL[dt.getDay()].toUpperCase()");
  j.textFirst("02", "String(dt.getDate()).padStart(2, \"0\")");
  j.text("THÁNG 08", '"THÁNG " + String(dt.getMonth() + 1).padStart(2, "0")');
  j.text("2027", "dt.getFullYear()");
  j.rep(">(Tức ngày 1 tháng 7 năm Đinh&nbsp;Mùi)<", ">({nb(lunarLabel(dt))})<");
  j.text("263 ngày 23 giờ 44 phút 6 giây", "cdText");
  j.text("18:00", "formatTime(d.welcomeTime, d.clock)");
  j.text("20:30", "formatTime(d.startTime || d.time, d.clock)");
  j.text("Tháng 8 / 2027", '"Tháng " + (g.m + 1) + " / " + g.y');
  {
    const grid = j.all((n) => j.cls(n).includes("grid-cols-7") && j.cls(n).includes("gap-y-0.5"))[0];
    const kids = j.childrenOf(grid);
    const emptyKid = kids.find((k) => !k.text.includes("<span"));
    const normalKid = kids.find((k) => k.text.includes(">1<"));
    const normal = new J(normalKid.text).text("1", "n");
    const selKid = kids.find((k) => k.text.includes("calendar-heart"));
    const selected = new J(selKid.text).text("2", "n");
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
    j.rep('<button type="button" className="inline-flex items-center justify-center rounded-full px-8 py-1.5 text-[13px]', '<button type="button" onClick={() => setRsvpOpen(true)} className="inline-flex items-center justify-center rounded-full px-8 py-1.5 text-[13px]');
    const rs = smallest(j, "div", (s) => s.includes("XÁC NHẬN THAM DỰ"));
    j.splice(rs.s, rs.e, "{d.rsvpOn && (" + j.slice(rs) + ")}");
    const sec = j.all((n) => j.tag(n) === "section")[0];
    j.splice(sec.s, sec.e, "{d.partyOn && (" + j.slice(sec) + ")}");
  }
  const pre = `  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const left = Math.max(0, Math.floor((new Date(d.date + "T" + (d.time || "00:00")).getTime() - now) / 1000));
  const cdText = Math.floor(left / 86400) + " ngày " + Math.floor((left % 86400) / 3600) + " giờ " + Math.floor((left % 3600) / 60) + " phút " + (left % 60) + " giây";
`;
  kit.emit("Banquet", j.src, { cond: "(d.partyOn || d.rsvpOn)", pre });
}

// ---- Venue ----
{
  const j = new J(raw(5));
  j.text("Tiệc cưới sẽ tổ chức&nbsp;tại", 'd.locTitle || "Tiệc cưới sẽ tổ chức\\u00a0tại"');
  j.text("Trung tâm Tiệc cưới Sun Palace\nĐà Nẵng", "d.address");
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
  j.setChildren(sw, '{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(46, 71, 51, 0.19)` } : {}) }}></div>))}');
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
    "15:00",
    'icon ? (<span className="relative inline-block"><span aria-hidden="true" className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2 right-full" style={{ marginRight: "30px" }}><img alt="" aria-hidden="true" className="block size-[44px] shrink-0 object-contain" loading="lazy" decoding="async" src={t.assets + "/" + icon + ".webp"} /></span>{ev.time}</span>) : ev.time'
  );
  tpl.text("Lễ gia tiên tại nhà gái", "ev.text");
  tpl.rep('className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10"', 'className={"absolute left-1/2 -translate-x-1/2 w-px " + lineCls}');
  j.setChildren(ol, `{d.sched.map((ev, i) => { const n = d.sched.length; const st = Math.floor((n - 3) / 2); const icon = n >= 3 && i >= st && i < st + 3 ? t.scheduleIcons.split(",")[i - st] : null; const lineCls = n === 1 ? "hidden" : i === 0 ? "top-1/2 -bottom-8 md:-bottom-10" : i === n - 1 ? "-top-8 md:-top-10 bottom-1/2" : "-top-8 md:-top-10 -bottom-8 md:-bottom-10"; return (${tpl.src.replace('<li className="contents">', '<li key={i} className="contents">')}); })}`);
  kit.emit("Schedule", j.src, { cond: "d.schedOn" });
}

// ---- 08 = Sổ lưu bút, 09 = Hộp quà ----

// ---- Guestbook ----
{
  const j = new J(raw(8));
  j.rep('<form className="mt-6 mx-auto w-full max-w-full pr-2 md:max-w-[600px]">', '<form className="mt-6 mx-auto w-full max-w-full pr-2 md:max-w-[600px]" onSubmit={handleSendWish}>');
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
  const j = new J(raw(9));
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
    j.splice(bt.s, bt.e, '{(d.giftDisplayMode || "gift_box") === "gift_box" ? (' + j.slice(bt) + ') : <AltGiftWidget ctx={ctx} mode={d.giftDisplayMode} />}');
  }
  kit.emit("Gifts", j.src, { cond: "d.giftOn && d.gifts.length > 0", extra: "import { AltGiftWidget } from \"@/features/invitation/shell/blocks/shared/GiftWidgets\";\n" });
}

// ---- Footer ----
{
  const j = new J(raw(10));
  j.text("Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!", "d.thanks");
  const th = smallest(j, "span", (s) => s.includes("{d.thanks}") && s.startsWith("<span"));
  j.splice(th.s, th.e, "{d.thanksOn && (" + j.slice(th) + ")}");
  kit.emit("Footer", j.src);
}

console.log("done");
