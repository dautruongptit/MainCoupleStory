import os
import sys
import re
import urllib.request
import concurrent.futures
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

BASE_URL = "https://chungdoi.com"
PROJECT_ROOT = Path("d:/MY PRO/applications/MainCoupleStory/web")
PUBLIC_DIR = PROJECT_ROOT / "public"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

PAYMENT_ICONS = [
    "bank-generic.svg",
    "cashapp.svg",
    "line-pay.svg",
    "note.svg",
    "paypal.svg",
    "registry.svg",
    "revolut.svg",
    "sepa.svg",
    "upload-qr.svg",
    "venmo.svg",
    "vietqr.svg",
    "wise.svg",
    "zelle.svg",
]

def download_file(rel_path, target_paths):
    url = f"{BASE_URL}/{rel_path.lstrip('/')}"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            if not data:
                return (rel_path, False, "Empty response", 0)
            for tp in target_paths:
                tp.parent.mkdir(parents=True, exist_ok=True)
                with open(tp, "wb") as f:
                    f.write(data)
            return (rel_path, True, "OK", len(data))
    except Exception as e:
        return (rel_path, False, str(e), 0)

# Step 1: Download payment icons
print("=== DOWNLOADING PAYMENT ICONS ===")
payments_dir = PUBLIC_DIR / "icons" / "payments"
paymats_dir = PUBLIC_DIR / "icons" / "paymats"
payments_dir.mkdir(parents=True, exist_ok=True)
paymats_dir.mkdir(parents=True, exist_ok=True)

icon_results = []
for icon_name in PAYMENT_ICONS:
    rel = f"icons/payments/{icon_name}"
    targets = [payments_dir / icon_name, paymats_dir / icon_name]
    res = download_file(rel, targets)
    icon_results.append(res)
    print(f"  [{'OK' if res[1] else 'ERR'}] {icon_name}: {res[3]} bytes")

# Step 2: Extract all font URLs from remote CSS
print("\n=== EXTRACTING FONT URLS FROM REMOTE CSS ===")
css_req = urllib.request.Request(
    f"{BASE_URL}/_next/static/css/af1631493186e596.css",
    headers=HEADERS
)
with urllib.request.urlopen(css_req) as resp:
    css_content = resp.read().decode("utf-8")

all_urls = set(re.findall(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', css_content))
font_urls = sorted([u for u in all_urls if u.startswith("/fonts/")])
print(f"Total font files found in CSS: {len(font_urls)}")

# Step 3: Concurrently download all font files
print("\n=== DOWNLOADING ALL FONTS (CONCURRENT) ===")
fonts_base = PUBLIC_DIR / "fonts"

font_results = []
with concurrent.futures.ThreadPoolExecutor(max_workers=24) as executor:
    future_to_url = {}
    for fu in font_urls:
        rel = fu.lstrip("/")
        target = PUBLIC_DIR / rel
        future = executor.submit(download_file, rel, [target])
        future_to_url[future] = fu

    done_count = 0
    total_count = len(font_urls)
    total_bytes = 0
    errors = []
    for future in concurrent.futures.as_completed(future_to_url):
        fu = future_to_url[future]
        res = future.result()
        font_results.append(res)
        done_count += 1
        if res[1]:
            total_bytes += res[3]
        else:
            errors.append((fu, res[2]))
        if done_count % 50 == 0 or done_count == total_count:
            print(f"  Progress: {done_count}/{total_count} ({done_count*100//total_count}%) - {total_bytes / (1024*1024):.2f} MB downloaded")

print(f"\nFont download complete: {len([r for r in font_results if r[1]])}/{len(font_urls)} succeeded.")
if errors:
    print(f"Errors ({len(errors)}):")
    for fu, err in errors[:10]:
        print(f"  {fu}: {err}")

# Step 4: Summary of files on disk
print("\n=== VERIFYING DOWNLOADED FILES ON DISK ===")
local_icons_payments = list(payments_dir.glob("*.svg"))
local_icons_paymats = list(paymats_dir.glob("*.svg"))
local_fonts_root = [f for f in fonts_base.glob("*.*") if f.is_file()]
local_fonts_google = list((fonts_base / "google").glob("*.*"))

print(f"icons/payments/: {len(local_icons_payments)} SVG files")
print(f"icons/paymats/:  {len(local_icons_paymats)} SVG files")
print(f"fonts/ (root):   {len(local_fonts_root)} font files")
print(f"fonts/google/:   {len(local_fonts_google)} woff2 files")
print(f"Total fonts:     {len(local_fonts_root) + len(local_fonts_google)} font files")
