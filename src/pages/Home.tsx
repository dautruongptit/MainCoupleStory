import { useRef, useState } from "react";
import { Link } from "../router";

const CDN = "https://assets.chungdoi.com/template-previews/vi/listing/";
const TEMPLATES: { name: string; file: string; tag?: string }[] = [
  { name: "Song Hỷ - Đỏ", file: "song_hy_red.197afce7", tag: "Truyền thống" },
  { name: "Song Hỷ - Xanh", file: "song_hy_green.7f0d10fa", tag: "Mới" },
  { name: "Song Hỷ V2 - Đỏ", file: "song_hy_v2_red.b7d86a91" },
  { name: "Song Long - Đỏ", file: "double_dragon_red.e3dd75ad" },
  { name: "Song Phụng - Đỏ", file: "double_phoenix_red.3bfb98ec" },
  { name: "Thanh Diệp - Xanh", file: "elegant_leaf_green.14803fcc" },
  { name: "Long Phụng - Đỏ", file: "dragon_phoenix_red.ed0480da", tag: "Mới" },
  { name: "Song Hạc - Đỏ", file: "song_hac_red.6bba531a", tag: "Mới" },
  { name: "Riviera - Lam", file: "riviera_blue.8a5c2b0c", tag: "Mới" },
  { name: "San Miguel - Vàng", file: "san_miguel_yellow.22977001", tag: "Mới" },
  { name: "Hoa Dại - Hồng", file: "hoa_dai_pink.6ab5729a", tag: "Mới" },
  { name: "Ren Thêu - Trắng", file: "applique_lace_white.4c8cc4dc", tag: "Mới" },
  { name: "Florence - Nâu", file: "florence_brown.7cd12fe1", tag: "Mới" },
  { name: "Long Phụng V4 - Đỏ", file: "dragon_phoenix_v4_red.8ddb5b57" },
];

const STEPS = [
  { n: 1, t: "Chọn mẫu", d: "Thiệp đẹp đậm chất Việt Nam" },
  { n: 2, t: "Điền thông tin", d: "Thêm ảnh, tên, ngày cưới của bạn" },
  { n: 3, t: "Gửi thiệp", d: "Chia sẻ qua Zalo, Messenger ngay lập tức" },
];

const REVIEWS = [
  {
    src: "Facebook",
    date: "Tháng 7/2026",
    name: "Đinh Thị Thu Thương",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    type: "like" as const,
    text: "Nhanh , đẹp , tiện lợi . 10điểm",
  },
  {
    src: "Google",
    date: "Tháng 9/2026",
    name: "vũ duyên",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    type: "stars" as const,
    stars: 5,
    text: "Quá uy tín,nhiệt tình và đa dạng thỏa thích làm thiệp.1 nghìn điểm nha shop ơi.ai sắp muốn làm thiệp online mà bỏ qua App này thì phí lắm ạ.rẻ-đẹp-chất lượng và đúng theo mẫu dâu rể yêu thích và thỏa sức tạo thiệp❤️❤️❤️",
  },
  {
    src: "Facebook",
    date: "Tháng 7/2026",
    name: "Hương Vũ",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    type: "like" as const,
    text: "Thiệp rất đầy đủ thông tin, đẹp và dễ làm ạ, tư vấn cũng rất nhiệt tình ạ ❤️",
  },
  {
    src: "Google",
    date: "Tháng 9/2026",
    name: "Vinh Le",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    type: "stars" as const,
    stars: 5,
    text: "Mẫu đẹp, sang trọng và rất tiện lợi lun",
  },
  {
    src: "Facebook",
    date: "Tháng 5/2026",
    name: "Thoại Võ",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
    type: "like" as const,
    text: "Nhanh tiện đẹp thiệp giữ được lâu về sau này\nCảm ơn shop ạ",
  },
];

const SWITCH_TEMPLATES = [
  {
    name: "Minimalism - Đỏ Đậm",
    img: "https://assets.chungdoi.com/template-previews/vi/full/minimalism_darkred.4496816d.webp",
    slug: "minimalism-do-dam",
  },
  {
    name: "Minimalism - Nâu",
    img: "https://assets.chungdoi.com/template-previews/vi/full/minimalism_brown.b5df2103.webp",
    slug: "minimalism-nau",
  },
  {
    name: "Song Hỷ - Xanh",
    img: "https://assets.chungdoi.com/template-previews/vi/full/song_hy_green.1a9c9b7f.webp",
    slug: "song-hy-xanh",
  },
  {
    name: "Song Hỷ - Đỏ",
    img: "https://assets.chungdoi.com/template-previews/vi/full/song_hy_red.09106faf.webp",
    slug: "song-hy-do",
  },
  {
    name: "Song Phụng - Đỏ",
    img: "https://assets.chungdoi.com/template-previews/vi/full/double_phoenix_red.95412374.webp",
    slug: "song-phung-do",
  },
];

