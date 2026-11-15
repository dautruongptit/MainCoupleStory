import json

with open("scripts/reference_couples.json", "r", encoding="utf-8") as f:
    couples = json.load(f)

lines = [
    '/** Dữ liệu tên cặp đôi tham chiếu cho 75 mẫu thiệp từ chungdoi.com */',
    'export const REFERENCE_COUPLES: Record<string, { groom: string; bride: string }> = {'
]

for tid, info in couples.items():
    groom = info["groom"].replace("'", "\\'")
    bride = info["bride"].replace("'", "\\'")
    lines.append(f'  "{tid}": {{ groom: "{groom}", bride: "{bride}" }},')

lines.append("};")
lines.append("")

with open("src/features/templates/data/referenceCouples.ts", "w", encoding="utf-8") as out:
    out.write("\n".join(lines))

print(f"Generated src/features/templates/data/referenceCouples.ts with {len(couples)} entries.")
