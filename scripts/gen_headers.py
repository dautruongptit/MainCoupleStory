"""Sinh src/generated/headers.tsx từ HTML trang demo thật (đã mở), chỉ phần đầu thiệp (root + header).
Chạy: python gen_headers.py slug:templateId ...
Tên, chữ mở đầu và ảnh đôi được thay bằng tham số; mọi thứ khác giữ nguyên từ HTML thật."""
import re, sys, os, json
from html.parser import HTMLParser

TP = os.environ["TEMP"] + "/tp"
OUT = r"D:\MY PRO\applications\MainCoupleStory\web\src\features\invitation\components\generated"
MAXLEN = 16000
VOID = {"img", "br", "hr", "input", "meta", "link"}

def camel(p):
    if p.startswith("--"):
        return p
    return re.sub(r"-([a-z])", lambda m: m.group(1).upper(), p)

def style_obj(s):
    items = []
    for part in re.split(r";(?![^(]*\))", s):
        if ":" not in part:
            continue
        k, v = part.split(":", 1)
        k, v = k.strip(), v.strip().replace("&quot;", '"')
        if not k:
            continue
        items.append(f"{json.dumps(camel(k))}: {json.dumps(v)}")
    return "{{ " + ", ".join(items) + " } as CSSProperties}"

SVG_TAGS = {"clippath": "clipPath", "lineargradient": "linearGradient", "radialgradient": "radialGradient", "foreignobject": "foreignObject", "textpath": "textPath", "fegaussianblur": "feGaussianBlur", "feoffset": "feOffset", "feflood": "feFlood", "fecomposite": "feComposite", "feblend": "feBlend", "fecolormatrix": "feColorMatrix"}
SVG_ATTRS = {"viewbox": "viewBox", "preserveaspectratio": "preserveAspectRatio", "gradientunits": "gradientUnits", "gradienttransform": "gradientTransform", "clippathunits": "clipPathUnits", "patternunits": "patternUnits", "stddeviation": "stdDeviation", "xlink:href": "xlinkHref", "xmlns:xlink": "xmlnsXlink", "spreadmethod": "spreadMethod", "textlength": "textLength", "startoffset": "startOffset"}
def attr_name(k):
    if k in SVG_ATTRS: return SVG_ATTRS[k]
    if k.startswith(("aria-", "data-")): return k
    if "-" in k and not k.startswith("--"): return re.sub(r"-([a-z])", lambda m: m.group(1).upper(), k)
    return ATTR.get(k, k)
ATTR = {"class": "className", "for": "htmlFor", "tabindex": "tabIndex", "srcset": "srcSet", "fetchpriority": "fetchPriority"}

class Conv(HTMLParser):
    def __init__(self, names):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.texts = []
        self.names = names
        self.skip = 0
        self.stack = []
    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "noscript"):
            self.skip += 1
            return
        a = []
        for k, v in attrs:
            v = v or ""
            if k == "style":
                a.append(f"style={style_obj(v)}")
            elif k == "src" and v.startswith("https://assets.chungdoi.com/photo-library"):
                a.append("src={photo}")
            elif k == "src" and v.startswith("/"):
                a.append(f'src={{"{v}"}}')
            elif k in ("data-showcase-root", "data-showcase-keep", "data-video-hide") or k.startswith("data-") or k in ("sizes", "srcset", "loading", "decoding", "fetchpriority", "crossorigin"):
                continue
            elif k == "dir":
                continue
            elif k == "aria-hidden":
                a.append('aria-hidden="true"')
            else:
                a.append(f'{attr_name(k)}={{{json.dumps(v)}}}')
        tag = SVG_TAGS.get(tag, tag)
        self.out.append(f"<{tag}{(' ' + ' '.join(a)) if a else ''}{' /' if tag in VOID else ''}>")
        if tag not in VOID:
            self.stack.append(tag)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript"):
            self.skip -= 1
            return
        if tag in VOID:
            return
        if self.stack and self.stack[-1] == SVG_TAGS.get(tag, tag):
            self.stack.pop()
        self.out.append(f"</{SVG_TAGS.get(tag, tag)}>")
    def handle_data(self, d):
        if self.skip:
            return
        t = d.strip()
        if not t:
            return
        self.texts.append(t)
        if t == "&":
            self.out.append("{'&'}")
            return
        if t in self.names["groom"]:
            self.out.append("{groom}")
        elif t in self.names["bride"]:
            self.out.append("{bride}")
        elif re.fullmatch(r"(save the date|the wedding of|welcome to our wedding|the story of love)", t, re.I) or t == self.names.get("intro"):
            self.out.append("{intro}")
        else:
            self.out.append("{" + json.dumps(t, ensure_ascii=False) + "}")