const BLOG = [
  { t: "Cách lập danh sách khách mời đám cưới", m: 10, s: "cach-lap-danh-sach-khach-moi-dam-cuoi" },
  { t: "Dự toán chi phí đám cưới Việt 2026", m: 12, s: "du-toan-chi-phi-dam-cuoi" },
  { t: "Top 10 Mẫu Thiệp Cưới Online Đẹp Nhất 2026", m: 5, s: "top-10-mau-thiep-cuoi-online-dep-nhat-2026" },
  { t: "Cách tạo và tải thiệp cưới dạng ảnh trên ChungDoi", m: 4, s: "cach-tao-va-tai-thiep-cuoi-dang-anh" },
  { t: "Tạo video thiệp cưới mà không cần biết dựng video", m: 3, s: "cach-tao-video-thiep-cuoi" },
  { t: "Bán vàng cưới không có hóa đơn: hỏi giá thế nào?", m: 8, s: "ban-vang-cuoi-khong-co-hoa-don" },
];

const FAQ: [string, string][] = [
  ["Thiệp cưới online là gì?", "Thiệp cưới online là một trang web riêng biệt và hiện đại, giúp các cặp đôi tự tạo thiệp cưới online một cách độc đáo. Đây không chỉ là một lời mời cưới đơn thuần thay thế thiệp giấy, mà còn là một không gian kỷ niệm kỹ thuật số của riêng bạn. Với thiệp cưới online từ chungdoi.com, bạn có thể làm thiệp với vô số tính năng hữu ích như gửi lời chúc mừng, nhận tiền mừng qua QR code và quản lý khách mời thông minh; mời bạn bè, người thân ở khắp mọi nơi một cách tiện lợi; và lưu trữ mãi mãi những khoảnh khắc, album ảnh và câu chuyện tình yêu của hai bạn."],
  ["Làm thế nào để tạo thiệp cưới online?", "Bạn có thể tự tạo thiệp cưới online chỉ trong 3 bước đơn giản: (1) Đăng ký tài khoản miễn phí trên chungdoi.com. (2) Chọn mẫu thiệp bạn yêu thích từ thư viện, sau đó tùy chỉnh thông tin, hình ảnh và video. (3) Sau khi hoàn thành, xuất bản thiệp và chia sẻ đường link độc đáo của mình đến bạn bè và người thân."],
  ["Chi phí tạo thiệp cưới online là bao nhiêu?", "Tạo và tùy chỉnh thiệp hoàn toàn miễn phí! Sau khi xuất bản, bạn được dùng thử 3 ngày để chia sẻ thiệp với khách mời. Sau đó, bạn chỉ cần thanh toán một lần duy nhất để giữ thiệp mãi mãi. Giá thanh toán sẽ được hiển thị rõ ràng trước khi bạn xác nhận."],
  ["Thiệp cưới online được sử dụng như thế nào?", "Có hai cách sử dụng chính: gửi link trực tiếp đến bạn bè, người thân ở xa qua tin nhắn hoặc mạng xã hội; hoặc in mã QR lên thiệp giấy để khách mời quét bằng điện thoại và truy cập thiệp của bạn ngay lập tức."],
  ["Tôi có cần kiến thức lập trình hay thiết kế để tạo thiệp cưới online không?", "Bạn không cần bất kỳ kiến thức lập trình hay thiết kế nào để tạo thiệp cưới online trên chungdoi.com. Nền tảng có giao diện trực quan, thân thiện, giúp bạn tự tạo thiệp chỉ bằng vài thao tác kéo thả và điền thông tin."],
  ["Tôi cần chuẩn bị những thông tin gì để tạo thiệp cưới online?", "Thông tin về đám cưới: tên cô dâu, chú rể; tên cha mẹ hai bên; địa chỉ nhà trai, nhà gái; thời gian và địa điểm tổ chức tiệc cưới. Nội dung cá nhân hóa: câu chuyện tình yêu của hai bạn và những lời nhắn gửi đặc biệt tới khách mời. Hình ảnh & video: ảnh cưới đẹp, chất lượng cao, video pre-wedding (nếu có). Thông tin bổ sung: số tài khoản ngân hàng để nhận tiền mừng online."],
  ["Tôi có thể chỉnh sửa thông tin sau khi đã xuất bản thiệp không?", "Có. Bạn có thể chỉnh sửa mọi thông tin trên thiệp cưới online của mình bất cứ lúc nào, ngay cả sau khi đã xuất bản. Tất cả thay đổi sẽ được cập nhật tự động và hiển thị ngay lập tức trên đường link bạn đã chia sẻ."],
  ["Tôi có thể gửi thiệp cho tối đa bao nhiêu người?", "Khi làm thiệp cưới tại chungdoi.com, bạn có thể gửi thiệp mời đến số lượng khách mời không giới hạn. Chỉ cần chia sẻ đường link thiệp, bạn có thể lan tỏa niềm vui đến tất cả bạn bè và người thân một cách nhanh chóng."],
];

