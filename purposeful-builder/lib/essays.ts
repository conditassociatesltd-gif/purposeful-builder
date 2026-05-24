import fs from "fs";
import path from "path";
import matter from "gray-matter";

const essaysDirectory = path.join(process.cwd(), "content/essays");

export type Essay = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  heroImage?: string;
  readingTime?: string;
  featured?: boolean;
  content: string;
};
function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}
export function getAllEssays(): Essay[] {
  if (!fs.existsSync(essaysDirectory)) return [];
  
  const fileNames = fs.readdirSync(essaysDirectory);
  
  return fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(essaysDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "",
        category: data.category || "Essay",
        excerpt: data.excerpt || "",
        heroImage: data.heroImage || null,
        readingTime: data.readingTime || calculateReadingTime(content),
        featured: data.featured || false,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEssayBySlug(slug: string): Essay | undefined {
  return getAllEssays().find((e) => e.slug === slug);
}
