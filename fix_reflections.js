const fs = require('fs');
const filePath = 'purposeful-builder/manuscript/the-boy-and-addictions.md';
let txt = fs.readFileSync(filePath, 'utf8');

// The misplaced blocks we want to move
const ref7 = `
#
---

### A Moment to Build (Reflection)

**The Deafening Aftermath**
The aftermath is where most men stay the longest. This reflection is about what you have been living with.

**Questions to Ask Yourself:**
1. What has the aftermath of your addiction cost you — in your relationship with your family, your sense of yourself, your ability to focus and build?
2. Have you made promises you genuinely meant and then broken them? What did it feel like, in the moment of breaking them, to realise the promise was not holding?
3. Is there someone in your life who has gone quiet whose silence you are still carrying? What would it mean to address that?

**A Builder's Prayer:**
*God, I have made promises I could not keep. I meant them. I want You to know I meant them. But meaning them was not enough, and I am standing in the wreckage of that. I am not asking You to pretend the promises held. I am asking You to meet me in the aftermath — in the silence and the shame — and to begin showing me the way out of it. Amen.*

**One step:** Write a letter to yourself — not to anyone else, just to yourself — describing honestly what the aftermath has looked like. What has it cost you? What has it done to the people you love? Keep it. Read it again in thirty days. The honesty of this moment is something worth returning to.
`;

const ref8 = `
#
---

### A Moment to Build (Reflection)

**The Hunger Behind the Habit**
You have been feeding something. This reflection is about naming what it actually is.

**Questions to Ask Yourself:**
1. When you trace your habit back as far as it will go — before the first exposure, before the first craving — what do you find? What was missing, or what happened, that created the space the habit moved into?
2. What does the addiction give you — what feeling, what relief, what sense of power or comfort — that you have not been able to find anywhere else?
3. What would it mean to have that need met legitimately — by God, by community, by a relationship that did not require you to hide?

**A Builder's Prayer:**
*God, I have been hungry for something real and I have been feeding myself on things that cannot satisfy. Show me what I am actually looking for. Not the habit — underneath the habit. I believe You are the answer to the hunger I have been trying to fill with everything else. Help me to believe it deeply enough to stop reaching for the counterfeit. Amen.*

**One step:** Complete this sentence honestly, in writing: "When I go back to the habit, what I am really looking for is _____." Do not answer with the name of the habit. Answer with the feeling or the need underneath it. That sentence, completed honestly, is the beginning of a diagnosis that can actually lead somewhere.
`;

const ref11 = `
#
---

### A Moment to Build (Reflection)

**Rewiring the Man (The Slow Work of Grace)**
Freedom is a process of rewiring, not a one-time event. This reflection is about committing to the long haul.

**Questions to Ask Yourself:**
1. Where are you currently the most impatient with your own healing process? Are you expecting a ten-year habit to disappear in ten days?
2. Which of the three battlegrounds (The Physical, The Digital, The Mental) is currently your weakest point?
3. What does "grace" mean to you when you fall down? Does it mean giving up, or does it mean getting back up immediately?

**A Builder's Prayer:**
*God, I want the quick fix, but You are offering me a lasting transformation. Give me the patience to endure the slow work of grace. When I fall, give me the strength to stand back up without wallowing in shame. Help me to build new pathways in my mind, day by day, step by step, trusting that You are with me in the slow process of becoming free. Amen.*

**One step:** Choose one specific battleground (Physical, Digital, or Mental) and set up one firm boundary today. It could be moving your phone charger out of your bedroom, installing a blocker, or changing your route home. Action is the language of rewiring.
`;

// Remove the blocks from the file
txt = txt.replace(ref7, '');
txt = txt.replace(ref8, '');
txt = txt.replace(ref11, '');

// Now we need to insert them at the correct locations
// ref7 goes right before '# Part 3: The Anatomy of the Trap'
txt = txt.replace('# Part 3: The Anatomy of the Trap', ref7 + '\n# Part 3: The Anatomy of the Trap');

// ref8 goes right before '# Part 4: The Climb Out (How we get free)'
txt = txt.replace('# Part 4: The Climb Out (How we get free)', ref8 + '\n# Part 4: The Climb Out (How we get free)');

// ref11 goes right before '# Part 5: The Charge'
txt = txt.replace('# Part 5: The Charge', ref11 + '\n# Part 5: The Charge');

fs.writeFileSync(filePath, txt, 'utf8');
console.log('Fixed reflections!');
