import { Link } from "@/app/router";

const Ck = () => <svg className="ck" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
const No = () => <span className="dash">–</span>;

const PERKS = [
  "Đổi mẫu thoải mái",
  "Thiệp tồn tại vĩnh viễn",
  "Không giới hạn khách mời",
  "Ghi tên khách mời không giới hạn",
  "Bản đồ chỉ đường Google Maps",
  "Album ảnh không giới hạn",
  "QR Code nhận mừng cưới",
  "Thống kê khách mời chi tiết",
  "Tải thiệp dạng video và ảnh",
];

const STEPS = [
  ["Tạo thiệp miễn phí", "Chọn mẫu, điền thông tin, tùy chỉnh theo ý thích. Hoàn toàn miễn phí, không cần đăng ký."],
  ["Dùng thử 3 ngày", "Chia sẻ thiệp cho khách mời xem thử. Đầy đủ tính năng, mời tối đa 20 người."],
  ["Thanh toán khi hài lòng", "Chỉ thanh toán khi bạn thực sự thích. Thiệp hoạt động vĩnh viễn sau khi thanh toán."],
];

const ROWS: [string, boolean | string, boolean | string][] = [
  ["Đổi mẫu bất cứ lúc nào", true, true],
  ["Tất cả mẫu thiệp", true, true],
  ["Chỉnh sửa không giới hạn", true, true],
  ["Nhạc nền, ảnh, video", true, true],
  ["Bản đồ Google Maps", true, true],
  ["QR Code nhận mừng cưới", true, true],
  ["Thời gian sử dụng", "3 ngày", "Vĩnh viễn"],
  ["Số khách mời", "20 người", "Không giới hạn"],
  ["Tải thiệp dạng video và ảnh", false, true],
];

const WHY = [
  ["Đổi mẫu thoải mái", "Một lần thanh toán cho một thiệp. Đổi sang mẫu thiết kế bất kỳ, nội dung giữ nguyên, không tính thêm phí."],
  ["Sở hữu vĩnh viễn", "Thanh toán một lần, thiệp hoạt động mãi mãi. Không phí duy trì hàng tháng."],
  ["Mời không giới hạn", "Gửi thiệp cho bao nhiêu khách tùy thích, ghi tên từng người."],
];

const cell = (v: boolean | string) => (typeof v === "string" ? v : v ? <Ck /> : <No />);

export default function Pricing() {
  return (
    <main className="pricing">
      <section className="pr-hero">
        <div className="pr-copy">
          <span className="chip-badge">Bảng giá</span>
          <h1>Bảng giá đơn giản, không phí ẩn</h1>
          <p>Thiệp cưới online đẹp, đầy đủ tính năng cho ngày trọng đại của bạn.</p>
          <div className="pill-row">
            <span>Đổi mẫu bất cứ lúc nào</span>
            <span>Dùng thử miễn phí 3 ngày</span>
            <span>Sở hữu vĩnh viễn</span>
          </div>
        </div>
        <div className="pr-art">
          <img src="/images/mockup-right.webp" alt="Thiệp cưới online trên điện thoại" />
          <div className="float-price"><small>Thanh toán một lần cho mỗi thiệp</small><b>199.000đ</b><small>Chuyển khoản ngân hàng hoặc QR</small></div>
        </div>
      </section>

      <section className="plans">
        <article className="plan main">
          <span className="chip-badge pink">Thanh toán một lần cho mỗi thiệp</span>
          <div className="price">199.000<u>đ</u></div>
          <p className="muted">Không phí duy trì hàng tháng.</p>
          <ul className="feat-list">{PERKS.map((p) => <li key={p}><Ck />{p}</li>)}</ul>
          <Link href="/vi/mau-thiep" className="btn-pill wide">Bắt đầu miễn phí</Link>
        </article>
        <article className="plan second">
          <h3>Thiệp thứ 2 trở đi</h3>
          <div className="price sm">99.000đ <span className="off">-50%</span></div>
          <p className="muted">Nhiều cặp đôi cần thiệp riêng cho từng nhóm khách: nhà trai, nhà gái, bạn bè, đồng nghiệp. Thiệp thứ 2 trở đi giảm 50%.</p>
          <p className="muted">Tự động áp dụng khi tài khoản của bạn đã có thiệp thanh toán trước đó.</p>
        </article>
      </section>
      <p className="secure">Thanh toán an toàn, mã hóa bảo mật · Chuyển khoản ngân hàng hoặc QR</p>

      <section className="pr-sec">
        <h2>Mua thiệp cưới online theo 3 bước</h2>
        <div className="steps3">
          {STEPS.map(([t, d], i) => (
            <div key={t} className="step3"><span className="num">{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="pr-sec">
        <h2>So sánh gói miễn phí và gói trả phí</h2>
        <table className="cmp">
          <thead><tr><th>Tính năng</th><th>Miễn phí</th><th className="hi">Trả phí</th></tr></thead>
          <tbody>
            {ROWS.map(([f, a, b]) => (
              <tr key={f}><td>{f}</td><td>{cell(a)}</td><td className="hi">{cell(b)}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="pr-sec">
        <h2>Vì sao chọn Chung Đôi?</h2>
        <div className="why">
          {WHY.map(([t, d]) => <div key={t} className="why-card"><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>
    </main>
  );
}
