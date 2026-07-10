const fs = require('fs');
const path = 'C:/Users/ALIENWARE/Documents/GitHub/purposeful-builder/purposeful-builder/manuscript/the-boy-and-addictions.md';
let txt = fs.readFileSync(path, 'utf8');

// Helper to replace precisely once
function replaceOnce(search, replacement) {
    if (txt.includes(search)) {
        txt = txt.replace(search, replacement);
        return true;
    }
    return false;
}

const stats = {
    frontMatter: false,
    introStats: false,
    ch5Data: false,
    ch7Opening: false,
    ch8Data: false,
    ch11Reflection: false,
    epilogueBridge: false
};

// 1. Front Matter
const frontMatterText = `# Title Page
**THE BOY AND HIS ADDICTION**
*A Guide for the Boy Fighting Alone*

**Austin Okechukwu**
*The Purposeful Builder*

# Copyright
Copyright © 2026 Austin Okechukwu
Published by The Purposeful Builder

All rights reserved. No part of this book may be reproduced or transmitted in any form without written permission from the author, except for brief quotations in critical reviews or articles.

Scripture quotations are used for pastoral and educational purposes.

First Edition, 2026

# Dedication
*For the boy who thinks he is the only one.*
*You are not.*

`;
if (!txt.includes('# Title Page')) {
    txt = txt.replace('# Acknowledgments', frontMatterText + '# Acknowledgments');
    stats.frontMatter = true;
}

// 2. Intro Stats
const introTarget = 'Most addictions thrive in secrecy.';
const introStatsText = `Most addictions thrive in secrecy.

The struggle described in this book is not rare. Research shows that 93% of boys are exposed to internet pornography before the age of 18, with the average age of first exposure being 12 years old. That age is declining—among children surveyed in recent years, first exposure is occurring earlier than in previous generations. Around 11% of men identify as addicted to pornography, and most of them first encountered it as boys, before they had any framework for understanding what it would do to them. In Nigeria, the data on substance abuse tells a similar story: 1 in 7 Nigerians aged 15 to 64 are drug abusers, and research puts the prevalence of drug abuse among Nigerian youths and students as high as 20 to 40%. Globally, nearly 100 million adults may be struggling with problematic pornography use—and less than one percent of them ever seek help. That last figure is the one that matters most for this book. Not the scale of the problem, but the silence around it. Most boys carry this alone. This book exists because that does not have to be the way it ends.`;
stats.introStats = replaceOnce(introTarget, introStatsText);

// 3. Chapter 7 Opening
const ch7Target = 'The secret was out — not in a quiet, controlled way, but in the most humiliating way a secret can leave you.';
const ch7Replacement = `When I woke up on the parlor floor the morning after that Easter Sunday, my mind was entirely blank. I remembered the heat, I remembered the mixed cups of palm wine, Gulder, and Star, and I remembered stumbling away from the roadside cooler. But the hours between that moment and waking up in my own mess were completely gone. I lay there on the floor, my body physically shattered, trying to piece together how I had gotten home.

The secret was out — not in a quiet, controlled way, but in the most humiliating way a secret can leave you.`;
stats.ch7Opening = replaceOnce(ch7Target, ch7Replacement);

// 4. Chapter 11 Reflection
const ch11RefTarget = 'The Physical, The Digital, The Mental';
const ch11RefReplacement = 'what you feed your eyes, what you feed your mind, and what you do with your time and your body';
stats.ch11Reflection = replaceOnce(ch11RefTarget, ch11RefReplacement);

// 5. Epilogue Bridge
const epilogueTarget = 'To the older builders—our fathers, mentors, teachers, pastors, and every man raising a boy.';
const epilogueReplacement = 'So far, I have been speaking directly to the boy in the battle, but this final word is for the men who surround him.\n\nTo the older builders—our fathers, mentors, teachers, pastors, and every man raising a boy.';
stats.epilogueBridge = replaceOnce(epilogueTarget, epilogueReplacement);

// 6. Chapter 5 Data
const ch5Data = `> *Research note: A meta-analysis of 22 studies from seven countries found that consumption of pornography was significantly associated with increases in sexual aggression, both verbally and physically, among males.*\n\n`;
const ch5Target = `That hunger began looking for a physical release.`;
// Wait, I need to make sure I find a good place for it.
// Let's replace at the end of the paragraph talking about sexual spillover.
// Let's defer inserting Ch5 and Ch8 data until we verify the text context.

fs.writeFileSync(path, txt, 'utf8');
console.log("Stats: ", stats);
