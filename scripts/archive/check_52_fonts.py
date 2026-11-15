import urllib.request
import sys

sys.stdout.reconfigure(encoding="utf-8")

fonts = [
    "/fonts/AguafinaScript-Regular.ttf",
    "/fonts/AlexBrush-Regular.ttf",
    "/fonts/Babylonica-Regular.ttf",
    "/fonts/BalooBhaijaan-Regular.ttf",
    "/fonts/BeauRivage-Regular.ttf",
    "/fonts/Birthstone-latin-ext.woff2",
    "/fonts/Birthstone-latin.woff2",
    "/fonts/Birthstone-vietnamese.woff2",
    "/fonts/Bungee-latin-ext.woff2",
    "/fonts/Bungee-latin.woff2",
    "/fonts/Bungee-vietnamese.woff2",
    "/fonts/CDBrushAmpersand-Regular.woff2",
    "/fonts/Carattere-Regular.ttf",
    "/fonts/ClickerScript-Regular.ttf",
    "/fonts/CormorantGaramond-Variable.ttf",
    "/fonts/CrimsonPro-Regular.ttf",
    "/fonts/EBGaramond-Variable.ttf",
    "/fonts/Fraunces-Soft.woff2",
    "/fonts/GreatVibes-Regular.ttf",
    "/fonts/Lexend-Regular.ttf",
    "/fonts/Lora-Regular.ttf",
    "/fonts/MsMadiAmpersand-Regular.woff2",
    "/fonts/NotoSerif-Regular.ttf",
    "/fonts/Oswald-latin-ext.woff2",
    "/fonts/Oswald-latin.woff2",
    "/fonts/Oswald-vietnamese.woff2",
    "/fonts/Parisienne-latin-ext.woff2",
    "/fonts/Parisienne-latin.woff2",
    "/fonts/PatrickHand-latin-ext.woff2",
    "/fonts/PatrickHand-latin.woff2",
    "/fonts/PatrickHand-vietnamese.woff2",
    "/fonts/Pattaya-Regular.woff",
    "/fonts/PinyonScript-latin-ext.woff2",
    "/fonts/PinyonScript-latin.woff2",
    "/fonts/PinyonScript-vietnamese.woff2",
    "/fonts/PlayfairDisplay-Variable.ttf",
    "/fonts/PlusJakartaSans-latin-ext.woff2",
    "/fonts/PlusJakartaSans-latin.woff2",
    "/fonts/PlusJakartaSans-vietnamese.woff2",
    "/fonts/Roboto-latin-ext.woff2",
    "/fonts/Roboto-latin.woff2",
    "/fonts/Roboto-vietnamese.woff2",
    "/fonts/StyleScript-Regular.ttf",
    "/fonts/TheNautigal-Bold.ttf",
    "/fonts/TheNautigal-Regular.ttf",
    "/fonts/Ubuntu-Light.ttf",
    "/fonts/Ubuntu-Medium.ttf",
    "/fonts/Ubuntu-Regular.ttf",
    "/fonts/Uchen-Regular.ttf",
    "/fonts/ViaodaLibre-Regular.ttf",
    "/fonts/VujahdayScript-Regular.ttf",
    "/fonts/Whisper-Regular.ttf"
]

base_url = "https://chungdoi.com"
headers = {"User-Agent": "Mozilla/5.0"}

success = []
failed = []

total_bytes = 0
for f in fonts:
    req = urllib.request.Request(base_url + f, headers=headers, method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            size = int(resp.headers.get("Content-Length", 0))
            total_bytes += size
            success.append((f, resp.status, size, resp.headers.get("Content-Type")))
    except Exception as e:
        failed.append((f, str(e)))

print(f"Verified {len(success)}/{len(fonts)} fonts exist. Total size: {total_bytes / (1024*1024):.2f} MB")
if failed:
    print(f"Failed {len(failed)} fonts:")
    for f, err in failed:
        print(f"  {f}: {err}")
else:
    print("ALL 52 FONTS RETURNED 200 OK!")
