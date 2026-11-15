// Thu hộp mừng quà của từng mẫu trên trang gốc (chạy NỀN trong tab chungdoi.com).
// Nạp: (0,eval)(await (await fetch("http://localhost:5199/js/gift_crawl.js")).text()); rồi window.__giftCrawl.start()
// Mỗi mẫu: tải demo ở khổ 390 trong iframe cùng nguồn, ghi markup khối hộp quà (mặc định của mẫu), kiểu, màu/chữ tiêu đề,
// cửa sổ QR sau khi bấm, và HEAD các ảnh hộp/phong bì/mini. Giãn >= 20 giây giữa hai lần tải. Kết quả gửi collector: gift_<id>.json
(() => {
  const LIST = "minimalism-do-dam:minimalism_darkred,minimalism-nau:minimalism_brown,song-hy-xanh:song_hy_green,hoa-moc-xanh:boho_floral_green,song-hy-v2-do:song_hy_v2_red,song-hy-do:song_hy_red,to-duyen-xanh:silk_ribbon_green,minimalism-xanh:minimalism_green,mai-lan-trang:jasmine_white,long-phung-v3-do:dragon_phoenix_v3_red,long-phung-do:dragon_phoenix_red,to-duyen-do-dam:silk_ribbon_darkred,minimalism-nau-dam:minimalism_darkbrown,long-phung-v2-do:dragon_phoenix_v2_red,song-long-do:double_dragon_red,vuonkinh-xanh:glass_garden_green,song-phung-do:double_phoenix_red,song-long-xanh:double_dragon_green,vuonkinh-hong:glass_garden_pink,cam-thach-vang:marble_yellow,thanh-diep-xanh:elegant_leaf_green,to-duyen-hong:silk_ribbon_pink,long-phung-v4-do:dragon_phoenix_v4_red,lien-hoa-v2-xanh:lien_hoa_v2_green,lau-dai-xanh:chateau_green,vuon-xuan-xanh:spring_garden_green,chibi-red:chibi_red,song-hac-do:song_hac_red,nhat-binh-do:nhat_binh_red,baroque-v2-xanh-dam:baroque_v2_darkgreen,baroque-v2-do-dam:baroque_v2_darkred,anh-dao-hong:cherry_blossom_pink,hoa-moc-hong:boho_floral_pink,ren-theu-trang:applique_lace_white,hoa-lua-nau:silk_flora_brown,hoa-tinh-do:hoa_tinh_red,vuon-xuan-lam:spring_garden_blue,minimalism-lam-dam:minimalism_darkblue,hoang-kim-do:royal_red,minimalism-do:minimalism_red,vuon-xuan-do:spring_garden_red,long-phung-xanh:dragon_phoenix_green,hoang-gia-vang:baroque_gold,lau-dai-lam:chateau_blue,song-phung-xanh:double_phoenix_green,hoa-moc-nau:boho_floral_brown,song-long-lam:double_dragon_blue,vuonkinh-xanh-nhat:glass_garden_light_green,hoa-thuy-tinh-lam:crystal_floral_blue,long-phung-lam:dragon_phoenix_blue,co-ba-do:co_ba_red,lien-hoa-hong:lien_hoa_pink,minimalism-tim:minimalism_purple,bach-su-v2-xanh:porcelain_v2_green,hoa-kho-v2-xanh:dried_flower_v2_green,bach-su-v2-hong:porcelain_v2_pink,hoa-kho-v2-lam:hoa_kho_v2_blue,long-phung-huyen:dragon_phoenix_black,hoang-kim-ii-xanh:royal_v2_green,hoang-kim-xanh:royal_green,baroque-lam:baroque_blue,bach-su-nau:porcelain_brown,hoa-thuy-tinh-do:crystal_floral_red,hoang-kim-lam:royal_blue,riviera-lam:riviera_blue,florence-nau:florence_brown,baroque-v2-lam-dam:baroque_v2_darkblue,mai-lan-xanh:jasmine_green,hoa-huong-duong:sunflower_yellow,hoa-thuy-tinh-xanh:crystal_floral_green,santorini-lam:santorini_blue,bach-su-v2-do:porcelain_v2_red,bach-su-lam:porcelain_blue,hoa-mau-lam:folk_floral_blue,bach-su-do:porcelain_red,hoa-dai-hong:hoa_dai_pink,thanhcung-lam:qasr_blue,san-miguel-vang:san_miguel_yellow,vuonkinh-lam:glass_garden_blue,hoang-kim-ii-tim:royal_v2_purple,hoa-kho-cam:hoa_kho_orange,mahal-vang:mahal_gold,floral-fiesta-vang:floral_fiesta_yellow,du-muc-nau:nomad_brown,kim-dien-vang:saraya_gold,thanhcung-vang:qasr_gold,thanhcung-xanh:qasr_green,mandap-do-dam:mandap_darkred,gam-hoa-do:brocade_flower_red,hoa-rum-trang:calla_lily_white,mandap-vang:mandap_yellow,mahal-hong:mahal_pink".split(",").map((s) => { const [slug, id] = s.split(":"); return { slug, id }; });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const J = (o) => JSON.stringify(o);
  const st = (win, e) => { const c = win.getComputedStyle(e); return { color: c.color, ff: c.fontFamily, fs: c.fontSize, fw: c.fontWeight, tt: c.textTransform, ls: c.letterSpacing, lh: c.lineHeight, bg: c.backgroundColor, pad: c.padding, mar: c.margin, ta: c.textAlign }; };
  const rect = (win, e) => { const r = e.getBoundingClientRect(); return { x: +r.left.toFixed(1), y: +(r.top + win.scrollY).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
  const state = (window.__giftCrawl = { done: [], errors: [], running: false, stop: false, current: "" });

  async function head(path) {
    try { const r = await fetch(path, { method: "HEAD" }); return r.ok ? (r.headers.get("content-type") || "").includes("image") : false; } catch (e) { return false; }
  }

  async function one({ slug, id }) {
    document.getElementById("__gf")?.remove();
    const f = document.createElement("iframe");
    f.id = "__gf";
    f.style.cssText = "position:fixed;left:0;top:0;width:390px;height:844px;border:0;z-index:99999;background:#000";
    f.src = `/vi/mau-thiep/${slug}/demo?open=1&autoscroll=0`;
    document.body.appendChild(f);
    await new Promise((r) => (f.onload = r));
    await sleep(6000);
    const w = f.contentWindow, d = w.document;
    const out = { id, slug, assets: {}, found: false };
    // vị trí: tiêu đề "Hộp Quà Mừng"
    const heads = [...d.querySelectorAll("h1,h2,h3,h4,p,span,div")].filter((e) => e.children.length === 0 && /^h[ộo]p qu[àa]\s*m[ừu]ng$/i.test(e.textContent.replace(/ /g, " ").trim()));
    const btn = d.querySelector('button[aria-label="Mở hộp mừng cưới"]');
    out.hasButton = !!btn;
    out.headCount = heads.length;
    const h = heads[0];
    if (h || btn) {
      out.found = true;
      let wrap = btn ? btn.parentElement : h.parentElement;
      // nếu tiêu đề không cùng cha với nút, lấy tổ tiên chung nhỏ nhất
      if (btn && h) { let a = btn; while (a && !a.contains(h)) a = a.parentElement; if (a) wrap = a; }
      (btn || wrap).scrollIntoView({ block: "center" });
      await sleep(1500);
      out.wrapHTML = wrap.outerHTML;
      out.wrapRect = rect(w, wrap);
      out.wrapStyle = st(w, wrap);
      if (h) { out.headStyle = st(w, h); out.headText = h.textContent; out.headTag = h.tagName; out.headRect = rect(w, h); }
      let sec = wrap; for (let i = 0; i < 4 && sec.parentElement; i++) { const c = w.getComputedStyle(sec); if (c.backgroundColor !== "rgba(0, 0, 0, 0)" || c.backgroundImage !== "none") break; sec = sec.parentElement; }
      out.secBg = { bg: w.getComputedStyle(sec).backgroundColor, bgi: w.getComputedStyle(sec).backgroundImage.slice(0, 200), tag: sec.tagName };
      out.parentChain = (() => { const a = []; let e = wrap; for (let i = 0; i < 4 && e; i++) { a.push(e.tagName + "." + (e.getAttribute("class") || "").slice(0, 100)); e = e.parentElement; } return a; })();
      const html = wrap.outerHTML;
      out.kind = /igb-/.test(html) ? "3d-box" : /ienv-/.test(html) ? "envelope" : (btn ? "other-button" : "inline");
      out.imgs = [...wrap.querySelectorAll("img")].map((i) => i.getAttribute("src"));
      if (!state.cssSent) { const css = [...d.querySelectorAll("style")].map((x) => x.textContent).filter((t) => /igb-|ienv-/.test(t)).join(" /* ---- */ "); if (css) { await fetch("http://localhost:5199/gift_css", { method: "POST", body: J({ css }) }); state.cssSent = true; } }
      if (btn) {
        btn.click();
        await sleep(1000);
        const dlg = d.querySelector("dialog[open], dialog.modal-open");
        if (dlg) {
          out.dialogHTML = dlg.outerHTML;
          const box = dlg.querySelector(".modal-box");
          if (box) { out.modalBox = st(w, box); const hd = box.firstElementChild; if (hd) out.modalHead = st(w, hd); const t = dlg.querySelector("h2"); if (t) out.modalTitle = { text: t.textContent, ...st(w, t) }; }
        }
      }
    }
    f.remove();
    out.assets = {}; // không thăm dò ảnh để giảm số yêu cầu; ảnh lấy theo `imgs` của khối
    await fetch("http://localhost:5199/gift_" + id, { method: "POST", body: J(out) });
    return out;
  }

  // ids: mảng id cần thu; gap: ms giữa hai mẫu. Tự dừng khi gặp 2 lần liên tiếp không thấy khối (dấu hiệu bị chặn/403).
  state.start = async (ids, gap = 40000) => {
    if (state.running) return "đang chạy";
    state.running = true; state.stop = false; state.done = []; let miss = 0;
    const todo = LIST.filter((x) => !ids || ids.includes(x.id));
    for (const it of todo) {
      if (state.stop) break;
      state.current = it.id;
      try {
        const o = await one(it);
        state.done.push(it.id + ":" + (o.kind || "none"));
        miss = o.found ? 0 : miss + 1;
        if (miss >= 2) { state.errors.push("dừng: 2 mẫu liên tiếp không thấy khối (có thể bị chặn)"); break; }
      } catch (e) { state.errors.push(it.id + ":" + e.message); document.getElementById("__gf")?.remove(); miss++; if (miss >= 2) break; }
      await sleep(gap);
    }
    state.running = false; state.current = "xong";
    return "xong";
  };
  state.total = LIST.length;
  return "gift_crawl sẵn sàng: " + LIST.length;
})();
