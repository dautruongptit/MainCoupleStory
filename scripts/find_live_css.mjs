import fs from "fs";

const html = fs.readFileSync("docs/hoa-moc-xanh-live.html", "utf8");
const matches = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(m => m[1]);
console.log("CSS files:", matches);

for (const href of matches) {
  const url = href.startsWith("http") ? href : "https://chungdoi.com" + href;
  console.log("Fetching:", url);
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log("Length:", text.length);
    const pings = text.match(/@keyframes [^{]*ping[^{]*\{[^}]*\}/gi);
    console.log("Ping keyframes:", pings);
    const pingClasses = text.match(/\.[\w-]*ping[\w-]*\s*\{[^}]*\}/gi);
    console.log("Ping classes:", pingClasses);
  } catch (e) {
    console.error(e.message);
  }
}
