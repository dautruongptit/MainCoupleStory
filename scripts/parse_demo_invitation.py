import urllib.request
import re
import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

url = "https://chungdoi.com/vi/mau-thiep/song-hy-do/demo"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req).read().decode("utf-8")

pushes = re.findall(r'self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)', html, re.DOTALL)
for p in pushes:
    if "heroPhoto" in p:
        u = bytes(p, "utf-8").decode("unicode_escape")
        idx = u.find('"heroPhoto"')
        print("Snippet around heroPhoto:")
        print(u[max(0, idx - 150):min(len(u), idx + 350)])
        break
