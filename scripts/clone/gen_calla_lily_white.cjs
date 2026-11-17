// Sinh khối họ "calla_lily_white" (Hoa Rum - Trắng) từ HTML gốc đã tách (docs/survey/blocks/hoa_rum_trang/NN.jsx).
// Chạy: node scripts/clone/gen_calla_lily_white.cjs
const fs = require("fs");
const path = require("path");
const { J } = require("./jsxkit.cjs");

const RIV = "docs/survey/blocks/hoa_rum_trang";
const { blocksDirOf } = require("../lib/template_paths.cjs");
const OUT = blocksDirOf("calla_lily_white"); // templates/<id>/blocks hoặc templates/_shared/<họ>
const raw = (i) => fs.readFileSync(path.join(RIV, String(i).padStart(2, "0") + ".jsx"), "utf8");

const kit = require("./genkit.cjs").make({
  OUT,
  TOKENS: [
    [/\/images\/themes\/calla-lily-white/g, "t.assets"],
    [/rgb\(92, 95, 62\)/g, "t.ink"],
    [/rgb\(167, 133, 85\)/g, "t.sub"],
    [/rgb\(244, 243, 238\)/g, "t.paper"],
    [/(?<![\w(])92, 95, 62/g, "t.inkRgb"],
  ],
  EAGER: new Set(["rum-background", "template-background"]),
  imgRe: /<img ([^>]*?)src="(\/images\/(?:themes\/calla-lily-white|envelope)\/([^"]+?)(?:\.webp|\.svg)?)"/g,
});
const { smallest } = kit;

// ---- Paper: nền họa tiết toàn trang ----
kit.emit("Paper", `<>\n<img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-40" src="${"/images/themes/calla-lily-white/template-background.webp"}" />\n</>`);

// ---- Hero: SAVE THE DATE + tên ----
{
  const j = new J(raw(0));
  j.text("Hoàng Nam", "n1").text("Thanh Hà", "n2");
  kit.emit("Hero", j.src);
}

