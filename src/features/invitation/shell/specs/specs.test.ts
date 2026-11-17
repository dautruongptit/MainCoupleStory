import { describe, expect, it } from "vitest";
import { TEMPLATES, TEMPLATE_ROW_BY_ID, introDefaultFor, templateByIdOrSlug } from "@/features/templates/data/templates";
import { getCapabilities, getTemplateSpec } from "./index";
import { loadBlocksForFamily } from "@/features/invitation/shell/blocks";
import { giftKindOf } from "@/features/invitation/shell/blocks/shared/giftSpecs";
import { COVER_COMPONENTS, COVER_CONFIGS, getCoverComponent } from "@/features/invitation/components/covers";
import { buildDemoInv } from "@/features/invitation/demo/buildDemoInv";

/** Toàn vẹn của nguồn cấu hình duy nhất `specs/<id>/`: mẫu nào trong kho cũng dựng được thiệp. */
describe("specs/<id>/ — mỗi mẫu một thư mục", () => {
  // (chỉ mục sinh có khớp thư mục specs không: `node scripts/clone/gen_spec_index.mjs --check`, nằm trong `npm run check`)
  it("kho mẫu: id và slug không trùng, tra được theo cả hai", () => {
    expect(new Set(TEMPLATES.map((t) => t.id)).size).toBe(TEMPLATES.length);
    expect(new Set(TEMPLATES.map((t) => t.slug)).size).toBe(TEMPLATES.length);
    for (const t of TEMPLATES) {
      expect(templateByIdOrSlug(t.slug)?.id, t.slug).toBe(t.id);
      expect(templateByIdOrSlug(t.id)?.id, t.id).toBe(t.id);
      expect(introDefaultFor(t.id), t.id).toBeTruthy();
      expect(TEMPLATE_ROW_BY_ID[t.id].img, t.id).toMatch(/^listing\//);
    }
  });

  it("mẫu nào cũng có spec, và mọi khối trong capabilities.blocks đều đã đăng ký cho họ khối", async () => {
    for (const t of TEMPLATES) {
      const spec = getTemplateSpec(t.id);
      expect(spec, `${t.id}: thiếu spec`).not.toBeNull();
      const caps = getCapabilities(t.id)!;
      const blocks = await loadBlocksForFamily(caps.family);
      const missing = caps.blocks.filter((b) => !blocks[b]);
      expect(missing, `${t.id} (họ ${caps.family}): khối chưa đăng ký`).toEqual([]);
    }
  }, 120_000); // tải lần lượt 75 họ khối (mỗi họ một import() động)

  it("tên component bìa ghi trong cover.json đều tồn tại", () => {
    for (const [id, cfg] of Object.entries(COVER_CONFIGS)) {
      expect(cfg.templateId, id).toBe(id);
      if (cfg.component) expect(Object.keys(COVER_COMPONENTS), `${id}: component bìa "${cfg.component}"`).toContain(cfg.component);
    }
    for (const t of TEMPLATES) expect(getCoverComponent(t.id), t.id).toBeTypeOf("function");
  });

  it("mẫu nào cũng có dữ liệu hộp quà đo từ trang gốc", () => {
    for (const t of TEMPLATES) expect(["3d-box", "envelope"], t.id).toContain(giftKindOf(t.id));
  });

  it("dữ liệu demo dựng được cho mọi mẫu và mang đúng mẫu", () => {
    for (const t of TEMPLATES) {
      const inv = buildDemoInv(t);
      expect(inv.templateId).toBe(t.id);
      expect(inv.groomFull && inv.brideFull, t.id).toBeTruthy();
      expect(["gift_box", "envelope", "qr_inline"], t.id).toContain(inv.giftDisplayMode);
    }
  });
});
