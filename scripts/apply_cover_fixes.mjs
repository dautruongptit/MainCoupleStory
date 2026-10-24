import fs from 'fs';

// 1. Patch coverConfigs.ts
let configs = fs.readFileSync('src/features/invitation/components/covers/coverConfigs.ts', 'utf8');

const oldImgsBlock = `imgs: [
      {
        src: "/images/themes/minimalism-brown/flower2-decoration.webp",
        className: "absolute pointer-events-none w-[117px] h-[157px] md:w-[260px] md:h-[348px] top-[-8px] md:top-[8px] left-[-50px] md:left-[-140px] opacity-80 rotate-[25deg] z-20",
      },
      {
        src: "/images/themes/minimalism-brown/flower2-decoration.webp",
        className: "absolute pointer-events-none w-[117px] h-[157px] md:w-[260px] md:h-[348px] bottom-[-20px] md:top-[10px] right-[-50px] md:right-[-140px] -scale-x-100 opacity-80 -rotate-[25deg] md:rotate-[25deg] z-20",
      },
    ],`;

const newImgsBlock = `imgs: [
      {
        src: "/images/themes/minimalism-brown/flower2-decoration.webp",
        className: "absolute pointer-events-none h-36 md:h-80 lg:h-80 w-auto max-w-none top-[-3%] md:top-[-7%] left-[-20px] md:left-[-40px] -translate-x-[6%] md:-translate-x-[11%] opacity-70 rotate-[25deg]",
      },
      {
        src: "/images/themes/minimalism-brown/flower2-decoration.webp",
        className: "absolute pointer-events-none h-36 md:h-80 lg:h-80 w-auto max-w-none bottom-[-3%] md:bottom-[30%] right-[-20px] md:right-[-40px] translate-x-[6%] md:translate-x-[11%] -scale-x-100 opacity-70 -rotate-[25deg]",
      },
    ],`;

if (configs.includes(oldImgsBlock)) {
  configs = configs.replace(oldImgsBlock, newImgsBlock);
  fs.writeFileSync('src/features/invitation/components/covers/coverConfigs.ts', configs, 'utf8');
  console.log('SUCCESS: Patched coverConfigs.ts');
} else {
  console.log('NOTE: oldImgsBlock not exact in coverConfigs.ts');
}

// 2. Patch BaseCoverCard.tsx
let baseCover = fs.readFileSync('src/features/invitation/components/covers/BaseCoverCard.tsx', 'utf8');

// Replace card inner block so imgs are back inside absolute inset-0 rounded-lg overflow-hidden
const oldCardInner = `{/* Card Inner Background */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: config.cardBg || "rgba(255, 255, 255, 0.97)",
              border: \`1px solid \${config.cardBorder || \`rgba(\${config.rgb}, 0.15)\`}\`,
              clipPath: "inset(0 round 8px)",
            }}
          />

          {/* Corner Ornaments (floating over card edges) */}
          {config.imgs.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt=""
              aria-hidden="true"
              className={img.className}
              style={img.style}
            />
          ))}`;

const newCardInner = `{/* Card Inner Background with Corner Ornaments */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: config.cardBg || "rgba(255, 255, 255, 0.97)",
              border: \`1px solid \${config.cardBorder || \`rgba(\${config.rgb}, 0.15)\`}\`,
              clipPath: "inset(0 round 8px)",
            }}
          >
            {config.imgs.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt=""
                aria-hidden="true"
                className={img.className}
                style={img.style}
              />
            ))}
          </div>`;

if (baseCover.replace(/\r\n/g, '\n').includes(oldCardInner.replace(/\r\n/g, '\n'))) {
  baseCover = baseCover.replace(/\r\n/g, '\n').replace(oldCardInner.replace(/\r\n/g, '\n'), newCardInner.replace(/\r\n/g, '\n'));
}

