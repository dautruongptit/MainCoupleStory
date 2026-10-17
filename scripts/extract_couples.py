import json
import sys
import re

sys.stdout.reconfigure(encoding="utf-8")

with open("scripts/remote_75_audit_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total templates: {len(data)}")

template_couples = {}

for item in data:
    tid = item["id"]
    slug = item["slug"]
    h1 = item["h1"] # e.g. "Hoàng Long  &  Bảo Ngọc"
    
    parts = re.split(r'\s*&\s*', h1)
    if len(parts) == 2:
        groom = parts[0].strip()
        bride = parts[1].strip()
    else:
        groom = item.get("groom", "")
        bride = item.get("bride", "")
        
    template_couples[tid] = {
        "slug": slug,
        "name": item["name"],
        "groom": groom,
        "bride": bride,
        "title": item["title"]
    }
    print(f"'{tid}': {{ groom: '{groom}', bride: '{bride}' }},")

with open("scripts/reference_couples.json", "w", encoding="utf-8") as f:
    json.dump(template_couples, f, ensure_ascii=False, indent=2)
