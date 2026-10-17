import json
import urllib.request
from pathlib import Path
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("scripts/remote_75_audit_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

missing = []
for item in data:
    for img_path in item["themeImages"]:
        clean_path = img_path.lstrip("/")
        local_file = Path("public") / clean_path
        if not local_file.exists():
            missing.append(img_path)

# Deduplicate
missing = sorted(list(set(missing)))
print(f"Total unique missing theme images to download: {len(missing)}")

downloaded = 0
failed = []

for img_path in missing:
    url = f"https://chungdoi.com{img_path}"
    local_file = Path("public") / img_path.lstrip("/")
    local_file.parent.mkdir(parents=True, exist_ok=True)
    
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read()
            with open(local_file, "wb") as out:
                out.write(content)
            downloaded += 1
            print(f"[{downloaded}/{len(missing)}] Downloaded: {img_path} ({len(content)} bytes)")
    except Exception as e:
        print(f"FAILED to download {url}: {e}")
        failed.append((img_path, str(e)))

print(f"\nDone: {downloaded} downloaded, {len(failed)} failed.")
if failed:
    print("Failures:", failed)
