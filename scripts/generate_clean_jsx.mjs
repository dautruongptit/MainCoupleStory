import fs from 'fs';

const rawHtml = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');
const rootStart = rawHtml.indexOf('data-testid="minimalism-brown-template"');
const divStart = rawHtml.lastIndexOf('<div', rootStart);
const templateHtml = rawHtml.slice(divStart);

// Let's create the JSX converter
function cssToObj(cssStr) {
  const obj = {};
  cssStr.split(';').forEach(rule => {
    rule = rule.trim();
    if (!rule) return;
    const colon = rule.indexOf(':');
    if (colon === -1) return;
    let prop = rule.slice(0, colon).trim();
    let val = rule.slice(colon + 1).trim();
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
  let out = html.replace(/\bclass="/g, 'className="');
  out = out.replace(/\bfor="/g, 'htmlFor="');
  
  out = out.replace(/\bstyle="([^"]*)"/g, (match, css) => {
    css = css.replace(/&quot;/g, '"');
    const obj = cssToObj(css);
    return `style={${JSON.stringify(obj)}}`;
  });

  out = out.replace(/<(img|input|hr|br)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
  out = out.replace(/\bstroke-width=/g, 'strokeWidth=');
  out = out.replace(/\bstroke-linecap=/g, 'strokeLinecap=');
  out = out.replace(/\bstroke-linejoin=/g, 'strokeLinejoin=');
  out = out.replace(/\bfill-rule=/g, 'fillRule=');
  out = out.replace(/\bclip-rule=/g, 'clipRule=');
  out = out.replace(/&nbsp;/g, ' ');
  out = out.replace(/&amp;/g, '&');

  return out;
}

const jsxContent = htmlToJsx(templateHtml);

fs.writeFileSync('docs/real_minimalism_nau_clean_jsx.txt', jsxContent);
console.log('Saved docs/real_minimalism_nau_clean_jsx.txt, length:', jsxContent.length);
