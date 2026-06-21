import fs from "fs";
import path from "path";
import matter from "gray-matter";

const podcastsDirectory = path.join(process.cwd(), "content/podcasts");

export type Podcast = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  duration: string;
  audioUrl: string;
  coverImage?: string;
  featured?: boolean;
  content: string;
  category?: string;
};

export function getAllPodcasts(): Podcast[] {
  if (!fs.existsSync(podcastsDirectory)) return [];
  
  const fileNames = fs.readdirSync(podcastsDirectory);
  
  return fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(podcastsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled Podcast",
        date: data.date || "",
        excerpt: data.excerpt || "",
        duration: data.duration || "0:00",
        audioUrl: data.audioUrl || "",
        coverImage: data.coverImage || null,
        featured: data.featured || false,
        category: data.category || "PODCAST",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPodcastBySlug(slug: string): Podcast | undefined {
  return getAllPodcasts().find((p) => p.slug === slug);
}
