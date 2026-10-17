import { readFileSync, writeFileSync } from "node:fs";

// Read all 75 templates from src/features/templates/data/templates.ts
const tplContent = readFileSync("src/features/templates/data/templates.ts", "utf-8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];

console.log(`Found ${tplMatches.length} templates in templates.ts.`);

const templates = tplMatches.map(m => ({
  slug: m[1],
  id: m[2],
  name: m[3]
}));

async function fetchRemoteDemo(tpl) {
  const url = `https://chungdoi.com/vi/mau-thiep/${tpl.slug}/demo`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) {
      return { ...tpl, url, status: res.status, error: `HTTP ${res.status}` };
    }
    const html = await res.text();

    // Extract title
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : "";

    // Extract h1
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").trim() : "";

    // Extract all theme images used
    const themeImages = new Set();
    const themeImgRegex = /\/images\/themes\/([a-zA-Z0-9_\-\/.]+\.(?:webp|png|jpg|jpeg|svg))/g;
    let im;
    while ((im = themeImgRegex.exec(html)) !== null) {
      themeImages.add(im[0]);
    }

    // Extract couple / groom / bride names from Next.js payload or HTML
    // Search for patterns like groomName or brideName or Vietnamese couple names
    const coupleMatches = [...html.matchAll(/"groom(?:Name|Full|Nick)?":\s*"([^"]+)"/g)];
    const brideMatches = [...html.matchAll(/"bride(?:Name|Full|Nick)?":\s*"([^"]+)"/g)];
    const dateMatches = [...html.matchAll(/"date":\s*"([^"]+)"/g)];

    return {
      ...tpl,
      url,
      status: 200,
      title,
      h1,
      themeImages: Array.from(themeImages),
      groom: coupleMatches[0]?.[1] || "",
      bride: brideMatches[0]?.[1] || "",
      date: dateMatches[0]?.[1] || "",
      htmlLength: html.length
    };
  } catch (err) {
    return { ...tpl, url, status: 0, error: err.message };
  }
}

async function run() {
  console.log("Scraping remote demo data for all 75 templates...");
  const results = [];
  const concurrency = 6;
  
  for (let i = 0; i < templates.length; i += concurrency) {
    const batch = templates.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fetchRemoteDemo));
    results.push(...batchResults);
    process.stdout.write(`Processed ${results.length}/${templates.length}\r`);
  }
  console.log(`\nFinished scraping ${results.length} templates.`);

  writeFileSync("scripts/remote_75_audit_data.json", JSON.stringify(results, null, 2), "utf-8");
  console.log("Saved to scripts/remote_75_audit_data.json");

  // Summary
  const okCount = results.filter(r => r.status === 200).length;
  console.log(`Remote 200 OK: ${okCount}/${templates.length}`);
  const notOk = results.filter(r => r.status !== 200);
  if (notOk.length > 0) {
    console.log("Non-200 templates:", notOk);
  }
}

run().catch(console.error);
