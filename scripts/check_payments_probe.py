import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

base_url = "https://chungdoi.com"
headers = {"User-Agent": "Mozilla/5.0"}

def head_url(path):
    url = base_url + path if path.startswith("/") else path
    req = urllib.request.Request(url, headers=headers, method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status, resp.headers.get("Content-Length"), resp.headers.get("Content-Type")
    except urllib.error.HTTPError as e:
        return e.code, None, None
    except Exception as e:
        return str(e), None, None

# Test paymats vs payments
test_icons = [
    "paypal.svg", "registry.svg", "vietqr.svg", "wise.svg",
    "bank-generic.svg", "cashapp.svg", "line-pay.svg", "note.svg",
    "revolut.svg", "sepa.svg", "upload-qr.svg", "venmo.svg", "zelle.svg"
]

print("--- Testing /icons/payments/ ---")
for ic in test_icons:
    st, length, ct = head_url(f"/icons/payments/{ic}")
    print(f"  /icons/payments/{ic} -> {st} ({length} bytes, {ct})")

print("\n--- Testing /icons/paymats/ ---")
for ic in test_icons:
    st, length, ct = head_url(f"/icons/paymats/{ic}")
    print(f"  /icons/paymats/{ic} -> {st} ({length} bytes, {ct})")

# Let's also test other potential paymats/payments names:
for other in ["momo.svg", "vnpay.svg", "zalopay.svg", "card.svg", "bank.svg", "transfer.svg", "cash.svg"]:
    st, length, ct = head_url(f"/icons/payments/{other}")
    if st == 200:
        print(f"  Found /icons/payments/{other}!")
    st2, length2, ct2 = head_url(f"/icons/paymats/{other}")
    if st2 == 200:
        print(f"  Found /icons/paymats/{other}!")
