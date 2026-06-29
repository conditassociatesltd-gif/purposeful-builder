const fs = require('fs');
const filePath = 'purposeful-builder/manuscript/the-boy-and-addictions.md';
let txt = fs.readFileSync(filePath, 'utf8');

// The Outline ends around line 113. We need to extract the misplaced reflections from there.
// A misplaced reflection looks like:
// #
// ---
// 
// ### A Moment to Build (Reflection)
// ...
// **One step:** ... (ends with an empty line or next chapter heading)

function extractAndRemove(chapterRef, startToken, endToken) {
    let startIdx = txt.indexOf(startToken);
    if (startIdx === -1) return null;
    
    // We only want to search in the first 10,000 characters (the outline area)
    if (startIdx > 10000) {
        // Find it in the first part
        startIdx = txt.substring(0, 10000).indexOf(startToken);
        if (startIdx === -1) return null;
    }

    // find the end of the 'One step' paragraph
    let endIdx = txt.indexOf(endToken, startIdx);
    if (endIdx === -1) return null;
    
    // include the end token line
    endIdx = txt.indexOf('\n', endIdx) + 1;
    if (endIdx === -1) endIdx = txt.length;

    // extract the block
    const block = txt.substring(startIdx, endIdx);
    
    // remove the block from the outline
    txt = txt.substring(0, startIdx) + txt.substring(endIdx);
    
    return block;
}

// Extract block 7
const block7 = extractAndRemove(7, '#\r\n---\r\n\r\n### A Moment to Build (Reflection)\r\n\r\n**The Deafening Aftermath**', '**One step:**');
const block8 = extractAndRemove(8, '#\r\n---\r\n\r\n### A Moment to Build (Reflection)\r\n\r\n**The Hunger Behind the Habit**', '**One step:**');
const block11 = extractAndRemove(11, '#\r\n---\r\n\r\n### A Moment to Build (Reflection)\r\n\r\n**Rewiring the Man', '**One step:**');

// Fallback to \n if \r\n fails
const block7_unix = extractAndRemove(7, '#\n---\n\n### A Moment to Build (Reflection)\n\n**The Deafening Aftermath**', '**One step:**');
const block8_unix = extractAndRemove(8, '#\n---\n\n### A Moment to Build (Reflection)\n\n**The Hunger Behind the Habit**', '**One step:**');
const block11_unix = extractAndRemove(11, '#\n---\n\n### A Moment to Build (Reflection)\n\n**Rewiring the Man', '**One step:**');

const final7 = block7 || block7_unix;
const final8 = block8 || block8_unix;
const final11 = block11 || block11_unix;

console.log('Extracted 7:', !!final7);
console.log('Extracted 8:', !!final8);
console.log('Extracted 11:', !!final11);

// Now insert them
if (final7) {
    txt = txt.replace('# Part 3: The Anatomy of the Trap', final7 + '\n\n# Part 3: The Anatomy of the Trap');
}
if (final8) {
    txt = txt.replace('# Part 4: The Climb Out (How we get free)', final8 + '\n\n# Part 4: The Climb Out (How we get free)');
}
if (final11) {
    txt = txt.replace('# Part 5: The Charge', final11 + '\n\n# Part 5: The Charge');
}

fs.writeFileSync(filePath, txt, 'utf8');
console.log('Fix applied.');
