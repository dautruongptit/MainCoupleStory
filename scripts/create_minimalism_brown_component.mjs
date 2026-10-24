import fs from 'fs';

function cssToObj(cssStr) {
  const obj = {};
  cssStr.split(';').forEach(rule => {
    rule = rule.trim();
    if (!rule) return;
    const colon = rule.indexOf(':');
    if (colon === -1) return;
    let prop = rule.slice(0, colon).trim();
    let val = rule.slice(colon + 1).trim();
    // camelCase property
    if (prop.startsWith('--')) {
      obj[prop] = val;
    } else {
      const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      obj[camel] = val;
    }
  });
  return obj;
}

function htmlToJsx(html) {
  // Replace class= with className=
  let out = html.replace(/\bclass="/g, 'className="');
  out = out.replace(/\bfor="/g, 'htmlFor="');
  
  // Replace style="..."
  out = out.replace(/\bstyle="([^"]*)"/g, (match, css) => {
    // decode &quot;
    css = css.replace(/&quot;/g, '"');
    const obj = cssToObj(css);
    return `style={${JSON.stringify(obj)}}`;
  });

  // Self close img, input, hr, br
  out = out.replace(/<(img|input|hr|br)([^>]*?)(?<!\/)>/gi, '<$1$2 />');

  // Replace svg kebab-case attrs
  out = out.replace(/\bstroke-width=/g, 'strokeWidth=');
  out = out.replace(/\bstroke-linecap=/g, 'strokeLinecap=');
  out = out.replace(/\bstroke-linejoin=/g, 'strokeLinejoin=');
  out = out.replace(/\bfill-rule=/g, 'fillRule=');
  out = out.replace(/\bclip-rule=/g, 'clipRule=');

  // Replace &nbsp; with {"\u00A0"}
  out = out.replace(/&nbsp;/g, ' ');

  return out;
}

const raw = fs.readFileSync('docs/real_minimalism_nau_showcase_all.html', 'utf8');
const converted = htmlToJsx(raw);
console.log('Converted length:', converted.length);
fs.writeFileSync('docs/real_minimalism_nau_jsx_raw.txt', converted);
console.log('Saved docs/real_minimalism_nau_jsx_raw.txt');
