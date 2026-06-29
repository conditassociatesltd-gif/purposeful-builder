const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'purposeful-builder', 'manuscript', 'the-boy-and-addictions.md');
let content = fs.readFileSync(filePath, 'utf-8');

// Acknowledgments (Insert before Book Outline)
const acknowledgments = `
# Acknowledgments

This book exists because of the grace of God, who is the ultimate Builder and the restorer of all broken things. I dedicate these pages to Him.

To every boy who has ever felt trapped, ashamed, or broken in silence: your courage inspired this work. You are the reason these words were written.

To the men, fathers, pastors, and mentors who stand in the gap, thank you for your labor of love. And to my publisher and editor, thank you for taking this raw vision and helping to refine it into a tool that will change lives. We have done great work here, and I am deeply grateful.
`;
content = content.replace('# Book Outline: The Boy and Addictions', acknowledgments + '\n# Book Outline: The Boy and Addictions');

// Intro Data
const introData = `The struggle described in this book is not rare. It is not the story of a few weak or broken boys. Research shows that 93% of boys are exposed to internet pornography before the age of 18, with the average age of first exposure being 12 years old. That age is declining — among children surveyed in 2023, first exposure occurred earlier than in cohorts surveyed even five years prior. Around 11% of men identify as addicted to pornography — and most of them first encountered it as boys, before they had any framework for understanding what it would do to them. In Nigeria, the data on substance abuse tells a similar story: 1 in 7 Nigerians aged 15 to 64 are drug abusers, and research puts the prevalence of drug abuse among Nigerian youths and students as high as 20 to 40%. Globally, nearly 100 million adults may be struggling with problematic pornography use — and less than one percent of them ever seek help. That last figure is the one that matters most for this book. Not the scale of the problem, but the silence around it. Most boys carry this alone. This book exists because that does not have to be the way it ends.`;
content = content.replace('Most boys carry this alone. This book exists because that does not have to be the way it ends.', introData);

// Chapter 1 Data
const ch1Data = `The average age of first exposure to pornography is 12 years old, and 15% of boys first encounter it at age 10 or younger.`;
content = content.replace('It almost always starts by accident.', `It almost always starts by accident. (In fact, the average age of first exposure to pornography is 12 years old, and 15% of boys first encounter it at age 10 or younger.)`);

// Chapter 3 Data
const ch3Data = `Adolescent brains are particularly susceptible to the dopamine-driven reinforcement that pornography provides, because the prefrontal cortex — the region responsible for impulse control and long-term planning — is not fully developed until the mid-twenties.`;
content = content.replace('Your brain is a remarkably efficient machine.', ch3Data + ' Your brain is a remarkably efficient machine.');

// Chapter 5 Data
const ch5Data = `A meta-analysis of 22 studies from seven countries found that consumption of pornography was significantly associated with increases in sexual aggression, both verbally and physically, among males.`;
content = content.replace('When you consume something that degrades human beings', ch5Data + ' When you consume something that degrades human beings');

// Chapter 8 Data
const ch8Data = `Research from the University of Georgia found that childhood abuse and trauma have a direct correlation to the development of addiction, with early sexual and emotional abuse being significant predictors of developing compulsive sexual behaviour in males.`;
content = content.replace('Addiction does not exist in a vacuum.', ch8Data + ' Addiction does not exist in a vacuum.');

// Reflections
const r1 = `
---

### A Moment to Build (Reflection)

**The First Exposure**
Before you turn the page, sit with these questions honestly.

**Questions to Ask Yourself:**
1. Do you remember your first exposure — the moment the door opened? What were the circumstances around it? Were you alone, bored, curious, or did someone introduce you to it?
2. Looking back, did you recognise at the time that something had shifted in you? Or did it only become clear later?
3. What did that first exposure teach you to reach for — and are you still reaching for it?

**A Builder's Prayer:**
*God, I bring the beginning of this to You. The moment the door opened, and every moment since that I have walked back through it. You were there when it started. You are here now. Help me to be honest enough to trace this back to where it began, because I cannot deal with what I will not name. Amen.*

**One step:** Write down, in one sentence, what your first exposure was and when it happened. You do not have to show it to anyone. But name it. Unnamed things have more power than they deserve.`;
content = content.replace('# Chapter 2: The Secret Life', r1 + '\n\n# Chapter 2: The Secret Life');

