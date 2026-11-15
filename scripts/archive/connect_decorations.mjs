import fs from "fs";

let content = fs.readFileSync("src/features/invitation/components/Preview.tsx", "utf8");
const isCrlf = content.includes("\r\n");
content = content.replace(/\r\n/g, "\n");

if (!content.includes("const themeDecos = getThemeDecorations")) {
  content = content.replace(
    "const themeBgUrl = getThemeBackgroundUrl(d.templateId);",
    "const themeBgUrl = getThemeBackgroundUrl(d.templateId);\n  const themeDecos = getThemeDecorations(d.templateId);"
  );
}

const target = `{themeBgUrl && (
            <div
              className="paper-texture"
              style={{
                backgroundImage: \`url("\${themeBgUrl}")\`,
              }}
            />
          )}`;

const replacement = `{themeBgUrl && (
            <div
              className="paper-texture"
              style={{
                backgroundImage: \`url("\${themeBgUrl}")\`,
              }}
            />
          )}

          {/* Theme Decorations Layer */}
          {themeDecos && themeDecos.length > 0 && (
            <div className="theme-decorations-layer pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
              {themeDecos.map((deco) => (
                <img
                  key={deco.id}
                  src={deco.path}
                  alt=""
                  className={\`theme-deco theme-deco-\${deco.id} pointer-events-none\`}
                  data-theme-deco={deco.id}
                  style={{ display: "none" }}
                />
              ))}
            </div>
          )}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  if (isCrlf) content = content.replace(/\n/g, "\r\n");
  fs.writeFileSync("src/features/invitation/components/Preview.tsx", content);
  console.log("Successfully connected themeDecos to Preview.tsx!");
} else {
  console.log("Target not found!");
}
