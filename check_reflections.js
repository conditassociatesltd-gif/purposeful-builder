const fs = require('fs');
const txt = fs.readFileSync('purposeful-builder/manuscript/the-boy-and-addictions.md', 'utf8');
const lines = txt.split('\n');
let currentChapter = 'Intro';
let chaptersWithReflections = new Set();
let allChapters = [];

lines.forEach((line, i) => {
  if (line.startsWith('# Chapter') || line.startsWith('**Chapter')) {
    currentChapter = line.trim();
    if (!allChapters.includes(currentChapter)) {
        allChapters.push(currentChapter);
    }
  } else if (line.includes('A Moment to Build')) {
    console.log(`Found reflection in: ${currentChapter}`);
    chaptersWithReflections.add(currentChapter);
  }
});

console.log('\nChapters MISSING reflections:');
allChapters.forEach(ch => {
  if (!chaptersWithReflections.has(ch) && ch.startsWith('# Chapter')) {
    console.log('- ' + ch);
  }
});
