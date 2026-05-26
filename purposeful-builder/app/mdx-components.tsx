import type { MDXComponents } from "mdx/types";
import PostSignature from "@/components/PostSignature";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Preserve any custom components you already have
    ...components,

    // The `wrapper` key wraps every MDX file's rendered output.
    // PostSignature is injected here automatically — you never need to
    // type it manually inside any .mdx file.
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <>
        {children}
        <PostSignature />
      </>
    ),
  };
}
