import { useState } from "react";
import { Inv, defaultInv } from "../data";
import Preview from "../Preview";
import { createDraft } from "../store";
import { Link, navigate } from "../router";
import { TEMPLATES } from "../templates";

/** /vi/mau-thiep/<slug>/demo – thiệp mẫu với dữ liệu minh hoạ. */
export default function Demo({ slug }: { slug: string }) {
  const tpl = TEMPLATES.find((t) => t.slug === slug);
  const [d, setD] = useState<Inv>({
    ...defaultInv,
    groomFull: "Nguyễn Tuấn Kiệt",
    brideFull: "Trần Thanh Hà",
    groomNick: "Tuấn Kiệt",
    brideNick: "Thanh Hà",
    date: "2026-12-20",
    time: "11:00",
  });

  if (!tpl) {
    return (
      <div className="page narrow">
        <h1 className="page-title">Không tìm thấy mẫu</h1>
        <Link href="/vi/mau-thiep" className="btn-pill">Xem tất cả mẫu</Link>
      </div>
    );
  }

  return (
    <div className="demo-wrap">
      <div className="demo-bar">
        <Link href={`/vi/mau-thiep/${tpl.slug}`} className="back-link">← {tpl.name}</Link>
        <span className="demo-tag">Demo · dữ liệu minh hoạ</span>
        <button className="btn-primary" onClick={() => navigate(`/edit/${createDraft(tpl)}?template=${tpl.id}`)}>Chọn mẫu này</button>
      </div>
      <Preview d={d} set={(p) => setD((prev) => ({ ...prev, ...p }))} />
    </div>
  );
}
