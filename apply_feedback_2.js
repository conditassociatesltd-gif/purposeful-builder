const fs = require('fs');
const path = 'C:/Users/ALIENWARE/Documents/GitHub/purposeful-builder/purposeful-builder/manuscript/the-boy-and-addictions.md';
let txt = fs.readFileSync(path, 'utf8');

function replaceOnce(search, replacement) {
    if (txt.includes(search)) {
        txt = txt.replace(search, replacement);
        return true;
    }
    return false;
}

const stats = {
    ch5Data: false,
    ch7Opening: false,
    ch8Data: false
};

// Chapter 7 Opening
const ch7Search = `The secret was out.

For days afterward, my body was so violently poisoned`;
const ch7Rep = `When I woke up on the parlor floor the morning after that Easter Sunday, my mind was entirely blank. I remembered the heat, I remembered the mixed cups of palm wine, Gulder, and Star, and I remembered stumbling away from the roadside cooler. But the hours between that moment and waking up in my own mess were completely gone. I lay there on the floor, my body physically shattered, trying to piece together how I had gotten home.

The secret was out — not in a quiet, controlled way, but in the most humiliating way a secret can leave you.

For days afterward, my body was so violently poisoned`;
stats.ch7Opening = replaceOnce(ch7Search, ch7Rep);

// Chapter 5 Data
const ch5Search = `Some boys, the very first time they decide to cross from screen to reality, leave a girl pregnant —  and what began as a private secret becomes a permanent consequence that neither of them is ready for.

I want to be honest`;
const ch5Rep = `Some boys, the very first time they decide to cross from screen to reality, leave a girl pregnant —  and what began as a private secret becomes a permanent consequence that neither of them is ready for.

> *Research note: A meta-analysis of 22 studies from seven countries found that consumption of pornography was significantly associated with increases in sexual aggression, both verbally and physically, among males.*

I want to be honest`;
stats.ch5Data = replaceOnce(ch5Search, ch5Rep);

// Chapter 8 Data
const ch8Search = `The addiction became a way to numb the pain of what had been taken from me.

---`;
const ch8Rep = `The addiction became a way to numb the pain of what had been taken from me.

> *Research note: Research from the University of Georgia found that childhood abuse and trauma have a direct correlation to the development of addiction, with early sexual and emotional abuse being significant predictors of developing compulsive sexual behaviour in males.*

---`;
stats.ch8Data = replaceOnce(ch8Search, ch8Rep);

fs.writeFileSync(path, txt, 'utf8');
console.log("Stats: ", stats);