// Typography adjustments in BaseCoverCard
const oldContentBlock = `<h1
              className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl font-normal"
              style={{ color: textColor, fontFamily: config.nameFont, fontWeight: 400 }}
            >
              <span className="block w-full text-center font-normal">{gName}</span>
              <span
                style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}
                className="block w-full text-center text-lg leading-none sm:text-xl"
              >
                &amp;
              </span>
              <span className="block w-full text-center font-normal">{bName}</span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: \`linear-gradient(to right, transparent, \${textColor})\` }}
              />
              <span className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: \`linear-gradient(to left, transparent, \${textColor})\` }}
              />
            </div>

            {/* Date */}
            <div
              className="text-[18px] mb-5 flex flex-col items-center"
              style={{ color: textColor, opacity: 0.85, fontFamily: '"Lora", "Times New Roman", serif' }}
            >
              <span>{dateText}</span>
            </div>

            {/* Guest Block */}
            <div className="mb-7 md:mb-8 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto">
              <p
                className="text-[18px] font-light mb-1"
                style={{ color: textColor, opacity: 0.85, fontFamily: '"Lora", "Times New Roman", serif' }}
              >
                {d.envelopeGuest || "Thân Mời"}
              </p>
              {d.envelopeInviteMessage && (
                <p
                  className="text-[15px] italic mt-1"
                  style={{ color: textColor, opacity: 0.75, fontFamily: '"Lora", "Times New Roman", serif' }}
                >
                  {d.envelopeInviteMessage}
                </p>
              )}
            </div>

            {/* Open Envelope Button */}
            <button
              type="button"
              onClick={triggerOpen}
              disabled={isOpening}
              aria-busy={isOpening ? "true" : undefined}
              style={{
                backgroundColor: config.btnBg,
                color: config.btnTextColor,
                boxShadow: \`0 4px 14px rgba(\${config.rgb}, 0.35)\`,
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
              className="relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg border-none cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden transition-all hover:scale-105 active:scale-95"
            >`;

const newContentBlock = `<h1
              className="mb-2 flex flex-col items-center text-[30px] leading-[37.5px] md:text-[36px] md:leading-[45px] font-normal"
              style={{ color: textColor, fontFamily: config.nameFont, fontWeight: 400 }}
            >
              <span className="block w-full text-center font-normal">{gName}</span>
              <span
                style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}
                className="block w-full text-center text-[18px] leading-[18px] md:text-[20px] md:leading-[20px]"
              >
                &amp;
              </span>
              <span className="block w-full text-center font-normal">{bName}</span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: \`linear-gradient(to right, transparent, \${textColor})\` }}
              />
              <span className="text-[14px] leading-[20px]" style={{ color: textColor, opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: \`linear-gradient(to left, transparent, \${textColor})\` }}
              />
            </div>

            {/* Date */}
            <div
              className="text-[18px] leading-[27px] mb-5 flex flex-col items-center"
              style={{ color: textColor, opacity: 0.85, fontFamily: '"Lora", "Times New Roman", serif' }}
            >
              <span className="inline-block">{dateText}</span>
            </div>

            {/* Guest Block */}
            <div className="mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto flex flex-col items-center">
              <p
                className="text-[18px] leading-[27px] font-light mb-2 inline-block"
                style={{ color: textColor, opacity: 0.85, fontFamily: '"Lora", "Times New Roman", serif' }}
              >
                <span className="inline-block">{d.envelopeGuest || "Thân Mời"}</span>
              </p>
              {d.envelopeInviteMessage && (
                <p
                  className="text-[15px] italic mt-1 inline-block"
                  style={{ color: textColor, opacity: 0.75, fontFamily: '"Lora", "Times New Roman", serif' }}
                >
                  {d.envelopeInviteMessage}
                </p>
              )}
            </div>

            {/* Open Envelope Button */}
            <button
              type="button"
              onClick={triggerOpen}
              disabled={isOpening}
              aria-busy={isOpening ? "true" : undefined}
              style={{
                backgroundColor: config.btnBg,
                color: config.btnTextColor,
                boxShadow: \`0 4px 14px rgba(\${config.rgb}, 0.35)\`,
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
              className="relative px-8 py-2.5 text-[18px] leading-[28px] font-semibold sm:font-medium rounded-full shadow-lg border-none cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden transition-all hover:scale-105 active:scale-95"
            >`;

if (baseCover.replace(/\r\n/g, '\n').includes(oldContentBlock.replace(/\r\n/g, '\n'))) {
  baseCover = baseCover.replace(/\r\n/g, '\n').replace(oldContentBlock.replace(/\r\n/g, '\n'), newContentBlock.replace(/\r\n/g, '\n'));
  fs.writeFileSync('src/features/invitation/components/covers/BaseCoverCard.tsx', baseCover, 'utf8');
  console.log('SUCCESS: Patched BaseCoverCard.tsx typography and structure');
} else {
  console.log('NOTE: oldContentBlock not found in BaseCoverCard.tsx');
}
