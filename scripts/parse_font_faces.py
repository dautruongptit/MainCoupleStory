import urllib.request
import re
import sys
import json

sys.stdout.reconfigure(encoding="utf-8")

req = urllib.request.Request(
    "https://chungdoi.com/_next/static/css/af1631493186e596.css",
    headers={"User-Agent": "Mozilla/5.0"}
)
with urllib.request.urlopen(req) as resp:
    css = resp.read().decode("utf-8")

# Extract every @font-face
font_faces = []
blocks = re.findall(r'@font-face\s*\{([^}]+)\}', css)

for b in blocks:
    family_m = re.search(r'font-family\s*:\s*([^;]+)', b)
    src_m = re.search(r'src\s*:\s*([^;]+)', b)
    weight_m = re.search(r'font-weight\s*:\s*([^;]+)', b)
    style_m = re.search(r'font-style\s*:\s*([^;]+)', b)
    unicode_m = re.search(r'unicode-range\s*:\s*([^;]+)', b)
    display_m = re.search(r'font-display\s*:\s*([^;]+)', b)
    
    if family_m and src_m:
        family = family_m.group(1).strip().strip('"\'')
        src = src_m.group(1).strip()
        weight = weight_m.group(1).strip() if weight_m else "normal"
        style = style_m.group(1).strip() if style_m else "normal"
        urls = re.findall(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', src)
        font_faces.append({
            "family": family,
            "weight": weight,
            "style": style,
            "display": display_m.group(1).strip() if display_m else None,
            "unicode_range": unicode_m.group(1).strip() if unicode_m else None,
            "urls": urls,
            "raw_src": src
        })

print(f"Total @font-face rules in CSS: {len(font_faces)}")

# Separate primary / non-google vs google font files
non_google = []
google_subset = []

for ff in font_faces:
    for u in ff["urls"]:
        if not "/fonts/google/" in u:
            non_google.append((ff["family"], ff["weight"], ff["style"], u))
        else:
            google_subset.append((ff["family"], ff["weight"], ff["style"], u))

print(f"Non-Google font rules: {len(non_google)}")
distinct_non_google_files = sorted(list(set(x[3] for x in non_google)))
print(f"Distinct Non-Google font files: {len(distinct_non_google_files)}")
for f in distinct_non_google_files:
    print(" ", f)

print(f"\nGoogle font rules: {len(google_subset)}")
distinct_google_files = sorted(list(set(x[3] for x in google_subset)))
print(f"Distinct Google font sub-chunk files: {len(distinct_google_files)}")