// ---- Family: gia đình + thông báo + lễ ----
{
  const j = new J(raw(1));
  j.text("THÔNG TIN LỄ&nbsp;CƯỚI", 'd.ceremonyTitle || "THÔNG TIN LỄ\\u00a0CƯỚI"');
  j.textEach("Ông Bà", ["fams[0].title", "fams[1].title"]);
  j.text("Bùi Đăng Khoa", "fams[0].f").text("Bùi Mai Trâm", "fams[0].m");
  j.text("Trịnh Xuân Trường", "fams[1].f").text("Trịnh Phương Thảo", "fams[1].m");
  j.text("Số 58 đường Nguyễn Đình Chiểu,\nphường Đa Kao, TP. Hồ Chí Minh", "fams[0].addr");
  j.text("Số 17 đường Phan Xích Long,\nphường Phú Nhuận, TP. Hồ Chí Minh", "fams[1].addr");
  j.text("TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI", '(d.announcementLine1 || "TRÂN TRỌNG BÁO TIN") + "\\n" + (d.announcementLine2 || "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI")');
  j.text("Bùi Hoàng Nam", "full1").text("Trịnh Thanh Hà", "full2");
  // hàng "lễ": lặp theo d.ceremonies
  {
    const row = smallest(j, "div", (s) => s.includes("LỄ THÀNH HÔN") && s.includes("Tức ngày"));
    const tpl = new J(j.slice(row));
    tpl.text("LỄ THÀNH HÔN\nWhite Palace Convention Center", 'c.title + (c.place && !c.title.includes(c.place) ? "\\n" + c.place : "")');
    tpl.text("VÀO LÚC 17:30", '"VÀO LÚC " + formatTime(c.time, d.clock)');
    tpl.text("THỨ BẢY", "WEEKDAYS_FULL[cd.getDay()].toUpperCase()");
    tpl.text("08", 'String(cd.getDate())');
    tpl.text("THÁNG 05", '"THÁNG " + String(cd.getMonth() + 1).padStart(2, "0")');
    tpl.text("2027", "cd.getFullYear()");
    tpl.rep(">(Tức ngày 3 tháng 4 năm Đinh&nbsp;Mùi)<", ">{c.lunar ? <>(<>{c.lunar}</>)</> : \"\"}<");
    j.splice(row.s, row.e, `{d.ceremonies.map((c, ci) => { const cd = parseDate(c.date); return (<React.Fragment key={ci}>${tpl.src}</React.Fragment>); })}`);
  }
  // bật/tắt theo cờ dữ liệu
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
  const j = new J(raw(2));
  j.rep('aria-label="Previous photo"', 'aria-label="Previous photo" onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + albumPhotos.length) % albumPhotos.length)}');
  j.rep('aria-label="Next photo"', 'aria-label="Next photo" onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % albumPhotos.length)}');
  const box = j.all((n) => j.cls(n).startsWith("relative") && j.cls(n).includes("items-center justify-center") && j.cls(n).includes("w-full h-full"))[0] || j.all((n) => j.tag(n) === "div" && /Wedding photo 1/.test(j.slice(n)))[0];
  j.setChildren(box, `{albumPhotos.map((src, i) => { const nA = albumPhotos.length; let o = (((i - activePhotoIdx) % nA) + nA) % nA; if (o > nA / 2) o -= nA; const a = Math.abs(o); const sg = o < 0 ? -1 : 1; const st = a === 0 ? { transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 100 } : { transform: \`translateX(\${sg * 60 * a}%) translateZ(\${-150 * a}px) rotateY(\${sg * 45 * a}deg) scale(\${a === 1 ? 0.85 : 0.7})\`, opacity: a === 1 ? 0.75 : a === 2 ? 0.5 : 0.3, zIndex: 100 - a }; return (<div key={i} onClick={() => setActivePhotoIdx(i)} className={"absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out " + (a === 0 ? "ring-2 ring-white/30" : "")} style={{ aspectRatio: Math.min(1.2, Math.max(0.5, ratios[i] ?? 2 / 3)), transitionDuration: "1100ms", ...st }}><img alt={"Wedding photo " + (i + 1)} className="h-full w-full object-cover" src={src} style={(() => { const c = d.photoCrops?.[src]; return c ? { objectPosition: c.x + "% " + c.y + "%", transform: "scale(" + c.z + ")", transformOrigin: c.x + "% " + c.y + "%" } : { objectPosition: "50% 50%" }; })()} onLoad={(e) => { const m = e.currentTarget; const q = m.naturalWidth / m.naturalHeight; setRatios((r) => ({ ...r, [i]: q })); }} /></div>); })}`);
  const dots = j.all((n) => j.tag(n) === "div" && /Go to photo 1/.test(j.slice(n)))[0];
  j.setChildren(dots, `{albumPhotos.map((_, i) => (<button key={i} type="button" aria-label={"Go to photo " + (i + 1)} onClick={() => setActivePhotoIdx(i)} className={"rounded-full transition-all duration-300 " + (i === activePhotoIdx ? "w-6 h-2 bg-current opacity-70" : "w-2 h-2 bg-current opacity-25 hover:opacity-40")}></button>))}`);
  kit.emit("Album", j.src, { cond: "d.albumOn && d.photos.length > 0", pre: "  const [ratios, setRatios] = React.useState<Record<number, number>>({});" });
}

