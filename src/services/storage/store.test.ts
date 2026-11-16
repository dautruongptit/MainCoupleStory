import { describe, expect, it } from "vitest";
import {
  applyTemplateToDraft, collapseDrafts, createDraft, defaultDressColors, defaultGiftMode, getDraftCard,
  loadCards, loadInv, saveCards, saveInv, templatePatch,
} from "./store";
import { TEMPLATES, templateByIdOrSlug } from "@/features/templates/data/templates";
import { defaultGiftModeOf } from "@/features/invitation/shell/blocks/shared/giftDefaults";
import type { Card } from "@/types/card";

const tpl = (id: string) => {
  const t = templateByIdOrSlug(id);
  if (!t) throw new Error("không có mẫu " + id);
  return t;
};
const draft = (id: string): Card => ({ id, name: id, template: "T", color: "C", status: "draft", created: "01/01/2026", tplId: "minimalism_brown" });

describe("quy tắc một thiệp nháp", () => {
  it("tạo nháp lần đầu: một thẻ nháp + nội dung theo mẫu", () => {
    const id = createDraft(tpl("minimalism_brown"));
    expect(loadCards()).toHaveLength(1);
    expect(loadCards()[0]).toMatchObject({ id, status: "draft", tplId: "minimalism_brown", template: "Minimalism", color: "Nâu" });
    expect(loadInv(id)).toMatchObject({ templateId: "minimalism_brown", templateName: "Minimalism - Nâu" });
  });

  it("chọn mẫu khác khi đã có nháp: KHÔNG tạo thêm, áp mẫu vào nháp cũ", () => {
    const id1 = createDraft(tpl("minimalism_brown"));
    const id2 = createDraft(tpl("riviera_blue"));
    expect(id2).toBe(id1);
    expect(loadCards()).toHaveLength(1);
    expect(loadCards()[0].tplId).toBe("riviera_blue");
    expect(loadInv(id1)?.templateId).toBe("riviera_blue");
  });

  it("dữ liệu cũ có nhiều nháp: giữ bản mới nhất, xóa nội dung bản thừa", () => {
    const published: Card = { ...draft("p"), status: "published" as Card["status"] };
    saveCards([draft("a"), published, draft("b")]);
    saveInv("a", { templateId: "minimalism_brown" } as never);
    saveInv("b", { templateId: "minimalism_brown" } as never);
    expect(getDraftCard()?.id).toBe("b"); // danh sách local: mới nhất đứng cuối
    expect(loadCards().map((c) => c.id)).toEqual(["p", "b"]);
    expect(loadInv("a")).toBeNull();
    expect(loadInv("b")).not.toBeNull();
  });

  it("collapseDrafts với danh sách từ server (mới nhất đứng đầu)", () => {
    expect(collapseDrafts([draft("new"), draft("old")], true).map((c) => c.id)).toEqual(["new"]);
    const one = [draft("x")];
    expect(collapseDrafts(one, true)).toBe(one);
  });
});

describe("đổi mẫu giữ dữ liệu người dùng", () => {
  it("giữ tên, ảnh, tài khoản quà… đã nhập", () => {
    const id = createDraft(tpl("minimalism_brown"));
    const inv = loadInv(id)!;
    saveInv(id, { ...inv, groomFull: "Nguyễn Văn A", brideFull: "Trần Thị B", photos: ["blob:1"], gifts: [{ id: "g1" } as never] });
    applyTemplateToDraft(loadCards()[0], tpl("dragon_phoenix_v4_red"));
    expect(loadInv(id)).toMatchObject({ templateId: "dragon_phoenix_v4_red", groomFull: "Nguyễn Văn A", brideFull: "Trần Thị B", photos: ["blob:1"] });
    expect(loadInv(id)!.gifts).toHaveLength(1);
  });

  it("kiểu hộp quà đã chọn luôn được giữ khi đổi mẫu", () => {
    for (const mode of ["gift_box", "envelope", "qr_inline"] as const) {
      for (const t of TEMPLATES) {
        const p = templatePatch(t, { introCustom: false, introText: "", dressColors: [], templateId: "minimalism_brown", giftDisplayMode: mode });
        expect(p.giftDisplayMode, `${t.id} / ${mode}`).toBe(mode);
      }
    }
  });

  it("chưa có kiểu hộp quà: lấy mặc định của mẫu mới", () => {
    const t = tpl("riviera_blue");
    const p = templatePatch(t, { introCustom: false, introText: "", dressColors: [], templateId: "minimalism_brown", giftDisplayMode: undefined as never });
    expect(p.giftDisplayMode).toBe(defaultGiftMode(t.id));
  });

  it("lời mở đầu tự viết được giữ; chưa tự viết thì theo mẫu mới", () => {
    const base = { dressColors: [], templateId: "minimalism_brown", giftDisplayMode: "gift_box" as const };
    expect(templatePatch(tpl("riviera_blue"), { ...base, introCustom: true, introText: "Lời của tôi" }).introText).toBe("Lời của tôi");
    expect(templatePatch(tpl("riviera_blue"), { ...base, introCustom: false, introText: "cũ" }).introText).not.toBe("cũ");
  });

  it("dress code: chưa chỉnh thì đổi theo mẫu mới, đã chỉnh thì giữ", () => {
    const base = { introCustom: false, introText: "", templateId: "minimalism_brown", giftDisplayMode: "gift_box" as const };
    const untouched = templatePatch(tpl("riviera_blue"), { ...base, dressColors: defaultDressColors("minimalism_brown") });
    expect(untouched.dressColors).toEqual(defaultDressColors("riviera_blue"));
    const custom = ["#111111", "#222222"];
    expect(templatePatch(tpl("riviera_blue"), { ...base, dressColors: custom }).dressColors).toEqual(custom);
  });
});

describe("mặc định theo mẫu", () => {
  it("mọi mẫu đều có kiểu hộp quà mặc định đo từ trang gốc", () => {
    for (const t of TEMPLATES) {
      expect(["gift_box", "envelope"], t.id).toContain(defaultGiftModeOf(t.id));
      expect(defaultGiftMode(t.id)).toBe(defaultGiftModeOf(t.id));
    }
  });

  it("dress code mặc định luôn có 4 màu", () => {
    for (const t of TEMPLATES) expect(defaultDressColors(t.id), t.id).toHaveLength(4);
  });
});