function Check() {
  return <svg className="ck" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
}

function Features({ items }: { items: string[] }) {
  return <ul className="feat-list">{items.map((t) => <li key={t}><Check />{t}</li>)}</ul>;
}

const COVERFLOW_TEMPLATES = [
  { name: "Song Long - Đỏ", img: "/images/templates/double_dragon_red.webp", slug: "song-long-do" },
  { name: "Thanh Diệp - Xanh", img: "/images/templates/elegant_leaf_green.webp", slug: "thanh-diep-xanh" },
  { name: "Song Hỷ V2 - Đỏ", img: "/images/templates/song_hy_v2_red.webp", slug: "song-hy-v2-do" },
  { name: "Song Hỷ - Xanh", img: "/images/templates/song_hy_green.webp", slug: "song-hy-xanh" },
  { name: "Minimalism - Đỏ Đậm", img: "/images/templates/minimalism_darkred.webp", slug: "minimalism-do-dam" },
  { name: "Minimalism - Nâu", img: "/images/templates/minimalism_brown.webp", slug: "minimalism-nau" },
  { name: "Song Hỷ - Đỏ", img: "/images/templates/song_hy_red.webp", slug: "song-hy-do" },
  { name: "Song Phụng - Đỏ", img: "/images/templates/double_phoenix_red.webp", slug: "song-phung-do" },
  { name: "Long Phụng - Đỏ", img: "/images/templates/dragon_phoenix_red.webp", slug: "long-phung-do" },
  { name: "Song Hạc - Đỏ", img: "/images/templates/song_hac_red.webp", slug: "song-hac-do" },
  { name: "Riviera - Lam", img: "/images/templates/riviera_blue.webp", slug: "riviera-lam" },
  { name: "San Miguel - Vàng", img: "/images/templates/san_miguel_yellow.webp", slug: "san-miguel-vang" },
  { name: "Hoa Dại - Hồng", img: "/images/templates/hoa_dai_pink.webp", slug: "hoa-dai-hong" },
  { name: "Ren Thêu - Trắng", img: "/images/templates/applique_lace_white.webp", slug: "ren-theu-trang" },
  { name: "Florence - Nâu", img: "/images/templates/florence_brown.webp", slug: "florence-nau" },
];

function CoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(4); // "Minimalism - Đỏ Đậm"

  const prev = () => setActiveIndex((curr) => (curr > 0 ? curr - 1 : COVERFLOW_TEMPLATES.length - 1));
  const next = () => setActiveIndex((curr) => (curr < COVERFLOW_TEMPLATES.length - 1 ? curr + 1 : 0));

  return (
    <div className="coverflow-sec">
      <div className="coverflow-wrap">
        <button className="coverflow-btn left" aria-label="Trước" onClick={prev}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="coverflow-stage">
          {COVERFLOW_TEMPLATES.map((tpl, i) => {
            const diff = i - activeIndex;
            const absDiff = Math.abs(diff);

            let transform = "";
            let zIndex = 20 - absDiff;
            let opacity = 1;
            let filter = "none";
            let pointerEvents: "auto" | "none" = "auto";

            if (diff === 0) {
              transform = "translateX(0px) translateZ(0px) rotateY(0deg) scale(1.05)";
              zIndex = 30;
              opacity = 1;
              filter = "brightness(1)";
            } else if (diff < 0) {
              const offset = diff * 85 - 90;
              const rot = Math.min(45, 28 + absDiff * 3);
              const scale = Math.max(0.68, 1 - absDiff * 0.07);
              const z = -absDiff * 50;
              transform = `translateX(${offset}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`;
              opacity = absDiff > 5 ? 0 : Math.max(0.35, 1 - absDiff * 0.14);
              filter = `brightness(${Math.max(0.45, 1 - absDiff * 0.12)})`;
              if (absDiff > 5) pointerEvents = "none";
            } else {
              const offset = diff * 85 + 90;
              const rot = -Math.min(45, 28 + absDiff * 3);
              const scale = Math.max(0.68, 1 - absDiff * 0.07);
              const z = -absDiff * 50;
              transform = `translateX(${offset}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`;
              opacity = absDiff > 5 ? 0 : Math.max(0.35, 1 - absDiff * 0.14);
              filter = `brightness(${Math.max(0.45, 1 - absDiff * 0.12)})`;
              if (absDiff > 5) pointerEvents = "none";
            }

            return (
              <div
                key={tpl.slug}
                className="coverflow-card"
                style={{
                  transform,
                  zIndex,
                  opacity,
                  filter,
                  pointerEvents,
                }}
                onClick={() => setActiveIndex(i)}
              >
                <img src={tpl.img} alt={tpl.name} loading="lazy" />
              </div>
            );
          })}
        </div>

        <button className="coverflow-btn right" aria-label="Sau" onClick={next}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="coverflow-dots-row">
        {COVERFLOW_TEMPLATES.map((tpl, i) => (
          <button
            key={tpl.slug}
            type="button"
            className={`coverflow-dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
            aria-label={tpl.name}
          />
        ))}
      </div>

      <div className="center col" style={{ marginTop: "24px", gap: "10px" }}>
        <Link
          href="/vi/mau-thiep"
          className="btn-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "0 28px",
            height: "44px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          <span>Xem tất cả mẫu thiệp</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
        <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          Những mẫu thiệp độc đáo đang chờ bạn
        </p>
      </div>
    </div>
  );
}

function StepsSection() {
  return (
    <section className="steps-sec-v2">
      <h2 className="sec-title-v2">
        Làm thiệp cưới điện tử miễn phí <span className="hl-script-pink">&amp; quản lý khách mời</span>
      </h2>
      <p className="sec-sub-v2">
        Giữ nét đẹp truyền thống · Tiện lợi thời hiện đại
      </p>

      <div className="steps-grid-v2">
        {/* Left column: Timeline */}
        <div className="steps-timeline">
          {/* Step 1 */}
          <div className="step-item-v2">
            <div className="step-icon-col">
              <div className="step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="step-v-line" />
            </div>
            <div className="step-content-col">
              <span className="step-badge-label">Bước 1</span>
              <h3 className="step-heading-main">Chọn mẫu</h3>
              <p className="step-desc-sub">Thiệp đẹp đậm chất Việt Nam</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-item-v2">
            <div className="step-icon-col">
              <div className="step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <div className="step-v-line" />
            </div>
            <div className="step-content-col">
              <span className="step-badge-label">Bước 2</span>
              <h3 className="step-heading-main">Điền thông tin</h3>
              <p className="step-desc-sub">Thêm ảnh, tên, ngày cưới của bạn</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-item-v2">
            <div className="step-icon-col">
              <div className="step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
            </div>
            <div className="step-content-col">
              <span className="step-badge-label">Bước 3</span>
              <h3 className="step-heading-main">Gửi thiệp</h3>
              <p className="step-desc-sub">Chia sẻ qua Zalo, Messenger ngay lập tức</p>
            </div>
          </div>
        </div>

        {/* Right column: Tutorial Phone Card */}
        <div className="tut-card-wrap">
          <div className="tut-card-box">
            <div className="tut-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="20" height="20" viewBox="0 0 32 32">
                  <rect width="32" height="32" rx="8" fill="#fc0081" />
                  <path d="M16 7c-2 2-3 5-3 8 0 4 2 7 3 9 1-2 3-5 3-9 0-3-1-6-3-8Z" fill="#fff" opacity=".9" />
                  <path d="M16 10c-3 1-6 3-7 6 1 3 4 5 7 7 3-2 6-4 7-7-1-3-4-5-7-6Z" fill="#fff" />
                </svg>
                <h4 className="tut-card-title">Hướng dẫn tạo thiệp</h4>
              </div>
              <p className="tut-card-sub">
                Chung Đôi - Thiệp Cưới Online · <span className="tut-brand-script">chungdoi.com</span>
              </p>
              <div>
                <span className="tut-start-pill">Bắt đầu từ đây</span>
              </div>
            </div>

            <div className="tut-phones-stage">
              <div className="tut-phone-back-left">
                <img src="/images/templates/applique_lace_white.webp" alt="Preview Left" className="tut-phone-screen-img" />
              </div>
              <div className="tut-phone-back-right">
                <img src="/images/templates/song_hy_green.webp" alt="Preview Right" className="tut-phone-screen-img" />
              </div>
              <div className="tut-phone-center-main">
                <img src="/images/themes/minimalism-brown/couple.webp" alt="Hoàng Long & Bảo Ngọc" className="tut-phone-screen-img" />
                <div className="tut-yt-play" title="Xem video hướng dẫn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                    <polygon points="8 5 19 12 8 19 8 5" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="tut-card-footer">
              Khách mời có thể xem địa điểm và xác nhận tham dự ngay trên thiệp.
            </p>
          </div>
        </div>
      </div>

      <div className="center col" style={{ marginTop: "32px", gap: "10px" }}>
        <Link href="/vi/mau-thiep" className="btn-pill" style={{ height: "44px", padding: "0 32px", fontSize: "14px", fontWeight: 600 }}>
          Bắt đầu tạo thiệp
        </Link>
        <Link href="/vi/tao-thiep-cuoi-online" className="link-sm" style={{ fontSize: "12px", opacity: 0.65 }}>
          Xem video hướng dẫn chi tiết
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const [faq, setFaq] = useState<number | null>(0);
  const [activeReviewDot, setActiveReviewDot] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [activeSwitchTpl, setActiveSwitchTpl] = useState(0);
  return (
    <main className="home">
      {/* Hero */}
      <section className="hero-sec">
        <img className="hero-bg" src="/images/banner_hero.webp" alt="" />
        <div className="hero-ov" />
        <div className="hero-in">
          <div className="hero-copy">
            <p className="hero-brand"><span className="hl-script-pink" style={{ fontSize: "28px", verticalAlign: "middle" }}>ChungĐôi</span>.com</p>
            <h1>Làm thiệp cưới online miễn phí</h1>
            <p className="hero-quote">“Cuộc sống vội vã, nhưng tình người vẫn vẹn nguyên”</p>
            <p className="hero-desc">Mảnh ghép hiện đại của truyền thống mời cưới – Thiệp cưới online giúp bạn gửi tấm chân tình nhanh hơn, xa hơn, đến nhiều người hơn.</p>
            <p className="hero-note">Tạo miễn phí · Thử 3 ngày · Đẹp mới thanh toán</p>
            <Link href="/vi/mau-thiep" className="btn-pill">Tạo Thiệp Ngay</Link>
          </div>
          <div className="hero-phones">
            <img className="phone p1" src="/images/mockup-left.webp" alt="Thiệp cưới online trên điện thoại" />
            <img className="phone p2" src="/images/mockup-right.webp" alt="Thiệp cưới online trên điện thoại" />
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <h2 className="sec-title">Mẫu thiệp cưới online <em>đẹp nhất</em></h2>
        <p className="sec-sub">Khám phá những mẫu thiệp cưới được thiết kế tinh tế và hiện đại</p>
        <CoverflowCarousel />
      </section>

      {/* Steps */}
      <StepsSection />

      {/* Support */}
      <section className="sec support-sec-v2">
        <h2 className="sec-title-v2">
          Khi bạn cần, <span className="hl-script-pink">tụi mình luôn có mặt</span>
        </h2>
        <p className="sec-sub-v2">
          Chung Đôi luôn sẵn sàng hỗ trợ 24/7.{" "}
          <a
            href="https://facebook.com/chungdoicom"
            target="_blank"
            rel="noreferrer"
            className="hl-pink font-semibold hover:underline"
          >
            Nhắn tụi mình
          </a>{" "}
          bất cứ khi nào bạn cần.
        </p>

        <div className="home-support-pill">
          <div className="support-stat-item">
            <div className="stat-icon-wrap stat-bolt">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="stat-info-col">
              <span className="stat-label-sub">Thời gian phản hồi</span>
              <span className="stat-val-main">Dưới 1 phút</span>
            </div>
          </div>

          <div className="support-stat-div" />

          <div className="support-stat-item">
            <div className="stat-icon-wrap stat-clock">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="stat-info-col">
              <span className="stat-label-sub">Hỗ trợ chỉnh sửa</span>
              <span className="stat-val-main">Đến khi bạn hài lòng</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="sec reviews-sec-v2">
        <h2 className="sec-title-v2">
          Đánh giá từ <span className="hl-script-pink">khách hàng</span>
        </h2>
        <p className="sec-sub-v2">
          Những lời nhắn thật lòng từ các cặp đôi đã tin tưởng Chung Đôi cho ngày trọng đại.
        </p>

        <div
          className="reviews-carousel-track"
          ref={reviewsRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const scrollLeft = el.scrollLeft;
            const cardWidth = 320;
            const idx = Math.round(scrollLeft / cardWidth);
            setActiveReviewDot(Math.min(REVIEWS.length - 1, Math.max(0, idx)));
          }}
        >
          {REVIEWS.map((r) => (
            <article className="review-card-v2" key={r.name}>
              <div className="review-card-head">
                {r.src === "Facebook" ? (
                  <span className="rev-badge fb">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </span>
                ) : (
                  <span className="rev-badge gg">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.09C3.31 21.46 7.37 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.09z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.31 2.54 1.27 6.59l4.01 3.09c.95-2.83 3.6-4.93 6.72-4.93z" />
                    </svg>
                    Google
                  </span>
                )}
                <span className="rev-date">{r.date}</span>
              </div>

              <div className="review-user-row">
                <img src={r.avatar} alt={r.name} className="rev-avatar" />
                <div className="rev-user-col">
                  <div className="rev-user-name">{r.name}</div>
                  {r.type === "like" ? (
                    <div className="rev-like-wrap">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="#3b82f6">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                    </div>
                  ) : (
                    <div className="rev-stars-wrap">
                      {"★".repeat(r.stars || 5)}
                    </div>
                  )}
                </div>
                <div className="rev-ext-ico">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </div>
              </div>

              <div className="review-quote-body">
                <span className="rev-quote-mark">“</span> {r.text} <span className="rev-quote-mark">”</span>
              </div>
            </article>
          ))}
        </div>

        {/* Dots Pagination */}
        <div className="reviews-dots-row">
          {Array.from({ length: 10 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`rev-dot ${i === activeReviewDot ? "active" : ""}`}
              onClick={() => {
                setActiveReviewDot(i);
                if (reviewsRef.current) {
                  reviewsRef.current.scrollTo({ left: i * 320, behavior: "smooth" });
                }
              }}
              aria-label={`Trang ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Guest management */}
      <section className="sec split">
        <div className="split-copy">
          <span className="eyebrow">TẠO KHÁCH &amp; QUẢN LÝ RSVP</span>
          <h2>Biết ai sẽ đến, tiệc cưới nhẹ tênh</h2>
          <p>Gửi lời mời thật trang trọng, rồi yên tâm chuẩn bị cho ngày vui. Khỏi phải lục lại tin nhắn đếm ai đi ai không, đã có trang quản lý khách mời thông minh lo phần đó.</p>
          <Features items={[
            "Thêm từng khách hoặc thêm hàng loạt, rồi chia nhóm theo gia đình hay bàn tiệc",
            "Mỗi khách một link riêng, lời chào và lời mời đúng vai vế hiện trên phong bì",
            "Khách xác nhận có đến hay không, kèm số người và những câu bạn muốn hỏi",
            "Tạo link để người nhà cùng thêm khách, không cần đăng nhập",
            "Sửa, gộp nhóm hay xoá nhiều khách cùng lúc, xem tổng quan trong nháy mắt",
          ]} />
          <div className="btn-row">
            <Link href="/vi/tao-thiep-cuoi-online" className="btn-pill">Tạo thiệp cưới</Link>
            <Link href="/vi/help/huong-dan-trang-khach-moi" className="btn-outline-pill">Quản lý khách mời</Link>
          </div>
        </div>
        <div className="split-art rsvp-demo">
          <p className="eyebrow">LINK RIÊNG CỦA KHÁCH</p>
          <div className="demo-card">
            <small>Tên khách đã điền sẵn</small>
            <b>Anh Tuấn &amp; Chị Hà sẽ đến chung vui chứ?</b>
            <div className="demo-opts"><span className="on">Tôi sẽ đến</span><span>Không đến</span></div>
            <small>Số người đi cùng</small><small>Cần xe đưa đón?</small><small>Món chay / dị ứng</small><small>Bài hát muốn nghe</small>
          </div>
          <p className="eyebrow">QUẢN LÝ KHÁCH</p>
          <div className="demo-card stats">
            <div><b>58</b><small>người dự tiệc đã ghi nhận</small></div>
            <div><b>84%</b><small>đã trả lời</small></div>
            <div><b className="g">24</b><small>Có đến</small></div>
            <div><b className="r">3</b><small>Không đến</small></div>
            <div><b>5</b><small>Chưa trả lời</small></div>
          </div>
        </div>
      </section>

      {/* Switch template */}
      <section className="sec switch-tpl-sec">
        <div className="switch-tpl-grid">
          <div className="switch-tpl-copy">
            <div className="badge-free-change">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
              <span>ĐỔI MẪU TỰ DO</span>
            </div>

            <h2 className="switch-tpl-title">
              Đổi mẫu không cần <span className="hl-script-pink">nhập lại thông tin</span>
            </h2>

            <p className="switch-tpl-desc">
              Chọn mẫu khác bất cứ lúc nào. Tên cô dâu chú rể, tên bố mẹ hai bên, ngày giờ, địa điểm và ảnh cưới đều được giữ nguyên, chỉ có thiết kế thay đổi.
            </p>

            <ul className="switch-tpl-feats">
              <li>
                <span className="pink-check-circle">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Mọi thông tin đã nhập được giữ nguyên, bạn không phải gõ lại từ đầu.</span>
              </li>
              <li>
                <span className="pink-check-circle">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Đổi bao nhiêu lần cũng được, hoàn toàn miễn phí.</span>
              </li>
              <li>
                <span className="pink-check-circle">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Link thiệp đã gửi cho khách không đổi, khách vẫn xem được bản mới nhất.</span>
              </li>
            </ul>

            <div className="switch-tpl-btns">
              <Link href="/vi/mau-thiep" className="btn-switch-primary">
                Tạo thiệp miễn phí
              </Link>
              <Link href="/vi/mau-thiep" className="btn-switch-secondary">
                Xem tất cả mẫu
              </Link>
            </div>

            <p className="switch-tpl-subnote">
              Tạo miễn phí · Thử 3 ngày · Đẹp mới thanh toán
            </p>
          </div>

          <div className="switch-tpl-art">
            <div className="phone-mockup-wrap">
              <div className="phone-mockup-frame">
                <img
                  src={SWITCH_TEMPLATES[activeSwitchTpl].img}
                  alt={SWITCH_TEMPLATES[activeSwitchTpl].name}
                  className="phone-mockup-screen"
                />
              </div>

              {/* Dots and Template Name */}
              <div className="switch-tpl-indicator">
                <div className="switch-dots-row">
                  {SWITCH_TEMPLATES.map((tpl, i) => (
                    <button
                      key={tpl.slug}
                      type="button"
                      className={`switch-dash-dot ${i === activeSwitchTpl ? "active" : ""}`}
                      onClick={() => setActiveSwitchTpl(i)}
                      aria-label={tpl.name}
                    />
                  ))}
                </div>
                <div className="switch-tpl-label">
                  {SWITCH_TEMPLATES[activeSwitchTpl].name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multilingual */}
      <section className="sec split">
        <div className="split-copy">
          <h2>Hỗ Trợ Đa Ngôn Ngữ</h2>
          <Features items={["Thêm ngôn ngữ chỉ với 1 click", "Nội dung hiển thị song song", "Có sẵn bản dịch mặc định", "Tuỳ chỉnh bản dịch dễ dàng"]} />
          <div className="btn-row">
            <Link href="/vi/mau-thiep" className="btn-pill">Tạo thiệp ngay</Link>
            <Link href="/vi/thiep-cuoi-da-ngon-ngu" className="btn-outline-pill">Tìm hiểu thêm</Link>
          </div>
        </div>
        <div className="split-art lang-demo">
          <div><b>Chú Rể</b><i>Novio</i></div>
          <div><b>Cô Dâu</b><i>Novia</i></div>
          <div><b>Trân trọng kính mời</b><i>Les Invitamos Cordialmente</i></div>
        </div>
      </section>

      {/* Video */}
      <section className="video-story-sec">
        <div className="video-story-grid">
          <div className="video-story-copy">
            <div className="badge-video">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2.18" />
                <path d="M7 4v16M17 4v16M2 12h20M2 8h5M2 16h5M17 8h5M17 16h5" />
              </svg>
              <span>VIDEO THIỆP CƯỚI</span>
            </div>

            <h2 className="switch-tpl-title">
              Khoe thiệp lên <span className="hl-script-pink">Story và Reels</span>
            </h2>

            <p className="switch-tpl-desc">
              Cả tấm thiệp của hai bạn gói trong một video, để đăng lên mạng xã hội và lưu giữ dài lâu.
            </p>

            <ul className="switch-tpl-feats">
              <li>
                <span className="pink-check-circle">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Full HD sắc nét, đăng story, đăng reels hay gửi vào nhóm chat gia đình đều vừa khung.</span>
              </li>
              <li>
                <span className="pink-check-circle">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Nhạc, ảnh và lời mời y hệt tấm thiệp khách đang xem.</span>
              </li>
              <li>
                <span className="pink-check-circle">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Bấm một nút là có, không cần biết dựng video.</span>
              </li>
              <li>
                <span className="pink-check-circle">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Sửa thiệp xong tạo lại, lúc nào cũng là bản mới nhất.</span>
              </li>
              <li>
                <span className="pink-check-circle">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Tải thiệp về máy dễ dàng.</span>
              </li>
            </ul>

            <div className="switch-tpl-btns">
              <Link href="/vi/mau-thiep" className="btn-switch-primary">
                Tạo thiệp cưới
              </Link>
              <Link href="/vi/help/tai-thiep-ve-dang-anh-hoac-video" className="btn-switch-secondary">
                Cách tải video
              </Link>
            </div>

            <p className="switch-tpl-subnote">
              Tính năng chỉ có tại Chung Đôi, dành cho thiệp đã thanh toán
            </p>
          </div>

          <div className="video-phone-wrap">
            <div className="video-phone-frame">
              <div className="video-phone-screen">
                <div className="video-card-inner">
                  <div className="video-card-heart-circle">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <div className="video-card-names">
                    <span>Thanh Tùng</span>
                    <span className="amp">&amp;</span>
                    <span>Như Hảo</span>
                  </div>
                  <div className="video-card-meta">
                    <div>24 Tháng 03 2024</div>
                    <div>Thác Mơ</div>
                  </div>
                  <div className="video-card-art">
                    <img src="/images/themes/minimalism-brown/house-background.webp" alt="Thanh Tùng &amp; Như Hảo" />
                  </div>
                  <span className="video-card-btn">Mở thiệp</span>

                  <div className="video-play-center" title="Xem video mẫu">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: "2px" }}>
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="video-phone-caption">Video dài khoảng 1 đến 2 phút, tuỳ độ dài thiệp</p>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="sec">
        <h2 className="sec-title">Cẩm nang thiệp cưới <span className="hl-script-pink">online</span></h2>
        <p className="sec-sub">Kinh nghiệm và mẹo hay cho ngày trọng đại</p>
        <div className="blog-grid">
          {BLOG.map((b) => (
            <Link key={b.s} href={`/vi/blog/${b.s}`} className="blog-card">
              <h4>{b.t}</h4>
              <small>{b.m} phút đọc</small>
            </Link>
          ))}
        </div>
        <div className="center"><Link href="/vi/blog" className="btn-outline-pill">Xem tất cả bài viết</Link></div>
      </section>

      {/* FAQ */}
      <section className="sec faq">
        <h2 className="sec-title">Câu hỏi thường gặp về thiệp cưới online</h2>
        {FAQ.map(([q, a], i) => (
          <div className={"faq-item" + (faq === i ? " open" : "")} key={q}>
            <button aria-expanded={faq === i} onClick={() => setFaq(faq === i ? null : i)}>{q}<span>{faq === i ? "−" : "+"}</span></button>
            {faq === i && <p>{a}</p>}
          </div>
        ))}
      </section>

    </main>
  );
}
