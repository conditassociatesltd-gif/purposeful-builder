const fs = require('fs');
const path = 'C:/Users/ALIENWARE/Documents/GitHub/purposeful-builder/purposeful-builder/manuscript/the-boy-and-addictions.md';
let txt = fs.readFileSync(path, 'utf8');

const stats = {
    ch5Data: false,
    ch7Opening: false,
    ch8Data: false
};

// Chapter 7 Opening
// Replace "The secret was out." only if it's right before "For days afterward"
if (txt.includes('The secret was out.') && txt.includes('For days afterward')) {
    txt = txt.replace(/The secret was out\.\s*For days afterward/, `When I woke up on the parlor floor the morning after that Easter Sunday, my mind was entirely blank. I remembered the heat, I remembered the mixed cups of palm wine, Gulder, and Star, and I remembered stumbling away from the roadside cooler. But the hours between that moment and waking up in my own mess were completely gone. I lay there on the floor, my body physically shattered, trying to piece together how I had gotten home.\n\nThe secret was out — not in a quiet, controlled way, but in the most humiliating way a secret can leave you.\n\nFor days afterward`);
    stats.ch7Opening = true;
}

// Chapter 5 Data
if (txt.includes('permanent consequence that neither of them is ready for.')) {
    txt = txt.replace(/permanent consequence that neither of them is ready for\.\s*I want to be honest/, `permanent consequence that neither of them is ready for.\n\n> *Research note: A meta-analysis of 22 studies from seven countries found that consumption of pornography was significantly associated with increases in sexual aggression, both verbally and physically, among males.*\n\nI want to be honest`);
    stats.ch5Data = true;
}

// Chapter 8 Data
if (txt.includes('what had been taken from me.')) {
    txt = txt.replace(/what had been taken from me\.\s*---/, `what had been taken from me.\n\n> *Research note: Research from the University of Georgia found that childhood abuse and trauma have a direct correlation to the development of addiction, with early sexual and emotional abuse being significant predictors of developing compulsive sexual behaviour in males.*\n\n---`);
    stats.ch8Data = true;
}

fs.writeFileSync(path, txt, 'utf8');
console.log("Stats: ", stats);
