import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("src/features/invitation/config/templateThemes.ts", "r", encoding="utf-8") as f:
    text = f.read()

keys = re.findall(r"^\s*([a-z0-9_]+):\s*\{", text, re.MULTILINE)
print("Total keys in TEMPLATE_THEMES:", len(keys))

with open("src/features/templates/data/templates.ts", "r", encoding="utf-8") as f:
    t_text = f.read()
tpl_ids = re.findall(r'"id":\s*"([^"]+)"', t_text)

missing = [t for t in tpl_ids if t not in keys]
print(f"Templates missing from TEMPLATE_THEMES ({len(missing)}):")
for m in missing:
    print(" -", m)
