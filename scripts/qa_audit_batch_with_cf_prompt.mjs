import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

// 1. Read all templates
const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

// Config for batch run
const BATCH_SIZE = 10;
const DELAY_MS = 3500; // 3.5s per template
const PROFILE_DIR = path.join(process.cwd(), ".chrome_profile");
const REF_DIR = path.join("docs", "qa-review", "reference");
fs.mkdirSync(REF_DIR, { recursive: true });

async function checkCloudflare(c) {
  return await c.eval(`
    Boolean(
      document.title.includes("Just a moment") ||
      document.title.includes("security verification") ||
      document.querySelector("#challenge-running, #cf-chl-widget, [class*='cf-'], #challenge-error-text")
    )
  `);
}

async function runBatch(startIndex = 0) {
  const c = new ChromeController();
  // Open with headless: false and single persistent profile so user can interactively verify if needed
  await c.start({ headless: false, userDataDir: PROFILE_DIR });
  await c.newPage("about:blank");

  const batch = TEMPLATES.slice(startIndex, startIndex + BATCH_SIZE);
  console.log(`\nStarting batch ${Math.floor(startIndex / BATCH_SIZE) + 1} (${batch.length} templates, index ${startIndex} to ${startIndex + batch.length - 1})...`);

  for (let i = 0; i < batch.length; i++) {
    const t = batch[i];
    const globalIdx = startIndex + i + 1;
    console.log(`\n[${globalIdx}/75] Checking: ${t.name} (${t.slug})...`);

    const realUrl = `https://chungdoi.com/vi/mau-thiep/${t.slug}/demo`;
    await c.setViewport({ width: 390, height: 844, mobile: true });
    await c.navigate(realUrl, 2500);

    const isCF = await checkCloudflare(c);
    if (isCF) {
      console.log(`\n******************************************************`);
      console.log(`Cần xác minh Cloudflare tại mẫu [${t.slug}]`);
      console.log(`URL: ${realUrl}`);
      console.log(`Vui lòng tự bấm xác minh trong cửa sổ Chrome vừa mở.`);
      console.log(`Sau khi xác minh xong, gõ "tiếp tục" trong chat.`);
      console.log(`******************************************************\n`);
      process.exit(2); // Exit with code 2 to indicate CF verification needed
    }

    console.log(`  -> Accessible! Proceeding...`);
    await new Promise(r => setTimeout(r, DELAY_MS));
  }

  await c.close();
  console.log(`\nBatch completed successfully.`);
}

const startArg = parseInt(process.argv[2] || "0", 10);
runBatch(startArg).catch(e => {
  console.error(e);
  process.exit(1);
});
