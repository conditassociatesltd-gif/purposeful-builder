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

const HeadingStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--rust)",
  marginTop: "2rem",
  marginBottom: "20px",
  paddingBottom: "6px",
  borderBottom: "2px solid var(--rust)",
  width: "auto",
};

const components = {
  StatRow,
  Stat,
  PullQuote,
  SectionLabel,
  StoryCard,
  PlotOptions,
  h2: ({ children, ...props }: any) => <h2 style={HeadingStyle} {...props}>{children}</h2>,
  h3: ({ children, ...props }: any) => <h3 style={HeadingStyle} {...props}>{children}</h3>,
};

export default function MdxRenderer({ content }: { content: string }) {
  return (
    <div className="essay-content">
      {/* @ts-expect-error Server Component */}
      <MDXRemote source={content} components={components} options={options} />
    </div>
  );
}