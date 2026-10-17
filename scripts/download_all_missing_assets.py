import sys
import os
import time
import urllib.request
import urllib.parse
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT_DIR = Path("d:/MY PRO/applications/MainCoupleStory/web")
PUBLIC_DIR = ROOT_DIR / "public"
LIST_FILE = ROOT_DIR / "docs" / "requests" / "missing-assets.txt"
LOG_FILE = ROOT_DIR / "scripts" / "download_missing_assets.log"

def is_valid_image(data: bytes, ext: str) -> bool:
    if len(data) < 16:
        return False
    # Check for HTML / Cloudflare error pages
    prefix_lower = data[:256].lower()
    if b"<!doctype html" in prefix_lower or b"<html" in prefix_lower or b"cloudflare" in prefix_lower:
        return False

    ext = ext.lower()
    if ext == ".webp":
        return data[:4] == b"RIFF" and data[8:12] == b"WEBP"
    elif ext == ".png":
        return data[:4] == b"\x89PNG"
    elif ext in [".jpg", ".jpeg"]:
        return data[:2] == b"\xff\xd8"
    elif ext == ".svg":
        return b"<svg" in prefix_lower or b"<?xml" in prefix_lower
    elif ext == ".gif":
        return data[:4] == b"GIF8"
    
    # Generic check if extension is unknown
    return (
        (data[:4] == b"RIFF" and data[8:12] == b"WEBP") or
        data[:4] == b"\x89PNG" or
        data[:2] == b"\xff\xd8" or
        b"<svg" in prefix_lower
    )

def log(msg: str):
    print(msg, flush=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(msg + "\n")

def main():
    if not LIST_FILE.exists():
        log(f"Error: {LIST_FILE} does not exist.")
        sys.exit(1)

    with open(LIST_FILE, "r", encoding="utf-8") as f:
        paths = [line.strip() for line in f if line.strip()]

    total = len(paths)
    log(f"=== STARTING DOWNLOAD OF {total} MISSING ASSETS ===")
    log(f"Delay: 1.6s per file. Target base: {PUBLIC_DIR}")

    success_count = 0
    skipped_count = 0
    failed_items = []

    for idx, path in enumerate(paths, 1):
        rel_path = path.lstrip("/")
        dest_path = PUBLIC_DIR / rel_path
        _, ext = os.path.splitext(path)

        # Check if already downloaded and valid
        if dest_path.exists() and dest_path.stat().st_size > 50:
            try:
                with open(dest_path, "rb") as existing_file:
                    first_bytes = existing_file.read(256)
                    if is_valid_image(first_bytes, ext):
                        skipped_count += 1
                        if idx % 20 == 0 or idx == total:
                            log(f"[{idx}/{total}] Already exists (valid): {path}")
                        continue
            except Exception:
                pass

        # Prepare request
        encoded_path = urllib.parse.quote(path, safe="/")
        url = f"https://chungdoi.com{encoded_path}"
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
                "Referer": "https://chungdoi.com/vi/mau-thiep",
                "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            }
        )

        # Sleep >= 1.5s
        time.sleep(1.6)

        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                status = resp.status
                data = resp.read()

                if not is_valid_image(data, ext):
                    log(f"[{idx}/{total}] INVALID IMAGE CONTENT ({len(data)} bytes): {path}")
                    failed_items.append((path, "Invalid image content / HTML"))
                    continue

                dest_path.parent.mkdir(parents=True, exist_ok=True)
                with open(dest_path, "wb") as out_f:
                    out_f.write(data)

                success_count += 1
                log(f"[{idx}/{total}] Downloaded ({len(data)} bytes): {path}")

        except urllib.error.HTTPError as e:
            log(f"[{idx}/{total}] HTTP {e.code} for: {path} ({url})")
            if e.code in [403, 429]:
                log(f"CRITICAL: Received HTTP {e.code} (Rate limit / Blocked). HALTING IMMEDIATELY as requested.")
                sys.exit(2)
            failed_items.append((path, f"HTTP {e.code}"))

        except Exception as e:
            log(f"[{idx}/{total}] ERROR downloading {path}: {e}")
            failed_items.append((path, str(e)))

    log("\n==========================================")
    log(f"DOWNLOAD FINISHED: Total: {total}")
    log(f"Success: {success_count}")
    log(f"Already Existed: {skipped_count}")
    log(f"Failed: {len(failed_items)}")
    log("==========================================")

    if failed_items:
        log("\nFailed files:")
        for fp, err in failed_items:
            log(f" - {fp}: {err}")

if __name__ == "__main__":
    main()
