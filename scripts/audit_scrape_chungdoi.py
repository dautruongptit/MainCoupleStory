import json
import re
import urllib.request
from pathlib import Path

url = "https://chungdoi.com/vi/mau-thiep"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode("utf-8")
except Exception as e:
    print(f"Error fetching {url}: {e}")
    html = ""

print(f"HTML size: {len(html)}")

# Check for Next.js data or inline template cards
m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.DOTALL)
if m:
    data = json.loads(m.group(1))
    print("Found __NEXT_DATA__ keys:", list(data.keys()))
    page_props = data.get("props", {}).get("pageProps", {})
    print("pageProps keys:", list(page_props.keys()))
    with open("scripts/chungdoi_data.json", "w", encoding="utf-8") as f:
        json.dump(page_props, f, ensure_ascii=False, indent=2)
    print("Wrote pageProps to scripts/chungdoi_data.json")
else:
    print("No __NEXT_DATA__ script found")
    # Search for all /vi/mau-thiep/<slug>
    links = set(re.findall(r'/vi/mau-thiep/([a-zA-Z0-9_-]+)', html))
    print(f"Extracted {len(links)} slugs: {sorted(list(links))[:15]}")
