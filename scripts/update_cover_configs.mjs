import fs from 'fs';

let content = fs.readFileSync('src/features/invitation/components/covers/coverConfigs.ts', 'utf8');

// Update double_phoenix_red
content = content.replace(
  /("double_phoenix_red":\s*\{[\s\S]*?sealType:\s*"xi",)/,
  '$1\n    sealTop: -6,'
);

// Update dragon_phoenix_v2_red
content = content.replace(
  /("dragon_phoenix_v2_red":\s*\{[\s\S]*?)sealType:\s*"xi"/,
  '$1sealType: "none"'
);

fs.writeFileSync('src/features/invitation/components/covers/coverConfigs.ts', content, 'utf8');
console.log('Successfully updated coverConfigs.ts');
