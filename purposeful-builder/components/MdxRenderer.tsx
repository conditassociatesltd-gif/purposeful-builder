import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import {
  StatRow,
  Stat,
  PullQuote,
  SectionLabel,
  StoryCard,
  PlotOptions,
} from "@/components/RichPostComponents";

const options = {
  rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
};

const components = {
  StatRow,
  Stat,
  PullQuote,
  SectionLabel,
  StoryCard,
  PlotOptions,
};

export default function MdxRenderer({ content }: { content: string }) {
  return (
    <div className="essay-content">
      {/* @ts-expect-error Server Component */}
      <MDXRemote source={content} components={components} options={options} />
    </div>
  );
}