// ---- Banquet ----
{
  const j = new J(raw(3));
  j.text("THÔNG TIN TIỆC&nbsp;CƯỚI", 'd.banquetTitle.trim() || "THÔNG TIN TIỆC\\u00a0CƯỚI"');
  j.text("Tiệc cưới sẽ diễn ra vào&nbsp;lúc:", '"Tiệc cưới sẽ diễn ra vào\\u00a0lúc:"');
  j.text("17:30", "formatTime(d.startTime || d.time, d.clock)");
  j.text("THỨ BẢY", "WEEKDAYS_FULL[dt.getDay()].toUpperCase()");
  j.textFirst("08", 'String(dt.getDate())');
  j.text("THÁNG 05", '"THÁNG " + String(dt.getMonth() + 1).padStart(2, "0")');
  j.text("2027", "dt.getFullYear()");
  j.rep(">(Tức ngày 3 tháng 4 năm Đinh&nbsp;Mùi)<", ">({nb(lunarLabel(dt))})<");
  j.text("178 ngày 4 giờ 52 phút 46 giây", "cdText");
  j.text("16:30", "formatTime(d.welcomeTime, d.clock)");
  j.text("19:00", "formatTime(d.startTime || d.time, d.clock)");
  j.text("Tháng 5 / 2027", '"Tháng " + (g.m + 1) + " / " + g.y');
  {
    const grid = j.all((n) => j.cls(n).includes("grid-cols-7") && j.cls(n).includes("gap-y-0.5"))[0];
    const kids = j.childrenOf(grid);
    const emptyKid = kids.find((k) => !k.text.includes("<span"));
    const normalKid = kids.find((k) => k.text.includes(">1<"));
    const normal = new J(normalKid.text).text("1", "n");
    const selKid = kids.find((k) => k.text.includes("svg"));
    const selected = new J(selKid.text).text("8", "n");
    const emptyCls = /className="([^"]*)"/.exec(emptyKid.text)[1];
    j.setChildren(grid, `{g.cells.map((n, i) => n === null ? <div key={i} className="${emptyCls}"></div> : n === g.selected ? React.cloneElement(${selected.src}, { key: i }) : React.cloneElement(${normal.src}, { key: i }))}`);
  }
  {
    const a = j.all((n) => j.tag(n) === "a" && /google\.com\/calendar/.test(j.attr(n, "href") || ""))[0];
    j.rep("href=" + j.attr(a.node, "href"), "href={googleCalendarUrl(d)}");
  }
  {
    const welcomeDiv = smallest(j, "div", (s) => s.includes("Đón khách") && s.includes("Khai tiệc"));
    j.splice(welcomeDiv.s, welcomeDiv.e, "{!d.hideWelcomeTimes && (" + j.slice(welcomeDiv) + ")}");
    const cdw = smallest(j, "div", (s) => s.includes("Cùng đếm"));
    j.splice(cdw.s, cdw.e, "{d.countdown && (" + j.slice(cdw) + ")}");
    j.rep('<button type="button" className="inline-flex items-center justify-center rounded-full', '<button type="button" onClick={() => setRsvpOpen(true)} className="inline-flex items-center justify-center rounded-full');
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
  const j = new J(raw(4));
  j.text("Tiệc cưới sẽ tổ chức&nbsp;tại", 'd.locTitle || "Tiệc cưới sẽ tổ chức\\u00a0tại"');
  j.text("White Palace Convention Center\nTP. Hồ Chí Minh", "d.address");
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
  const j = new J(raw(5));
  j.text("DRESS CODE", 'd.dressTitle || "DRESS CODE"');
  j.text("Trang phục dự tiệc", "d.dressText");
  const sw = j.all((n) => j.cls(n) === "flex flex-wrap justify-center gap-4 md:gap-6")[0];
  j.setChildren(sw, '{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(92, 95, 62, 0.19)` } : {}) }}></div>))}');
  kit.emit("Dress", j.src, { cond: "d.dressOn", extra: 'import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";\n' });
}

// ---- Schedule ----
{
  const j = new J(raw(6));
  j.text("LỊCH TRÌNH NGÀY&nbsp;CƯỚI", 'd.schedTitle || "LỊCH TRÌNH NGÀY\\u00a0CƯỚI"');
  const ol = j.all((n) => j.tag(n) === "ol")[0];
  const lis = j.childrenOf(ol);
  const tpl = new J(lis[0].text);
  tpl.text("13:30", 'icon ? (<span className="relative inline-block"><span aria-hidden="true" className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2 right-full" style={{ marginRight: "var(--tl-gut)" }}><img alt="" aria-hidden="true" className="block h-[45px] w-[45px] shrink-0 object-contain md:h-[61px] md:w-[61px]" src={`${t.assets}/${icon}.webp`} /></span>{ev.time}</span>) : ev.time');
  tpl.text("Lễ gia tiên tại nhà gái", "ev.text");
  tpl.rep('className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10"', 'className={"absolute left-1/2 -translate-x-1/2 w-px " + lineCls}');
  j.setChildren(ol, `{d.sched.map((ev, i) => { const n = d.sched.length; const st = Math.floor((n - 3) / 2); const icon = n >= 3 && i >= st && i < st + 3 ? t.scheduleIcons.split(",")[i - st] : null; const lineCls = n === 1 ? "hidden" : i === 0 ? "top-1/2 -bottom-8 md:-bottom-10" : i === n - 1 ? "-top-8 md:-top-10 bottom-1/2" : "-top-8 md:-top-10 -bottom-8 md:-bottom-10"; return (${tpl.src.replace('<li className="contents">', '<li key={i} className="contents">')}); })}`);
  kit.emit("Schedule", j.src, { cond: "d.schedOn" });
}

