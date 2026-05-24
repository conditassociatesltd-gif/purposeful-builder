# The Purposeful Builder — Austin Okechukwu

A static blog built with Next.js, MDX, and deployed on Cloudflare Pages.

## Tech Stack
- **Next.js** (static export)
- **MDX** for essay writing
- **gray-matter** for frontmatter parsing
- **next-mdx-remote** for MDX rendering
- **rehype-pretty-code + shiki** for code syntax highlighting
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Cloudflare Pages** for free hosting

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Writing a New Essay

1. Create a new file in `content/essays/your-essay-slug.mdx`
2. Add frontmatter at the top:

```mdx
---
title: "Your Essay Title"
date: "2026-05-22"
category: "Identity"
excerpt: "A short one-sentence summary of the essay."
featured: false
---

Your essay content goes here in plain Markdown...
```

3. Save the file — it auto-appears on the site instantly during dev
4. To publish: `git add . && git commit -m "new essay" && git push`
5. Cloudflare auto-deploys within ~2 minutes

## Categories
Identity · Faith · Purpose · Masculinity · Building · Wealth

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Go to Cloudflare Dashboard → Workers & Pages → Create → Pages
3. Connect GitHub, select this repo
4. Set:
   - **Build command:** `npm run build`
   - **Output directory:** `out`
5. Click Save & Deploy

Every `git push` auto-deploys from then on.
