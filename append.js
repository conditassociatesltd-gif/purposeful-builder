const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'purposeful-builder', 'manuscript', 'the-boy-and-addictions.md');
let content = fs.readFileSync(filePath, 'utf-8');

const epilogue = `
---
---

# Epilogue: A Word to the Men Raising Us

To the older builders—our fathers, mentors, teachers, pastors, and every man raising a boy.

I want to start by acknowledging the immense weight of the responsibility you carry. It is a difficult task to manage ourselves; it is profoundly harder to manage and mold younger versions of ourselves. Thank you for the work you have been doing. Thank you for building our families, our societies, and our companies, and for working so hard to transfer your knowledge to the young boys looking up to you.

But I am writing this to ask that you transfer that knowledge in a healthy way. 

Many of the boys reading this book are battling silent addictions—pornography, masturbation, drugs, alcohol. And beneath almost every one of these struggles, they are desperately seeking one thing: *presence*.

It is one thing to build a life or a society for people, but it is another thing entirely to show them that you care. One of the primary ways human beings interpret care is through emotional connection. I have worked with many boys, and when you harmonize everything they are saying, it comes down to this: they want an emotional connection. They want the presence of a father. 

There is a common saying that the building is not the church; the people are the church. The building exists merely to accommodate them. In the same way, the people you are building are your children. They need *you* far more than they need the things you provide for them. We often make the mistake of providing for everything—house rent, feeding, school fees—but we fail to give them our time. 

Sometimes, they just want to be expressive, but we shut them down. We tell them not to cry. We tell them to "man up." But when you constantly shut a boy down from expressing his emotions, what happens when he is molested or exposed to something dark? It becomes impossibly difficult for him to come to you to open up. 

My first plea to you is this: create an environment where these boys can be expressive. Connect with them emotionally. Give them a safe platform to tell you what is bothering them. 

My second plea is harder to say, but just as necessary. Many of these boys are going through trans-generational dysfunctions because the older generation did not deal with their own addictions. Some of these boys saw you drinking and thought it was what made a man. Some saw your browser history and thought it was normal. Some of them are simply relieving your life because you failed to work on yourself.

I want to encourage you to seek help for yourself, too. The knowledge in this book will help you get free just as much as it will help them. A man who is not battling an addiction will raise a boy who is not battling it. Please, deal with your own hidden struggles so that your boys do not find themselves emulating a compromised example. 

I am asking you to stay on these boys. Finish reading this book with them. Study it with them. Ask them questions—not from a place of judgment, but from the posture of a father who desperately wants to understand. Encourage them to speak up. There is a lot happening in our society right now. Boys are being molested and exposed to things that are breaking them. They want to talk. I cannot be there for every boy who reads this book, but *you* are there. 

To the pastors and church leaders: there is more we can do in the church. We need to talk to these boys not from a place of condemnation, but understanding. Not all sin is simply a result of knowing good and evil and willfully choosing evil; many of these boys are suffering from deep wounds that have hijacked their ability to properly choose. 

I struggled for years to open up to the pastors in my life because they did not create a room for it. We must create spaces in our churches where boys—and men—can open up about their emotional and psychological needs without fear of being crushed by judgment. When we address those emotional needs, these boys will do better. They will lead good lives and contribute positively to the church, to their marriages, and to society. I know that many church leaders are battling these things silently as well. Create the room for healing.

There is a whole lot going wrong with our society because builders have been distracted for far too long. But boys who are exposed to healing and guided out of the dark will become phenomenal leaders. 

Thank you once again for your labor. I am calling on you to partner with me. Help us raise these boys right. Mentor them, guide them, and start by leading a good, free life yourself. 

Thank you.
`;

fs.writeFileSync(filePath, content + epilogue, 'utf-8');
console.log('Epilogue appended successfully');
