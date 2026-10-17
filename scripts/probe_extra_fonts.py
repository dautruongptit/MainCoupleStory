import urllib.request
import sys

sys.stdout.reconfigure(encoding="utf-8")

base_url = "https://chungdoi.com"
headers = {"User-Agent": "Mozilla/5.0"}

candidates = [
    # Variations of script/calligraphy fonts
    "Pattaya-Regular.ttf", "Pattaya.ttf", "Pattaya.woff2",
    "DancingScript-Regular.ttf", "DancingScript-Regular.woff2",
    "GreatVibes-Regular.woff2", "AlexBrush-Regular.woff2",
    "Ephesis-Regular.ttf", "Ephesis-Regular.woff2",
    "Allura-Regular.ttf", "Allura-Regular.woff2",
    "MarckScript-Regular.ttf",
    "Montserrat-Regular.ttf", "Montserrat-Bold.ttf", "Montserrat-Medium.ttf",
    "PlayfairDisplay-Regular.ttf", "PlayfairDisplay-Bold.ttf", "PlayfairDisplay-Italic.ttf",
    "Lora-Bold.ttf", "Lora-Italic.ttf",
    "CormorantGaramond-Regular.ttf", "CormorantGaramond-Bold.ttf",
    "EBGaramond-Regular.ttf", "EBGaramond-Bold.ttf",
    "LibreBaskerville-Regular.ttf", "LibreBaskerville-Bold.ttf",
    "BeVietnamPro-Regular.ttf", "BeVietnamPro-Bold.ttf",
    "inter.woff2", "inter.ttf",
    "font.css", "fonts.css"
]

found = []
for c in candidates:
    url = f"{base_url}/fonts/{c}"
    req = urllib.request.Request(url, headers=headers, method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=3) as resp:
            if resp.status == 200:
                found.append(c)
                print(f"  FOUND: /fonts/{c}")
    except:
        pass

print(f"Finished checking candidates. Found extra: {len(found)}")
