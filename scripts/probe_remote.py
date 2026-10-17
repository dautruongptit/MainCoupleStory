import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

base_url = "https://chungdoi.com"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def fetch(path):
    url = base_url + path if path.startswith("/") else path
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.read()
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return None

html = fetch("/vi").decode("utf-8", errors="ignore")
css_links = re.findall(r'href=["\']([^"\']+\.css[^"\']*)["\']', html)
js_links = re.findall(r'src=["\']([^"\']+\.js[^"\']*)["\']', html)

# Let's search all fonts and paymats across html, css, js
font_files = set()
paymat_files = set()

# Check fonts in css
for css in css_links:
    content = fetch(css)
    if content:
        text = content.decode("utf-8", errors="ignore")
        for u in re.findall(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', text):
            if "font" in u.lower() or u.endswith((".woff", ".woff2", ".ttf", ".otf", ".eot")):
                font_files.add(u)
            if "paymat" in u.lower() or "payment" in u.lower():
                paymat_files.add(u)

# Let's also search JS bundles
for js in js_links:
    content = fetch(js)
    if content:
        text = content.decode("utf-8", errors="ignore")
        # Look for fonts
        for m in re.findall(r'["\'](/[^"\']*\.(?:woff2?|ttf|otf|eot))["\']', text, re.I):
            font_files.add(m)
        for m in re.findall(r'["\'](/fonts/[^"\']+)["\']', text, re.I):
            font_files.add(m)
        # Look for paymats / payments
        for m in re.findall(r'["\'](/icons/paymats?/[^"\']+)["\']', text, re.I):
            paymat_files.add(m)
        for m in re.findall(r'["\']([^"\']*(?:paymat)[^"\']*)["\']', text, re.I):
            paymat_files.add(m)

print(f"Found {len(font_files)} font references:")
for f in sorted(font_files):
    print("  FONT:", f)

print(f"\nFound {len(paymat_files)} paymat references:")
for p in sorted(paymat_files):
    print("  PAYMAT:", p)
