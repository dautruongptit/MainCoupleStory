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

for js in js_links:
    content = fetch(js)
    if "/icons/payments/" in content:
        print(f"Found in {js}:")
        # Print lines or snippets around /icons/payments/
        for m in re.finditer(r'.{0,150}/icons/payments/[^"\'\s]+.{0,150}', content):
            print("  -->", m.group(0))
