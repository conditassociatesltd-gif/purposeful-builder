const fs = require('fs');
const txt = fs.readFileSync('C:/Users/ALIENWARE/.gemini/antigravity-ide/brain/4ba0bea3-c9a8-4357-b76f-79ef963ee1a1/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = txt.split('\n');
lines.forEach(l => {
    if (l.toLowerCase().includes('sexual aggression') || l.toLowerCase().includes('meta-analysis') || l.toLowerCase().includes('trauma and addiction')) {
        try {
            const data = JSON.parse(l);
            console.log("Found:", data.content.substring(0, 500) + '...');
        } catch(e) {}
    }
});
