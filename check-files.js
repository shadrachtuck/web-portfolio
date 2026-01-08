import { existsSync } from 'fs';
import { join } from 'path';

const requiredFiles = [
  'index.html',
  'src/main.jsx',
  'src/App.jsx',
  'package.json'
];

const results = requiredFiles.map(file => {
  const exists = existsSync(join(process.cwd(), file));
  return { file, exists };
});

const missing = results.filter(r => !r.exists);

if (missing.length > 0) {
  console.error('Missing required files:', missing.map(m => m.file).join(', '));
  process.exit(1);
} else {
  console.log('All required files present');
}

