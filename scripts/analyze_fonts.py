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
        print(f"Error {path}: {e}")
        return None

# Check CSS files
html = fetch("/vi").decode("utf-8", errors="ignore")
css_links = re.findall(r'href=["\']([^"\']+\.css[^"\']*)["\']', html)

for css in css_links:
    content = fetch(css)
    if content:
        text = content.decode("utf-8", errors="ignore")
        # Find all @font-face rules
        font_faces = re.findall(r'@font-face\s*\{([^}]+)\}', text)
        print(f"CSS {css} has {len(font_faces)} font-faces.")
        for ff in font_faces:
            family = re.findall(r'font-family\s*:\s*([^;]+)', ff)
            src = re.findall(r'src\s*:\s*([^;]+)', ff)
            weight = re.findall(r'font-weight\s*:\s*([^;]+)', ff)
            style = re.findall(r'font-style\s*:\s*([^;]+)', ff)
            print(f"  Family: {family}, Weight: {weight}, Style: {style}")
            print(f"    src: {src}")

# Also search all JS files for any font files or font-family names
js_links = re.findall(r'src=["\']([^"\']+\.js[^"\']*)["\']', html)
for js in js_links:
    content = fetch(js)
    if content:
        text = content.decode("utf-8", errors="ignore")
        # Look for font names or paths
        matches = re.findall(r'["\'](/fonts/[^"\']+)["\']', text)
        if matches:
            print(f"JS {js} fonts:", matches)
        # Look for font configurations (e.g. next/font or custom fonts)
        font_config = re.findall(r'(?:fontFamily|font_family|fontFamilies|fonts)\s*[:=]\s*(\[[^\]]+\]|\{[^\}]+\})', text)
        if font_config:
            for fc in font_config:
                if any(w in fc for w in ['Pattaya', 'Alex', 'Playfair', 'Dancing', 'Great', 'Ephesis', 'Montserrat']):
                    print("Font config match:", fc[:200])
