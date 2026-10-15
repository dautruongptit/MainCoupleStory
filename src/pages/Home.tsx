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
  { src: "Google", date: "Tháng 9/2026", name: "Ngọc Mai Vũ", text: "Rất hài lòng với dịch vụ" },
  { src: "Facebook", date: "Tháng 8/2026", name: "Hoàng Tân", text: "Mẫu mã nhiều tha hồ tự lựa chọn, giá cả phải chăng 😘😘" },
  { src: "Google", date: "Tháng 8/2026", name: "Huong Pham", text: "Thực sự rất vui vì trải nghiệm làm thiệp tại đây. Không chỉ có kho mẫu đẹp, đa dạng mà dịch vụ chăm sóc khách hàng mới là điểm cộng lớn nhất. Các bạn hỗ trợ cực kỳ nhiệt huyết, giải đáp mọi thắc mắc chi tiết." },
  { src: "Google", date: "Tháng 9/2026", name: "Leductrung Le", text: "Mẫu mã thiệp của shop rất đẹp và đa dạng. Shop hỗ trợ siêu nhiệt tình và chu đáo. Mình cảm thấy rất hài lòng." },
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

function TemplateStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 480, behavior: "smooth" });
  return (
    <div className="strip-wrap">
      <button className="strip-btn left" aria-label="Trước" onClick={() => scroll(-1)}>‹</button>
      <div className="strip" ref={ref}>
        {TEMPLATES.map((t) => (
          <Link key={t.file} href="/vi/mau-thiep" className="tpl-card">
            <div className="tpl-img"><img loading="lazy" src={`${CDN}${t.file}.webp`} alt={t.name} />{t.tag && <span className="tpl-tag">{t.tag}</span>}</div>
            <span>{t.name}</span>
          </Link>
        ))}
      </div>
      <button className="strip-btn right" aria-label="Sau" onClick={() => scroll(1)}>›</button>
    </div>
  );
}

export default function Home() {
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <main className="home">
      {/* Hero */}
      <section className="hero-sec">
        <img className="hero-bg" src="/images/banner_hero.webp" alt="" />
        <div className="hero-ov" />
        <div className="hero-in">
          <div className="hero-copy">
            <p className="hero-brand"><b>Chung<i>Đôi</i></b>.com</p>
            <h1>Làm thiệp cưới online miễn phí</h1>
            <p className="hero-quote">“Cuộc sống hối hả, nhưng tình người vẫn vẹn nguyên”</p>
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
      <section className="sec">
        <h2 className="sec-title">Mẫu thiệp cưới online <em>đẹp nhất</em></h2>
        <p className="sec-sub">Khám phá những mẫu thiệp cưới được thiết kế tinh tế và hiện đại</p>
        <TemplateStrip />
        <div className="center"><Link href="/vi/mau-thiep" className="btn-outline-pill">Xem tất cả mẫu thiệp</Link></div>
      </section>

      {/* Steps */}
      <section className="sec">
        <h2 className="sec-title">Làm thiệp cưới điện tử miễn phí &amp; quản lý khách mời</h2>
        <p className="sec-sub">Giữ nét đẹp truyền thống · Tiện lợi thời hiện đại</p>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <span className="step-n">Bước {s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="center col">
          <Link href="/vi/mau-thiep" className="btn-pill">Bắt đầu tạo thiệp</Link>
          <Link href="/vi/tao-thiep-cuoi-online" className="link-sm">Xem video hướng dẫn chi tiết</Link>
        </div>
      </section>

      {/* Support */}
      <section className="sec alt support">
        <h2 className="sec-title">Khi bạn cần, tụi mình luôn có mặt</h2>
        <p className="sec-sub">Chung Đôi luôn sẵn sàng hỗ trợ 24/7. Nhắn tụi mình bất cứ khi nào bạn cần.</p>
        <div className="stat-row">
          <div><small>Thời gian phản hồi</small><b>Dưới 1 phút</b></div>
          <div><small>Hỗ trợ chỉnh sửa</small><b>Đến khi bạn hài lòng</b></div>
        </div>
      </section>

      {/* Reviews */}
      <section className="sec alt">
        <h2 className="sec-title">Đánh giá từ khách hàng</h2>
        <p className="sec-sub">Những lời nhắn thật lòng từ các cặp đôi đã tin tưởng Chung Đôi cho ngày trọng đại.</p>
        <div className="reviews">
          {REVIEWS.map((r) => (
            <article className="review" key={r.name}>
              <header><b>{r.src}</b><small>{r.date}</small></header>
              <h4>{r.name}</h4>
              <p>“{r.text}”</p>
            </article>
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
      <section className="sec split alt rev">
        <div className="split-copy">
          <span className="eyebrow">ĐỔI MẪU TỰ DO</span>
          <h2>Đổi mẫu không cần nhập lại thông tin</h2>
          <p>Chọn mẫu khác bất cứ lúc nào. Tên cô dâu chú rể, tên bố mẹ hai bên, ngày giờ, địa điểm và ảnh cưới đều được giữ nguyên, chỉ có thiết kế thay đổi.</p>
          <Features items={[
            "Mọi thông tin đã nhập được giữ nguyên, bạn không phải gõ lại từ đầu.",
            "Đổi bao nhiêu lần cũng được, hoàn toàn miễn phí.",
            "Link thiệp đã gửi cho khách không đổi, khách vẫn xem được bản mới nhất.",
          ]} />
          <p className="hero-note">Tạo miễn phí · Thử 3 ngày · Đẹp mới thanh toán</p>
          <div className="btn-row">
            <Link href="/vi/tao-thiep-cuoi-online" className="btn-pill">Tạo thiệp miễn phí</Link>
            <Link href="/vi/mau-thiep" className="btn-outline-pill">Xem tất cả mẫu</Link>
          </div>
        </div>
        <div className="split-art tpl-pair">
          <img src={`${CDN}song_hy_red.197afce7.webp`} alt="" />
          <img src={`${CDN}double_dragon_red.e3dd75ad.webp`} alt="" />
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
      <section className="sec split alt rev">
        <div className="split-copy">
          <span className="eyebrow">VIDEO THIỆP CƯỚI</span>
          <h2>Khoe thiệp lên Story và Reels</h2>
          <p>Cả tấm thiệp của hai bạn gói trong một video, để đăng lên mạng xã hội và lưu giữ dài lâu.</p>
          <Features items={[
            "Full HD sắc nét, đăng story, đăng reels hay gửi vào nhóm chat gia đình đều vừa khung.",
            "Nhạc, ảnh và lời mời y hệt tấm thiệp khách đang xem.",
            "Bấm một nút là có, không cần biết dựng video.",
            "Sửa thiệp xong tạo lại, lúc nào cũng là bản mới nhất.",
            "Tải thiệp về máy dễ dàng.",
          ]} />
          <p className="hero-note">Tính năng chỉ có tại Chung Đôi, dành cho thiệp đã thanh toán · Video dài khoảng 1 đến 2 phút, tuỳ độ dài thiệp</p>
          <div className="btn-row">
            <Link href="/vi/mau-thiep" className="btn-pill">Tạo thiệp cưới</Link>
            <Link href="/vi/help/tai-thiep-ve-dang-anh-hoac-video" className="btn-outline-pill">Cách tải video</Link>
          </div>
        </div>
        <div className="split-art tpl-pair">
          <img src={`${CDN}double_phoenix_red.3bfb98ec.webp`} alt="" />
        </div>
      </section>

      {/* Blog */}
      <section className="sec">
        <h2 className="sec-title">Cẩm nang thiệp cưới online</h2>
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
