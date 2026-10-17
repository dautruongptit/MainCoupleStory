import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

req = urllib.request.Request(
    "https://chungdoi.com/_next/static/css/af1631493186e596.css",
    headers={"User-Agent": "Mozilla/5.0"}
)
with urllib.request.urlopen(req) as resp:
    css = resp.read().decode("utf-8")

urls = set(re.findall(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', css))
google_fonts = sorted([u for u in urls if "/fonts/google/" in u])

print(f"Total google font urls in CSS: {len(google_fonts)}")
# Sample 10 to check size
total_sample_size = 0
for u in google_fonts[:10]:
    r = urllib.request.Request("https://chungdoi.com" + u, headers={"User-Agent": "Mozilla/5.0"}, method="HEAD")
    with urllib.request.urlopen(r) as resp:
        sz = int(resp.headers.get("Content-Length", 0))
        total_sample_size += sz
        print(f"  {u} -> {sz} bytes")

avg_sz = total_sample_size / 10
est_total = avg_sz * len(google_fonts)
print(f"Average size per woff2 chunk: {avg_sz:.1f} bytes. Estimated total for 477 files: {est_total / (1024*1024):.2f} MB")
