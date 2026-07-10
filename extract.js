const fs = require('fs');
const txt = fs.readFileSync('C:/Users/ALIENWARE/.gemini/antigravity-ide/brain/4ba0bea3-c9a8-4357-b76f-79ef963ee1a1/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = txt.split('\n');
lines.forEach(l => {
    if (l.includes('"type":"USER_INPUT"') && l.includes('Research note')) {
        const matches = l.match(/bp\('Research note:.*?'/g);
        if (matches) {
            matches.forEach(m => console.log(m));
        }
    }
});