const r2 = `
---

### A Moment to Build (Reflection)

**The Secret Life**
You have been carrying something. This reflection is about what that carrying costs.

**Questions to Ask Yourself:**
1. How much of your daily mental energy goes into managing the secret — planning, hiding, recovering, promising?
2. Has the secret begun to organise your life around it — your schedule, your relationships, your access to devices? In what ways?
3. Who do you think you would be if you were not carrying this?

**A Builder's Prayer:**
*God, I am tired of carrying this alone. I did not plan to be here. But here I am, and I am asking You to show me what this secret has cost me — not to crush me with the weight of it, but so that I can finally understand what I have been protecting, and why it is not worth it. Amen.*

**One step:** For one day, notice every time the habit crosses your mind — every plan, every calculation, every moment of anxiety about being found out. Don't fight it. Just count it. By the end of the day, you will understand better than any argument could tell you how much of yourself this thing is using.`;
content = content.replace('# Chapter 3: The "New Sneaker" Effect', r2 + '\n\n# Chapter 3: The "New Sneaker" Effect');

const r3 = `
---

### A Moment to Build (Reflection)

**The "New Sneaker" Effect**
Your brain has been trained. This reflection is about beginning to understand the training.

**Questions to Ask Yourself:**
1. What are your specific triggers — the times, places, situations, or emotions that most reliably lead you toward the habit? Be as specific as you can.
2. When you imagine stopping, what does the resistance feel like? Where do you feel it — in your thoughts, in your body, in a specific kind of reasoning that talks you back in?
3. Have you ever confused the strength of a craving with a reason to give in? What would it mean to feel the craving fully and still choose differently?

**A Builder's Prayer:**
*God, I understand now that this is not just a moral failing. My brain has been rewired. I am asking You to begin the rewiring in the other direction — not just for the strength to resist, but for the wisdom that sees the craving for what it is and is not enslaved by it. Amen.*

**One step:** Write down your top three triggers — the specific conditions under which you are most vulnerable. Then write one practical change you can make to each environment. You are not solving the problem in one day. You are starting to understand its geography.`;
content = content.replace('# Chapter 4: The Silent Escalation', r3 + '\n\n# Chapter 4: The Silent Escalation');

const r4 = `
---

### A Moment to Build (Reflection)

**The Silent Escalation**
Escalation is gradual. This reflection is about locating where you currently are.

**Questions to Ask Yourself:**
1. Compare where you started with where you are now. What has changed — in frequency, in what you need to feel the same effect, in the risks you are willing to take?
2. Is there a line you have already crossed that you told yourself you would never cross? How did you talk yourself across it?
3. If the escalation continues on its current path, where will you be in one year? In five?

**A Builder's Prayer:**
*God, show me honestly where I am. Not where I was when this started, and not where I am afraid I am heading — where I actually am right now. I do not want to minimise it or exaggerate it. I want to see it clearly, so I can deal with it honestly. Amen.*

**One step:** Draw a simple timeline — where the habit started, the key moments of escalation, and where you are today. Looking at it as a line rather than a series of isolated events will show you something that is hard to see from the inside.`;
content = content.replace('# Chapter 5: The Spillover', r4 + '\n\n# Chapter 5: The Spillover');

const r5 = `
---

### A Moment to Build (Reflection)

**The Spillover**
Addiction never stays where it started. This reflection is about counting the cost.

**Questions to Ask Yourself:**
1. In what areas of your life outside the habit itself have you seen the effects — your relationships, your focus, the way you see people, your self-respect?
2. Has anyone else been affected by what you have been doing in private? Who, and how?
3. What version of yourself existed before the spillover began — and is that version still accessible to you?

**A Builder's Prayer:**
*God, I have told myself this only affects me. Help me to see honestly where it has spilled — into how I see people, how I treat them, and what I have become in the places where I thought nobody was watching. I am sorry for the damage. I am asking You to begin the repair. Amen.*

**One step:** Think of one person your habit has affected — even indirectly. You do not have to confront them or confess to them today. But acknowledge to yourself, honestly, that your private choices have had public consequences. That acknowledgment is the beginning of taking real responsibility.`;
content = content.replace('# Chapter 6: Spilling into the Light', r5 + '\n\n# Chapter 6: Spilling into the Light');

const r6 = `
---

### A Moment to Build (Reflection)

**Spilling into the Light**
Exposure is painful. But it is also a turning point. This reflection is about what the light revealed.

**Questions to Ask Yourself:**
1. Have you ever been caught or exposed — partially or fully? What happened, and how did you respond in that moment?
2. Looking back at that moment of exposure, do you see it differently now than you did then? What did it reveal about you that you needed to see?
3. What are you still hiding that has not yet come into the light — and what would it mean for your freedom if it did?

**A Builder's Prayer:**
*God, I know that You see everything I have done in the dark. I am not asking You to pretend otherwise. I am asking You to help me stop pretending. The exposure I feared so much — help me to see it as the beginning of something, not the end. You were not surprised by what the light revealed. Help me to stop being afraid of what You already know. Amen.*

**One step:** Identify one thing you are still hiding that is actively keeping you trapped. You do not have to tell anyone yet. But write it down in a private place — one honest sentence that names it without softening it. Bringing it from your thoughts into words, even on paper, is a step toward the light.`;
content = content.replace('# Chapter 7: The Deafening Aftermath', r6 + '\n\n# Chapter 7: The Deafening Aftermath');

