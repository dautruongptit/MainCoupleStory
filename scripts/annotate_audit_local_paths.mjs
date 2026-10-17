import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const auditDir = path.join(root, 'docs', 'asset-audit');
const publicDir = path.join(root, 'public');

const files = fs.readdirSync(auditDir).filter(f => f.endsWith('.json') && f !== 'local-mirror-plan.json');

console.log(`Processing ${files.length} audit JSON files...`);

let totalAnnotated = 0;

for (const file of files) {
  const filePath = path.join(auditDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!data.localPaths) {
    data.localPaths = {};
  }

  // Collect all URLs from stages and cssBackgrounds
  const urls = new Set();
  if (data.stages) {
    for (const stageUrls of Object.values(data.stages)) {
      if (Array.isArray(stageUrls)) {
        for (const u of stageUrls) {
          if (typeof u === 'string') urls.add(u);
        }
      }
    }
  }
  if (Array.isArray(data.cssBackgrounds)) {
    for (const u of data.cssBackgrounds) {
      if (typeof u === 'string') urls.add(u);
    }
  }

  let fileAnnotated = 0;
  for (const u of urls) {
    let localRel = null;
    if (u.includes('assets.chungdoi.com')) {
      const parsed = u.replace(/^https?:\/\/assets\.chungdoi\.com\//, '');
      if (parsed.startsWith('photo-library/design/')) {
        localRel = `/images/${parsed}`;
      } else if (parsed.startsWith('template-previews/')) {
        const basename = path.basename(parsed);
        localRel = `/images/template-previews/${basename}`;
      } else if (parsed.startsWith('music/')) {
        localRel = `/${parsed}`;
      }
    } else if (u.startsWith('/images/')) {
      localRel = u;
    }

    if (localRel) {
      const diskPath = path.join(publicDir, localRel.replace(/^\//, ''));
      if (fs.existsSync(diskPath)) {
        data.localPaths[u] = localRel;
        fileAnnotated++;
      }
    }
  }

  data.localMirroredCount = Object.keys(data.localPaths).length;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  totalAnnotated += fileAnnotated;
}

console.log(`Done! Annotated localPath in ${files.length} files (total ${totalAnnotated} URLs matched to local files).`);
