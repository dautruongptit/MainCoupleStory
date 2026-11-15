import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

with open("scripts/remote_75_audit_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total remote templates scraped: {len(data)}")

# Check theme images usage and whether all themeImages exist in our local public folder
missing_images = []
all_remote_theme_folders = set()

for item in data:
    for img_path in item["themeImages"]:
        # e.g. /images/themes/song-hy-red/chu-hy.webp
        clean_path = img_path.lstrip("/")
        parts = clean_path.split("/")
        if len(parts) >= 3 and parts[0] == "images" and parts[1] == "themes":
            all_remote_theme_folders.add(parts[2])
        local_file = Path("public") / clean_path
        if not local_file.exists():
            missing_images.append((item["id"], item["slug"], img_path))

print(f"Total unique theme folders referenced remotely: {len(all_remote_theme_folders)}")
print(f"Missing images in local public/: {len(missing_images)}")
if missing_images:
    for mid, mslug, mimg in missing_images[:10]:
        print(f"  Missing: [{mid}] {mimg}")
else:
    print("  ALL REMOTE THEME IMAGES EXIST LOCALLY IN public/! (0 MISSING)")

# Check H1 / couple names distribution
h1_samples = [(x["id"], x["slug"], x["h1"]) for x in data]
print(f"\nSample Couple Names (H1) from remote:")
for sid, sslug, sh1 in h1_samples[:15]:
    print(f"  - {sid} ({sslug}): {sh1}")
