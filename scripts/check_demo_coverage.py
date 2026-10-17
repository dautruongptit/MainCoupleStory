import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("src/features/templates/data/templates.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Parse all templates
template_ids = re.findall(r'"id":\s*"([^"]+)"', text)
template_slugs = re.findall(r'"slug":\s*"([^"]+)"', text)
template_names = re.findall(r'"name":\s*"([^"]+)"', text)
print(f"Total templates in templates.ts: {len(template_ids)}")

with open("src/features/invitation/components/generated/headers.tsx", "r", encoding="utf-8") as f:
    headers_text = f.read()

headers_keys = set(re.findall(r'(\w+):\s*H_\w+', headers_text))
print(f"Total headers in GENERATED_HEADERS: {len(headers_keys)}")

missing_headers = [tid for tid in template_ids if tid not in headers_keys]
print(f"Templates without generated header ({len(missing_headers)}):")
for tid in missing_headers:
    print(f"  - {tid}")
