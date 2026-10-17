import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

slugs = ["minimalism-do-dam", "minimalism-nau", "song-hy-xanh", "hoa-moc-xanh", "song-hy-do"]

for slug in slugs:
    url = f"https://chungdoi.com/vi/mau-thiep/{slug}/demo"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req).read().decode("utf-8")
    
    # Title
    title = re.search(r'<title>(.*?)</title>', html)
    # H1
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html)
    # Date
    date_match = re.search(r'(\d{1,2}\s+tháng\s+\d{1,2},\s+\d{4})', html)
    # Location
    loc_match = re.search(r'([A-ZÀ-Ỹ][^<>\n\r]{10,80}(?:Palace|Center|Plaza|Hotel|Resort|Quận|TP\.|Hồ Chí Minh|Hà Nội)[^<>\n\r]{0,60})', html)
    
    print(f"[{slug}]")
    print(f"  H1: {h1.group(1) if h1 else 'none'}")
    print(f"  Date: {date_match.group(1) if date_match else 'none'}")
    print(f"  Location: {loc_match.group(1) if loc_match else 'none'}")
