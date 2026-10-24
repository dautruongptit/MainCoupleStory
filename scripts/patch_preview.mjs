import fs from "fs";

let code = fs.readFileSync("src/features/invitation/components/Preview.tsx", "utf-8");

// 1. Add import
if (!code.includes("import { HoaMocXanh }")) {
  code = code.replace(
    'import AlbumGallery from "@/features/invitation/components/AlbumGallery";',
    'import AlbumGallery from "@/features/invitation/components/AlbumGallery";\r\nimport { HoaMocXanh } from "@/features/invitation/components/HoaMocXanh";'
  );
}

// 2. Wrap opened card
const targetStart = '{/* ==================== 2. NỘI DUNG THIỆP ĐÃ MỞ (OPENED) ==================== */}\r\n      {isOpen && (\r\n        <div\r\n          className={`songphung-template';

const replacementStart = '{/* ==================== 2. NỘI DUNG THIỆP ĐÃ MỞ (OPENED) ==================== */}\r\n      {isOpen && (\r\n        d.templateId === "boho_floral_green" ? (\r\n          <HoaMocXanh d={d} set={set} standalone={standalone} />\r\n        ) : (\r\n        <div\r\n          className={`songphung-template';

if (code.includes(targetStart)) {
  code = code.replace(targetStart, replacementStart);
  
  // Also close the ternary right before {isOpen && ( is closed
  const targetEnd = '        </div>\r\n      )}\r\n    </div>\r\n  );\r\n}';
  const replacementEnd = '        </div>\r\n        )\r\n      )}\r\n    </div>\r\n  );\r\n}';
  if (code.includes(targetEnd)) {
    code = code.replace(targetEnd, replacementEnd);
    console.log("Successfully patched start and end!");
  } else {
    console.log("Target end not found, trying fallback matching...");
    const lastDivIdx = code.lastIndexOf('        </div>\r\n      )}');
    if (lastDivIdx !== -1) {
      code = code.slice(0, lastDivIdx) + '        </div>\r\n        )\r\n      )}' + code.slice(lastDivIdx + '        </div>\r\n      )}'.length);
      console.log("Successfully patched using fallback!");
    }
  }

  fs.writeFileSync("src/features/invitation/components/Preview.tsx", code, "utf-8");
  console.log("Preview.tsx updated successfully!");
} else {
  console.log("targetStart not found!");
}
