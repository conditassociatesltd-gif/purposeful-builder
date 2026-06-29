const fs = require('fs');
const txt = fs.readFileSync('purposeful-builder/manuscript/the-boy-and-addictions.md', 'utf8');
const lines = txt.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('# Chapter') || line.startsWith('**Chapter') || line.includes('A Moment to Build') || line.startsWith('# Part') || line.startsWith('# Epilogue')) {
    console.log(`Line ${i + 1}: ${line}`);
  }
}
