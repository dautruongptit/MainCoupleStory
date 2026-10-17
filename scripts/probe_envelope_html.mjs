import { ChromeController } from "./cdp_helper.mjs";

const c = new ChromeController();
await c.start();
await c.newPage();

const testSlugs = [
  "minimalism-do-dam",
  "to-duyen-xanh",
  "mai-lan-trang",
  "bach-su-do",
  "song-long-do",
  "chibi-red",
  "co-ba-do",
  "florence-nau"
];

for (const slug of testSlugs) {
  console.log(`\n=================== SLUG: ${slug} ===================`);
  await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo`, 3500);
  const info = await c.eval(`
    (() => {
      const el = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      if (!el) return { error: 'Not found' };
      
      // Get outer container classes and styles
      const outerClass = el.className;
      const outerStyle = el.getAttribute('style') || '';
      
      // Card element
      const card = el.querySelector('.relative.rounded-2xl, .relative.rounded-lg, [class*="rounded-"], .envelope-card') || el.children[1] || el.children[0];
      const cardClass = card ? card.className : '';
      const cardStyle = card ? card.getAttribute('style') : '';
      
      // Floating particles
      const particles = Array.from(el.querySelectorAll('.pointer-events-none div, [class*="petal"], [class*="xi"]')).map(p => ({
        text: p.innerText,
        style: p.getAttribute('style'),
        cls: p.className
      })).slice(0, 3);
      
      // Seal / heart button
      const seal = el.querySelector('[class*="seal"], [class*="rounded-full"], svg')?.parentElement;
      
      // Inner HTML clean
      return {
        outerClass,
        outerStyle,
        cardClass,
        cardStyle,
        particleSample: particles,
        html: el.innerHTML.slice(0, 1500)
      };
    })()
  `);
  console.log('Result:', JSON.stringify(info, null, 2));
}

await c.close();
