import urllib.request
import re
import sys
import json

sys.stdout.reconfigure(encoding="utf-8")

url = "https://chungdoi.com/vi/mau-thiep/song-hy-do/demo"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode("utf-8")
        
        # Check Next.js data or props
        # In Next.js SSG / SSR pages, the initial data is in <script id="__NEXT_DATA__">
        m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
        if m:
            next_data = json.loads(m.group(1))
            props = next_data.get("props", {}).get("pageProps", {})
            print("Found __NEXT_DATA__ keys in demo page:", list(props.keys()))
            with open("scripts/song_hy_do_demo_props.json", "w", encoding="utf-8") as pf:
                json.dump(props, pf, ensure_ascii=False, indent=2)
            print("Saved props to scripts/song_hy_do_demo_props.json")
        else:
            print("No __NEXT_DATA__ in demo page")
            
        # Extract title and headings
        title = re.search(r'<title>(.*?)</title>', html)
        print("Page Title:", title.group(1) if title else "None")
        
        # Find couple names or h1/h2
        headings = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', html)
        for tag, text in headings[:15]:
            clean = re.sub(r'<[^>]+>', ' ', text).strip()
            print(f"[{tag}] {clean}")
            
except Exception as e:
    print(f"Error fetching: {e}")
