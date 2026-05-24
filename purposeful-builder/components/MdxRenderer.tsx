import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

const options = {
  rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
};

export default function MdxRenderer({ content }: { content: string }) {
  return (
    <div className="essay-content">
      {/* @ts-expect-error Server Component */}
      <MDXRemote source={content} options={options} />
    </div>
  );
}