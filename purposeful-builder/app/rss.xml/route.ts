import { getAllEssays } from "@/lib/essays";

export async function GET() {
  const essays = getAllEssays();
  const siteUrl = "https://austinokechukwu.com";

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <title>Austin Okechukwu — The Purposeful Builder</title>
      <link>${siteUrl}</link>
      <description>Writing for boys becoming men, men becoming whole, and builders learning that structure begins in silence.</description>
      <language>en</language>
      <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
      ${essays
        .map((essay) => {
          return `
        <item>
          <title><![CDATA[${essay.title}]]></title>
          <link>${siteUrl}/writing/${essay.slug}</link>
          <guid isPermaLink="true">${siteUrl}/writing/${essay.slug}</guid>
          <pubDate>${new Date(essay.date).toUTCString()}</pubDate>
          <description><![CDATA[<p>${essay.excerpt}</p><p><a href="${siteUrl}/writing/${essay.slug}">Read the full essay here...</a></p>]]></description>
        </item>`;
        })
        .join("")}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
