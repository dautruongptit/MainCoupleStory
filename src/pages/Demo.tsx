import { useState, useMemo } from "react";
import { Inv, defaultInv } from "../data";
import Preview from "../Preview";
import { createDraft } from "../store";
import { Link, navigate } from "../router";
import { TEMPLATES } from "../templates";

/** /vi/mau-thiep/<slug>/demo – thiệp mẫu với dữ liệu minh hoạ. */
export default function Demo({ slug }: { slug: string }) {
  const tpl = useMemo(() => TEMPLATES.find((t) => t.slug === slug), [slug]);

  const isMinimalism = useMemo(
    () => (tpl?.id || "").includes("minimalism") || slug.includes("minimalism"),
    [tpl, slug]
  );
  const isSongHy = useMemo(
    () => (tpl?.id || "").includes("song_hy") || slug.includes("song-hy"),
    [tpl, slug]
  );

  const [d, setD] = useState<Inv>(() => {
    if (isMinimalism) {
      return {
        ...defaultInv,
        templateId: tpl?.id || "minimalism_brown",
        templateName: tpl?.name || "Minimalism - Nâu",
        templateThumb: tpl ? "https://assets.chungdoi.com/template-previews/vi/" + tpl.img : "",
        groomFull: "Hoàng Nam",
        groomNick: "Hoàng Nam",
        brideFull: "Thảo Vy",
        brideNick: "Thảo Vy",
        heroPhoto: "/images/themes/minimalism-brown/couple.webp",
        date: "2026-01-03",
        time: "18:00",
        welcomeTime: "17:30",
        startTime: "18:00",
        locTitle: "TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:",
        address: "Riverside Palace, 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh",
        envelopeGuest: "Thân Mời",
        dressColors: ["#542e08", "#9c7653", "#d6c5b3", "#ece5dd"],
        musicUrl: "https://assets.chungdoi.com/audio/until_i_found_you.mp3",
      };
    }
    if (isSongHy) {
      return {
        ...defaultInv,
        templateId: tpl?.id || "song_hy_green",
        templateName: tpl?.name || "Song Hỷ - Xanh",
        templateThumb: tpl ? "https://assets.chungdoi.com/template-previews/vi/" + tpl.img : "",
        groomFull: "CHÚ RỂ",
        groomNick: "Chú Rể",
        brideFull: "CÔ DÂU",
        brideNick: "Cô Dâu",
        date: "2026-10-18",
        time: "11:00",
        welcomeTime: "10:30",
        startTime: "11:00",
        locTitle: "TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:",
        address: "Trung tâm Hội nghị Tiệc cưới White Palace, TP. Hồ Chí Minh",
        envelopeGuest: "Thân Mời",
        dressColors: ["#143a29", "#2e684a", "#8db398", "#f3f5f3"],
      };
    }
    if (tpl?.id === "dragon_phoenix_v2_red") {
      return {
        ...defaultInv,
        templateId: tpl.id,
        templateName: tpl.name,
        templateThumb: "https://assets.chungdoi.com/template-previews/vi/" + tpl.img,
        groomFull: "Trung Hiếu",
        groomNick: "Trung Hiếu",
        brideFull: "Minh Nguyệt",
        brideNick: "Minh Nguyệt",
        date: "2026-05-24",
        time: "11:00",
        groomFamTitle: "Ông Bà",
        brideFamTitle: "Ông Bà",
        groomFather: "Trần Trung Tiến",
        groomMother: "Nguyễn Thị Nhung",
        groomAddr: "64 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
        brideFather: "Lê Văn Tám",
        brideMother: "Phan Thị Kim Oanh",
        brideAddr: "456 Lê Lợi, Quận 3, TP. Hồ Chí Minh",
        order: "groom",
        envelopeGuest: "Em Toàn",
        envelopeInviteMessage: "đến dự buổi tiệc chung vui cùng gia đình",
      };
    }
    return {
      ...defaultInv,
      templateId: tpl?.id || "double_phoenix_red",
      templateName: tpl?.name || "Song Phụng - Đỏ",
      templateThumb: tpl ? "https://assets.chungdoi.com/template-previews/vi/" + tpl.img : "",
      groomFull: "Nguyễn Tuấn Kiệt",
      brideFull: "Trần Thanh Hà",
      groomNick: "Tuấn Kiệt",
      brideNick: "Thanh Hà",
      date: "2026-12-20",
      time: "11:00",
    };
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
    <div className="demo-standalone-wrap">
      <Preview
        d={d}
        set={(p) => setD((prev) => ({ ...prev, ...p }))}
        standalone={true}
      />
    </div>
  );
}

