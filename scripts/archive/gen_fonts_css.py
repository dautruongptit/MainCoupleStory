import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

PROJECT_ROOT = Path("d:/MY PRO/applications/MainCoupleStory/web")

with open(PROJECT_ROOT / "scripts" / "probe_fonts.css", "w", encoding="utf-8") as out:
    pass

# We will read the CSS we downloaded or fetch it and extract all @font-face rules
import urllib.request
css_req = urllib.request.Request(
    "https://chungdoi.com/_next/static/css/af1631493186e596.css",
    headers={"User-Agent": "Mozilla/5.0"}
)
with urllib.request.urlopen(css_req) as resp:
    css = resp.read().decode("utf-8")

# Extract all @font-face blocks
blocks = re.findall(r'@font-face\s*\{([^}]+)\}', css)

font_css_lines = [
    "/* ==========================================================================",
    "   TYPOGRAPHY & LOCAL FONTS DEFINITIONS",
    "   Auto-generated from reference project standard font declarations",
    "   All font files are hosted locally in /fonts/ and /fonts/google/",
    "   ========================================================================== */",
    ""
]

for b in blocks:
    cleaned = b.strip()
    # Normalize paths to /fonts/
    font_css_lines.append(f"@font-face {{\n  {cleaned}\n}}\n")

font_css_content = "\n".join(font_css_lines)
with open(PROJECT_ROOT / "src" / "styles" / "fonts.css", "w", encoding="utf-8") as f:
    f.write(font_css_content)

print(f"Generated src/styles/fonts.css with {len(blocks)} @font-face blocks ({len(font_css_content)} bytes)")
