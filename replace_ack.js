const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'purposeful-builder', 'manuscript', 'the-boy-and-addictions.md');
let content = fs.readFileSync(filePath, 'utf-8');

const oldAck = `# Acknowledgments

This book exists because of the grace of God, who is the ultimate Builder and the restorer of all broken things. I dedicate these pages to Him.

To every boy who has ever felt trapped, ashamed, or broken in silence: your courage inspired this work. You are the reason these words were written.

To the men, fathers, pastors, and mentors who stand in the gap, thank you for your labor of love. And to my publisher and editor, thank you for taking this raw vision and helping to refine it into a tool that will change lives. We have done great work here, and I am deeply grateful.`;

const newAck = `# Acknowledgments

After God, to whom I dedicate these pages, there are several people I must deeply thank for making this book a reality.

To my good friend, Dr. Winner Anebo. My journey out of pornography started when I finally opened up to you. You provided guidance, walked me through the darkest parts of the process, and over time, I have learned so much from your wealth of knowledge. Thank you.

To my spiritual father, Reverend David Ogbueli. Your deep work on dealing with rejection is what helped me get to the root of my own addiction. Because I stumbled upon your book, I was able to find healing from the root and navigate the rest of my healing journey. Coming into contact with Dominion City helped me build myself into the man I am today. Thank you for yielding to God so He could use you to do such a good work.

To my beautiful wife, Promise. Thank you for providing a peaceful environment for me to write this book. Writing this was not easy—it required a lot of time to process my thoughts, do the research, and write in a way that the boy child would truly understand. You provided that time, made sure our home was peaceful, and kept me on track. You have been amazing on this journey. Thank you.

To my Pastor. When I told you I was going to write this book, you encouraged me and gave me invaluable tips on how to go about it. It is rare to see people so genuinely interested in your growth, and you are one of them. Thank you, sir, for creating an environment that pushes us to explore and do the assignments God has given us. Even when we started the boys' mentorship, you were rooting for us. Thank you.

To my leader, Minister Chichi. You constantly expressed your excitement and encouragement for the work we are doing. I remember when I first wanted to start this project—you encouraged me from the very beginning and desperately wanted it to come to fruition because of your own passion for teenagers. Thank you so much for your unwavering support.

To my friends, Anthony and Dara. Thank you for putting your time and effort into reviewing the manuscript. I am so grateful for all you have done.

And finally, to all the men, fathers, pastors, and everyone who has contributed to my life. I am grateful for the work you are doing. We are all going to see the results that we pray and hope for. 

I am deeply grateful.`;

content = content.replace(oldAck, newAck);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Acknowledgments updated!');
