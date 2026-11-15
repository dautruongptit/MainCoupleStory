import fs from "fs";

async function run() {
  const res = await fetch("https://chungdoi.com/vi/mau-thiep/hoa-moc-xanh/demo", {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  const html = await res.text();
  fs.writeFileSync("docs/hoa-moc-xanh-live.html", html);
  console.log("Saved live html, size:", html.length);

  const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
  if (nextDataMatch) {
    console.log("Found __NEXT_DATA__");
    fs.writeFileSync("docs/hoa-moc-xanh-next-data.json", nextDataMatch[1]);
  } else {
    console.log("No __NEXT_DATA__");
    // Look for self.__next_f or other Next.js App Router chunks
    const chunks = [...html.matchAll(/self\.__next_f\.push\(\[1,"(.*?)"\]\)/gs)];
    console.log("App router chunks found:", chunks.length);
    if (chunks.length > 0) {
      let combined = "";
      for (const m of chunks) {
        try {
          const unescaped = JSON.parse(`"${m[1]}"`);
          combined += unescaped + "\n---CHUNK---\n";
        } catch (e) {
          combined += m[1] + "\n---CHUNK---\n";
        }
      }
      fs.writeFileSync("docs/hoa-moc-xanh-app-router.txt", combined);
      console.log("Saved app router chunks");
    }
  }
}

run().catch(console.error);
