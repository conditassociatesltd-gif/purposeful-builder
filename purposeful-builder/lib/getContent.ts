import fs from 'fs';
import path from 'path';

export function getAllContent(): string {
  const contentDir = path.join(process.cwd(), 'content');
  const manuscriptDir = path.join(process.cwd(), 'manuscript');

  let allText = '';

  const readFiles = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readFiles(fullPath);
      } else if (file.endsWith('.md')) {
        const text = fs.readFileSync(fullPath, 'utf-8');
        allText += `\n\n--- Document: ${file} ---\n\n` + text;
      }
    }
  };

  readFiles(contentDir);
  readFiles(manuscriptDir);

  return allText;
}
