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
            return resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        return ""

html = fetch("/vi")
js_links = re.findall(r'src=["\']([^"\']+\.js[^"\']*)["\']', html)

all_icons = set()
for js in js_links:
    content = fetch(js)
    icons = re.findall(r'["\'](/icons/[^"\']+)["\']', content)
    for ic in icons:
        all_icons.add(ic)

print(f"Total icon paths referenced in JS: {len(all_icons)}")
for ic in sorted(all_icons):
    print(" ", ic)