// ---- Guestbook ----
{
  const j = new J(raw(7));
  j.rep('<form className="mt-4 w-full pr-[8px]">', '<form className="mt-4 w-full pr-[8px]" onSubmit={handleSendWish}>');
  j.rep('defaultValue=""', "value={wishName} onChange={(e) => setWishName(e.target.value)}");
  j.rep('rows="4"', "rows={4} value={wishMsg} onChange={(e) => setWishMsg(e.target.value)}");
  j.rep('maxLength="500"', "maxLength={500}");
  j.rep('maxLength="10000"', "maxLength={10000}");
  const list = j.all((n) => j.cls(n).startsWith("mt-8 w-full space-y-3"))[0];
  const items = j.childrenOf(list);
  const tpl = new J(items[0].text);
  const nameM = />([^<]*)<\/span><span className="text-xs opacity-70">/.exec(items[0].text);
  tpl.text(nameM[1], "w.name").text("16:00:00 28/4/2027", "w.at");
  const msgM = /<p className="mt-2 leading-relaxed">([^<]*)<\/p>/.exec(items[0].text);
  tpl.text(msgM[1], "w.msg");
  j.setChildren(list, `{d.wishes.map((w, wi) => (<React.Fragment key={wi}>${tpl.src}</React.Fragment>))}`);
  kit.emit("Guestbook", j.src, { cond: "d.guestOn" });
}

// ---- Gifts ----
// Ghi chú: html2jsx hỏng className của 2 thẻ h2 (quote lẫn vào, xem bên dưới) làm TS parser
// mất dấu đóng cuối (1 section + 2 div); bù lại 3 thẻ đóng trước khi parse.
{
  const j = new J(raw(8) + "</div></div></section>");
  // html2jsx làm hỏng className của 2 thẻ h2 (chèn lẫn text style vào) — sửa lại
  j.rep(
    'className="mb-4 w-full text-center uppercase text-[20px] md:text-[27px] \\"Times New Roman\\", ChungDoiIndic, serif flex flex-col items-center"',
    'className="mb-4 w-full text-center uppercase text-[20px] md:text-[27px] flex flex-col items-center"'
  );
  j.rep(
    'className="w-full text-center uppercase text-[20px] md:text-[27px] \\"Times New Roman\\", ChungDoiIndic, serif"',
    'className="w-full text-center uppercase text-[20px] md:text-[27px]"'
  );
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
    // chọn widget theo "Kiểu hiển thị" của editor; kiểu mặc định của mẫu giữ markup đã đo, kiểu khác dùng AltGiftWidget
    const bt = j.all((n) => j.tag(n) === "button" && j.attr(n, "aria-label") === '"Mở hộp mừng cưới"')[0];
    j.splice(bt.s, bt.e, '{(d.giftDisplayMode || "envelope") === "envelope" ? (' + j.slice(bt) + ') : <AltGiftWidget ctx={ctx} mode={d.giftDisplayMode} />}');
  }
  kit.emit("Gifts", j.src, { cond: "d.giftOn && d.gifts.length > 0", extra: "import { AltGiftWidget } from \"@/features/invitation/shell/blocks/shared/GiftWidgets\";\n" });
}

// ---- Footer ----
{
  const footerHtml = "<footer className=\"relative z-10 flex w-full flex-col items-center px-6 text-center\"><span className=\"whitespace-pre-line flex flex-col items-center gap-1 text-[11px] leading-[1.5] md:text-[15px] mx-auto md:max-w-[560px]\" style={{ color: \"rgb(92, 95, 62)\", fontFamily: \"\\\"Plus Jakarta Sans\\\", \\\"Helvetica Neue\\\", Arial, ChungDoiIndic, sans-serif\" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span></footer><div className=\"relative z-20 flex w-full items-center justify-center\"><a href=\"https://chungdoi.com\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-xs opacity-50 hover:opacity-70 transition-opacity \" style={{ color: \"rgb(108, 126, 84)\" }}>♡ chungdoi.com</a></div>";
  const j = new J(`<>${footerHtml}</>`);
  j.text("Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!", "d.thanks");
  const th = smallest(j, "footer", (s) => s.includes("{d.thanks}"));
  j.splice(th.s, th.e, "{d.thanksOn && (" + j.slice(th) + ")}");
  kit.emit("Footer", j.src);
}

console.log("done");