const r7 = `
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

**One step:** Write a letter to yourself — not to anyone else, just to yourself — describing honestly what the aftermath has looked like. What has it cost you? What has it done to the people you love? Keep it. Read it again in thirty days. The honesty of this moment is something worth returning to.`;
content = content.replace('# Part 3: The Anatomy of the Trap', r7 + '\n\n# Part 3: The Anatomy of the Trap');

const r8 = `
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

**One step:** Complete this sentence honestly, in writing: "When I go back to the habit, what I am really looking for is _____." Do not answer with the name of the habit. Answer with the feeling or the need underneath it. That sentence, completed honestly, is the beginning of a diagnosis that can actually lead somewhere.`;
content = content.replace('# Part 4: The Climb Out (How we get free)', r8 + '\n\n# Part 4: The Climb Out (How we get free)');

const r9 = `
---

### A Moment to Build (Reflection)

**The Myth of the "Snap"**
You have been trying harder and wondering why it is not working. This reflection is about changing the strategy.

**Questions to Ask Yourself:**
1. How many times have you tried to stop through willpower alone? What has that looked like, and where has it always ended up?
2. Has bad theology — the idea that you should have been free by now, or that God is done with you — played a role in your discouragement? Where did that theology come from, and what did it cost you?
3. What would it mean to stop trying alone and to accept that this load was designed to be carried by more than one person?

**A Builder's Prayer:**
*God, I have been standing in the rain yelling at the clouds. I did not know that was what I was doing — I thought I was fighting. Help me to understand the difference between effort and strategy, between sincerity and wisdom. And help me to find the shelter You have already provided, instead of trying to build one out of willpower I was never designed to sustain alone. Amen.*

**One step:** Identify one person — one specific person — who you could potentially open up to about this struggle. You do not have to contact them today. But name them. The chapter ahead is about bringing it into the light. This is your preparation for that step.`;
content = content.replace('# Chapter 10: Bringing it to the Light', r9 + '\n\n# Chapter 10: Bringing it to the Light');

const r10 = `
---

### A Moment to Build (Reflection)

**Bringing it to the Light**
The secret loses its power when it loses its privacy. This reflection is about taking the hardest step.

**Questions to Ask Yourself:**
1. What is the deepest fear holding you back from telling someone about your struggle? Are you afraid of rejection, disappointment, or misunderstanding?
2. Think of a trusted mentor, friend, or leader in your life. What qualities do they have that make them a safe person to talk to?
3. If you were completely honest with that person today, how would it change your tomorrow?

**A Builder's Prayer:**
*God, I am terrified of the light. The darkness has felt safe for so long, even while it was destroying me. Give me the courage to open my mouth and speak the truth to someone who can help me carry this. I know that You are a God of grace, not a God of condemnation. Help me to trust that grace in the face of another human being. Amen.*

**One step:** Reach out to the person you named in the last chapter. You don't have to spill everything at once. Send a text or make a call and simply say, "I am struggling with something, and I need someone to talk to." That is the hardest part. The rest will follow.`;
content = content.replace('# Chapter 11: Rewiring the Man (The Slow Work of Grace)', r10 + '\n\n# Chapter 11: Rewiring the Man (The Slow Work of Grace)');

const r11 = `
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

**One step:** Choose one specific battleground (Physical, Digital, or Mental) and set up one firm boundary today. It could be moving your phone charger out of your bedroom, installing a blocker, or changing your route home. Action is the language of rewiring.`;
content = content.replace('# Part 5: The Charge', r11 + '\n\n# Part 5: The Charge');

const r12 = `
---

### A Moment to Build (Reflection)

**To the Boy Reading This (A Letter of Hope)**
You are a builder. This reflection is about picking up your tools and stepping into your purpose.

**Questions to Ask Yourself:**
1. When you look past the addiction and the struggle, what do you believe God has actually called you to build with your life?
2. How does the addiction directly sabotage that specific calling?
3. Who are the boys coming up behind you that need you to get free so you can show them the way out?

**A Builder's Prayer:**
*God, I hear You calling me a builder. For so long, I have felt like a demolition site. But I am ready to build. I am ready to step out of the prison and into the purpose You designed for me. Use my struggle, use my freedom, and use my life to pull others out of the dark. I am Yours. Amen.*

**One step:** Look at yourself in the mirror today and say out loud: "I am a builder. The prison gates are open, and I am walking out." Believe it. And then go build.`;
content = content.replace('# Epilogue: A Word to the Men Raising Us', r12 + '\n\n# Epilogue: A Word to the Men Raising Us');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Manuscript updated successfully!');