def _close(h, start, tag):
    """Vị trí ngay sau thẻ đóng khớp với thẻ mở tại start (đếm độ sâu cùng loại thẻ)."""
    depth, pos = 0, start
    for m in re.finditer(rf"<(/?){tag}(?=[\s>/])[^>]*>", h[start:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return start + m.end()
    return -1

def extract(slug):
    h = open(f"{TP}/{slug}.o.html", encoding="utf-8").read()
    i = h.find("data-showcase-root")
    i = h.rfind("<div", 0, i)
    j = h.find("<header", i)
    tag = "header"
    if j < 0:
        j = h.find("<section", i)
        tag = "section"
    if j < 0:
        raise SystemExit(f"{slug}: không có header/section")
    k = _close(h, j, tag)
    return h[i:k], h

def keyframes(h):
    css = "".join(re.findall(r"<style[^>]*>(.*?)</style>", h, flags=re.S))
    ks = re.findall(r"@keyframes\s+(?:db|dbr|dr|ds|[A-Za-z0-9_-]+)\s*\{(?:[^{}]|\{[^{}]*\})*\}", css)
    return ks

def main(pairs):
    os.makedirs(OUT, exist_ok=True)
    comps, kf, reg = [], set(), []
    for pair in pairs:
        slug, tid = pair.split(":")
        frag, full = extract(slug)
        # tên: hai text node nằm trong thẻ p/h có cỡ chữ lớn; lấy theo thứ tự trong header (sau chữ mở đầu)
        txts = [t.strip() for t in re.findall(r">([^<>]+)<", re.sub(r"<style.*?</style>", "", frag, flags=re.S)) if t.strip()]
        cand = [t for t in txts if t != "&amp;" and t != "&" and not re.fullmatch(r"(save the date|the wedding of|welcome to our wedding|the story of love)", t, re.I)]
        names = {"groom": {cand[0]} if cand else set(), "bride": {cand[1]} if len(cand) > 1 else set()}
        c = Conv(names)
        c.feed(frag)
        body = "".join(c.out)
        if len(body) > MAXLEN:
            print(slug, "BỎ QUA: phần đầu quá lớn (", len(body), "ký tự), có vẻ là cả trang")
            continue
        # đóng thẻ còn mở (root div) vì ta cắt ngay sau </header>
        for t in reversed(c.stack):
            body += f"</{t}>"
        name = "H_" + re.sub(r"[^A-Za-z0-9]", "_", tid)
        comps.append(f"function {name}({{ groom, bride, intro, photo }}: P) {{\n  return (\n    {body}\n  );\n}}\n")
        reg.append(f'  {tid}: {name},')
        for k in keyframes(full):
            kf.add(k)
        print(slug, "->", name, len(body), "chars; names:", cand[:2])
    tsx = ("/* TỆP SINH TỰ ĐỘNG từ HTML trang demo thật (scratchpad/gen_headers.py). Không sửa tay. */\n"
           "import type { CSSProperties, ReactElement } from \"react\";\n\n"
           "type P = { groom: string; bride: string; intro: string; photo?: string };\n\n"
           + "\n".join(comps) +
           "\nexport const GENERATED_HEADERS: Record<string, (p: P) => ReactElement> = {\n" + "\n".join(reg) + "\n};\n")
    open(OUT + r"\headers.tsx", "w", encoding="utf-8").write(tsx)
    open(OUT + r"\headers.css", "w", encoding="utf-8").write("/* @keyframes lấy từ trang demo thật */\n" + "\n".join(sorted(kf)) + "\n")

main(sys.argv[1:])
