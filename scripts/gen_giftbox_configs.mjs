import fs from "fs";

const raw = JSON.parse(fs.readFileSync("docs/giftbox-audit/raw_75_giftbox_data.json", "utf8"));

let code = `/**
 * Cấu hình Hộp Quà Mừng & Hộp Thoại Quà Mừng cho đủ 75 mẫu thiệp.
 * Được trích xuất trực tiếp từ DOM thật của chungdoi.com.
 * Hỗ trợ 2 kiểu giao diện:
 *  - 3d-box: Hộp quà 3D chuyển động kèm 7 hộp quà nhỏ trang trí xung quanh và pháo giấy bay
 *  - envelope: Phong bì thư tối giản kèm hiệu ứng sao lấp lánh (sparkles)
 */

export interface MiniDecorConfig {
  src: string;
  style: string;
  className: string;
}

export interface GiftboxModalConfig {
  title: string;
  headerBg: string;
  headerColor: string;
  headerFont: string;
  bodyBg: string;
}

export interface GiftboxConfig {
  giftboxType: "3d-box" | "envelope";
  mainBoxSrc?: string;
  miniImgs?: MiniDecorConfig[];
  sectionTitle: string;
  sectionTitleColor?: string;
  sectionTitleFont?: string;
  sectionBg?: string;
  modal: GiftboxModalConfig;
}

export const GIFTBOX_CONFIGS: Record<string, GiftboxConfig> = {
`;

for (const [id, data] of Object.entries(raw)) {
  const isEnv = data.giftboxType === "envelope";
  const mainBox = data.mainBox?.filename ? `/images/giftbox/${data.mainBox.filename}` : undefined;
  
  const miniImgs = (data.miniImgs || []).map(m => {
    let fn = m.filename;
    // Handle known 404
    if (fn === "sunflower_yellow.webp") {
      fn = "dried_flower_v2_green.webp";
    }
    return {
      src: `/images/giftbox/mini/${fn}`,
      style: m.style,
      className: m.className || "igb-decor absolute pointer-events-none"
    };
  });

  const modal = data.modal || {
    title: "Hộp Quà Mừng",
    headerBg: "rgb(195, 42, 41)",
    headerColor: "rgb(255, 255, 255)",
    headerFont: "Oswald, sans-serif",
    bodyBg: "rgb(248, 243, 224)"
  };

  code += `  ${JSON.stringify(id)}: {\n`;
  code += `    giftboxType: ${JSON.stringify(data.giftboxType)},\n`;
  if (mainBox) {
    code += `    mainBoxSrc: ${JSON.stringify(mainBox)},\n`;
  }
  if (miniImgs.length > 0) {
    code += `    miniImgs: ${JSON.stringify(miniImgs)},\n`;
  }
  code += `    sectionTitle: ${JSON.stringify(data.sectionTitle || "HỘP QUÀ MỪNG")},\n`;
  if (data.sectionTitleColor) {
    code += `    sectionTitleColor: ${JSON.stringify(data.sectionTitleColor)},\n`;
  }
  if (data.sectionTitleFont) {
    code += `    sectionTitleFont: ${JSON.stringify(data.sectionTitleFont)},\n`;
  }
  if (data.sectionBg) {
    code += `    sectionBg: ${JSON.stringify(data.sectionBg)},\n`;
  }
  code += `    modal: {\n`;
  code += `      title: ${JSON.stringify(modal.title || "HỘP QUÀ MỪNG")},\n`;
  code += `      headerBg: ${JSON.stringify(modal.headerBg || "rgb(195, 42, 41)")},\n`;
  code += `      headerColor: ${JSON.stringify(modal.headerColor || "rgb(255, 255, 255)")},\n`;
  code += `      headerFont: ${JSON.stringify(modal.headerFont || "inherit")},\n`;
  code += `      bodyBg: ${JSON.stringify(modal.bodyBg || "rgb(248, 243, 224)")},\n`;
  code += `    },\n`;
  code += `  },\n`;
}

code += `};

export function getGiftboxConfig(templateId: string): GiftboxConfig {
  return GIFTBOX_CONFIGS[templateId] || {
    giftboxType: "3d-box",
    mainBoxSrc: "/images/giftbox/nhat_binh_red.webp",
    sectionTitle: "HỘP QUÀ MỪNG",
    modal: {
      title: "HỘP QUÀ MỪNG",
      headerBg: "rgb(195, 42, 41)",
      headerColor: "rgb(255, 255, 255)",
      headerFont: "Oswald, sans-serif",
      bodyBg: "rgb(248, 243, 224)",
    },
  };
}
`;

fs.writeFileSync("src/features/invitation/config/giftboxConfigs.ts", code, "utf8");
console.log("Successfully generated src/features/invitation/config/giftboxConfigs.ts!");
