import re
import json
from pathlib import Path

with open("scripts/chungdoi_mau_thiep.html", "r", encoding="utf-8") as f:
    html = f.read()

# Pattern for template cards
# Let's inspect snippet of html where /vi/mau-thiep/ appears
matches = list(re.finditer(r'/vi/mau-thiep/([a-zA-Z0-9_-]+)', html))
print(f"Total occurrences of /vi/mau-thiep/: {len(matches)}")

slugs_seen = {}
for m in matches:
    slug = m.group(1)
    if slug in ["bo-suu-tap", "page-d0e03b7c33a52ce8"]:
        continue
    # grab some context around it
    start = max(0, m.start() - 200)
    end = min(len(html), m.end() + 300)
    ctx = html[start:end]
    if slug not in slugs_seen:
        slugs_seen[slug] = ctx

print(f"Unique valid slugs on chungdoi.com: {len(slugs_seen)}")

# Compare with our local templates.ts
with open("src/features/templates/data/templates.ts", "r", encoding="utf-8") as f:
    tpl_text = f.read()

local_slugs = re.findall(r'"slug":\s*"([^"]+)"', tpl_text)
local_ids = re.findall(r'"id":\s*"([^"]+)"', tpl_text)
local_names = re.findall(r'"name":\s*"([^"]+)"', tpl_text)

print(f"Total local templates in templates.ts: {len(local_slugs)}")

chungdoi_slug_set = set(slugs_seen.keys())
local_slug_set = set(local_slugs)

common = local_slug_set.intersection(chungdoi_slug_set)
local_only = local_slug_set - chungdoi_slug_set
remote_only = chungdoi_slug_set - local_slug_set

print(f"Common slugs: {len(common)}")
print(f"Local only slugs ({len(local_only)}): {sorted(list(local_only))}")
print(f"Remote only slugs ({len(remote_only)}): {sorted(list(remote_only))}")

# Check if remote demo URLs follow /vi/mau-thiep/<slug>/demo
# Let's check if the html has /demo links
demo_links = set(re.findall(r'/vi/mau-thiep/([a-zA-Z0-9_-]+)/demo', html))
print(f"Demo links explicitly in HTML: {len(demo_links)}")
