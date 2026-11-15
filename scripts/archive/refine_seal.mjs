import fs from "fs";

let code = fs.readFileSync("src/features/invitation/components/covers/BaseCoverCard.tsx", "utf8");
const isCrlf = code.includes("\r\n");
code = code.replace(/\r\n/g, "\n");

const pattern = /\{\/\* Seal Button on top \*\/\}[\s\S]*?\{config\.sealType !== "none" && \([\s\S]*?\{config\.sealType === "xi" \? \(/;

const replacement = `{/* Seal Button on top */}
        {config.sealType !== "none" && (
          <div
            onClick={triggerOpen}
            aria-busy={isOpening ? "true" : undefined}
            title="Bấm để mở thiệp"
            className={\`wax-seal absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform \${
              isOpening ? "pointer-events-none" : "hover:scale-105 active:scale-95"
            }\`}
            style={{
              top: config.sealTop !== undefined ? config.sealTop : 50,
              width: 56,
              height: 56,
              transform: "translate(-50%, -50%)",
              background: sealBg,
              boxShadow: isOpening ? "none" : \`0 4px 20px rgba(\${config.rgb}, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)\`,
              zIndex: 30,
              animation: isOpening
                ? "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running seal-break"
                : "seal-pulse 2s ease-in-out infinite",
            }}
          >
            {!isOpening && (
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none"
                style={{ backgroundColor: sealBg }}
              />
            )}
            {config.sealType === "xi" ? (`;

code = code.replace(pattern, replacement);

// Also remove the extra closing </div> for the nested div
code = code.replace(
  /\<\/div\>\s*\<\/div\>\s*\)\}\s*\{\/\* Card Border \& Background Shapes \*\/\}/,
  '</div>\n        )}\n\n        {/* Card Border & Background Shapes */}'
);

if (isCrlf) code = code.replace(/\n/g, "\r\n");
fs.writeFileSync("src/features/invitation/components/covers/BaseCoverCard.tsx", code);
console.log("Successfully refined seal in BaseCoverCard.tsx!");
