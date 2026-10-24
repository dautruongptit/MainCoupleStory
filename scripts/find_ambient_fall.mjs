import { ChromeController } from './cdp_helper.mjs';

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    acceptLanguage: "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    platform: "Win32"
  });

  console.log("Navigating to real minimalism-nau/demo...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo", 4000);

  // Monitor everything when clicking the link
  await c.eval(`(() => {
    window.__events = [];
    const link = document.querySelector('a[href*="open=1"]');
    const env = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
    
    // Listen for animation start/end, transition start/end
    ['animationstart', 'animationend', 'transitionstart', 'transitionend'].forEach(type => {
      window.addEventListener(type, (e) => {
        window.__events.push({
          type,
          tag: e.target.tagName,
          class: e.target.className,
          animationName: e.animationName,
          propertyName: e.propertyName,
          time: performance.now()
        });
      }, true);
    });

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        window.__events.push({
          mutationType: m.type,
          tag: m.target.tagName,
          class: m.target.className,
          style: m.target.getAttribute ? m.target.getAttribute('style') : null,
          time: performance.now()
        });
      }
    });
    if (env) observer.observe(env, { attributes: true, subtree: true, childList: true });
    observer.observe(document.body, { attributes: true, subtree: true, childList: true });

    console.log('Clicking link...');
    link.click();
  })()`);

  // Wait 1.5s
  await new Promise(r => setTimeout(r, 1500));

  const events = await c.eval(`window.__events`);
  console.log('Total events captured:', events?.length);
  console.log('Sample events:', JSON.stringify(events?.slice(0, 15), null, 2));

  const url = await c.eval(`window.location.href`);
  console.log('URL after click:', url);

  await c.close();
}

run().catch(console.error);
