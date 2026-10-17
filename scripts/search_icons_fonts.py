import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

base_url = "https://chungdoi.com"
headers = {"User-Agent": "Mozilla/5.0"}

def fetch(path):
    url = base_url + path if path.startswith("/") else path
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.read()
    except Exception as e:
        return None

html = fetch("/vi").decode("utf-8", errors="ignore")
js_links = re.findall(r'src=["\']([^"\']+\.js[^"\']*)["\']', html)

# Let's search all svgs and icons
icons = set()
pay_terms = set()
fonts = set()

for js in js_links:
    content = fetch(js)
    if content:
        text = content.decode("utf-8", errors="ignore")
        # search for /icons/...
        for m in re.findall(r'["\'](/icons/[^"\']+)["\']', text):
            icons.add(m)
        for m in re.findall(r'["\'](/fonts/[^"\']+)["\']', text):
            fonts.add(m)
        for m in re.findall(r'["\']([^"\']*(?:paymat|payment|bank|vietqr|momo|vnpay|zalopay)[^"\']*)["\']', text, re.I):
            if any(ext in m.lower() for ext in ['.svg', '.png', '.webp', '.jpg']):
                pay_terms.add(m)

print("Icons found in JS:")
for ic in sorted(icons):
    print(" ", ic)

print("\nFonts found in JS:")
for f in sorted(fonts):
    if not "/google/" in f:
        print(" ", f)

print("\nPay terms images found in JS:")
for p in sorted(pay_terms):
    print(" ", p)
