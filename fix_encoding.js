const fs = require('fs');
const path = 'C:/Users/ALIENWARE/Documents/GitHub/purposeful-builder/purposeful-builder/manuscript/the-boy-and-addictions.md';
let txt = fs.readFileSync(path, 'utf8');

// The corrupted em-dashes
const corrupt1 = 'ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â';
const corrupt2 = 'Ã¢â‚¬â€';
const corrupt3 = 'â€”'; // sometimes this happens too

let count1 = txt.split(corrupt1).length - 1;
let count2 = txt.split(corrupt2).length - 1;

txt = txt.split(corrupt1).join('—');
txt = txt.split(corrupt2).join('—');
txt = txt.split(corrupt3).join('—');

// Fix 'Ã¢â‚¬â„¢' which is often an apostrophe
const corruptApos = 'Ã¢â‚¬â„¢';
let countApos = txt.split(corruptApos).length - 1;
txt = txt.split(corruptApos).join("'");

const corruptApos2 = 'ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢'; // another apostrophe corruption
let countApos2 = txt.split(corruptApos2).length - 1;
txt = txt.split(corruptApos2).join("'");

fs.writeFileSync(path, txt, 'utf8');
console.log(`Replaced ${count1} of corrupt1, ${count2} of corrupt2, ${countApos} of apos, ${countApos2} of apos2`);
