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

families = set(re.findall(r'font-family\s*:\s*([^;]+)', css))
print("Distinct Font Families in CSS:")
for f in sorted(families):
    print(" -", f)

urls = set(re.findall(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', css))
direct_fonts = [u for u in urls if not "/fonts/google/" in u]
print("\nNon-google font urls in CSS:", direct_fonts)

# Also check google font families
google_fonts = [u for u in urls if "/fonts/google/" in u]
print(f"Total google font sub-files in CSS: {len(google_fonts)}")
