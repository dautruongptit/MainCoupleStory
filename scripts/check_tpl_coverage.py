import re
import os

with open('src/features/templates/data/templates.ts', 'r', encoding='utf-8') as f:
    text_tpl = f.read()

tpl_ids = re.findall(r'"id":\s*"([^"]+)"', text_tpl)
print(f"1. Total TEMPLATES defined: {len(tpl_ids)}")

with open('src/features/invitation/components/generated/headers.tsx', 'r', encoding='utf-8') as f:
    text_hdr = f.read()
hdrs = set(re.findall(r'^\s*([a-zA-Z0-9_]+):\s*H_', text_hdr, re.M))
bespoke = {'minimalism_brown', 'song_hy_green', 'dragon_phoenix_v2_red'}
total_rendered = hdrs | bespoke
print(f"2. Total templates with header component: {len(total_rendered)}/75")

with open('src/features/invitation/config/templateThemes.ts', 'r', encoding='utf-8') as f:
    text_pal = f.read()
palettes = set(re.findall(r'^\s*([a-zA-Z0-9_]+):\s*\{', text_pal, re.M))
print(f"3. Total templates with color palette: {len(palettes)}/75")

with open('src/features/templates/data/themeManifest.ts', 'r', encoding='utf-8') as f:
    text_man = f.read()
manifest_keys = set(re.findall(r'"([a-zA-Z0-9_]+)":\s*\[', text_man))
print(f"4. Total templates in TEMPLATE_THEME_FOLDERS: {len(manifest_keys)}/75")

all_matched = (
    len(tpl_ids) == 75 and
    len(total_rendered) == 75 and
    len(palettes) == 75 and
    set(tpl_ids).issubset(manifest_keys)
)
print(f"\nALL 75 TEMPLATES COMPREHENSIVELY AUDITED & MAPPED: {all_matched}")

