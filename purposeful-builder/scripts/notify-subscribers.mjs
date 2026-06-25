import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

async function notifyAdmin(subject) {
  try {
    await fetch('https://formsubmit.co/ajax/hello@austinokechukwu.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        subject: "Action Required: New Essay Draft Created",
        message: `A new draft for your essay "${subject}" has been successfully created in Buttondown!\n\nLog in to your Buttondown dashboard to review it and click Send to blast it to your subscribers!`,
      }),
    });
    console.log("Admin notified via FormSubmit.");
  } catch (error) {
    console.error("Failed to notify admin via FormSubmit:", error);
  }
}

async function createDraft(file) {
  const fileContents = fs.readFileSync(file, 'utf8');
  const { data } = matter(fileContents);
  
  const title = data.title || "New Essay";
  const excerpt = data.excerpt || "";
  const slug = path.basename(file, '.mdx');
  const url = `https://austinokechukwu.com/writing/${slug}`;
  
  // Create Markdown body
  const body = `${excerpt}\n\n[Read the full essay here...](${url})`;

  const response = await fetch('https://api.buttondown.email/v1/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject: `New Essay: ${title}`,
      body: body,
      status: 'draft'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Buttondown API error:", errorText);
    process.exit(1);
  }

  const result = await response.json();
  console.log("Draft created in Buttondown!");
  
  await notifyAdmin(title);
}

async function run() {
  if (!BUTTONDOWN_API_KEY) {
    console.error("Error: BUTTONDOWN_API_KEY is not set.");
    process.exit(1);
  }

  const files = process.argv.slice(2);
  const essayFiles = files.filter(f => f.includes('content/essays/') && f.endsWith('.mdx'));
  
  if (essayFiles.length === 0) {
    console.log("No new essays detected in this push.");
    process.exit(0);
  }

  for (const file of essayFiles) {
    console.log(`Processing new essay: ${file}`);
    await createDraft(file);
  }
}

run();
