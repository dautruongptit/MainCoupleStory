import { ChromeController } from "./cdp_helper.mjs";

async function testOpen() {
  const c = new ChromeController();
  await c.start();
  await c.newPage("about:blank");

  for (const slug of ["minimalism-do-dam", "song-hy-do", "boho-floral-green"]) {
    console.log(`\nTesting demo open for: ${slug}`);
    await c.navigate(`http://localhost:5173/vi/mau-thiep/${slug}/demo`, 1200);

    // Click envelope open
    const openRes = await c.eval(`
      (() => {
        const btn = document.querySelector('.env-open-btn') || 
                    document.querySelector('.wax-seal-btn') || 
                    document.querySelector('.wax-seal') || 
                    Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Mở thiệp')) ||
                    document.querySelector('.envelope-seal');
        if (btn) {
          btn.click();
          return { clicked: true, tag: btn.tagName, className: btn.className };
        }
        return { clicked: false };
      })()
    `);
    console.log("  Open button click:", openRes);
    await c.wait(800);

    const opened = await c.eval(`
      (() => {
        const header = document.querySelector('.header-wrap, .tpl-hdr, .header, header, .songphung-template');
        const h1 = document.querySelector('h1')?.textContent?.trim() || '';
        const themeImgs = Array.from(document.querySelectorAll('img'))
          .map(i => i.src)
          .filter(s => s.includes('/images/themes/'));
        return {
          hasHeader: !!header,
          h1,
          themeImgsCount: themeImgs.length,
          sampleImgs: themeImgs.slice(0, 3)
        };
      })()
    `);
    console.log("  Opened state:", opened);
  }

  await c.close();
}

testOpen().catch(console.error);
