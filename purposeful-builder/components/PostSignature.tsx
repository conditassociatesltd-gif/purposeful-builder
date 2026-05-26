import Link from "next/link";

export default function PostSignature() {
  return (
    <footer className="post-signature">
      <div className="post-signature__divider" aria-hidden="true" />

      <div className="post-signature__body">
        <p>
          If something here resonated with you, challenged you, or even
          unsettled you — I&apos;d genuinely like to hear your thoughts. Feel
          free to reply, disagree, ask questions, or share your own experience.
        </p>

        <p>
          And if these reflections speak to something deeper in you,{" "}
          <Link href="/#subscribe" className="post-signature__link">
            subscribe below
          </Link>
          . I&apos;ll continue writing honestly about faith, formation,
          masculinity, purpose, and the quiet process of becoming.
        </p>

        <div className="post-signature__author">
          <span className="post-signature__name">Austin Okechukwu</span>
          <span className="post-signature__title">The Purposeful Builder</span>
        </div>
      </div>

      <style>{`
        .post-signature {
          margin-top: 4rem;
        }

        .post-signature__divider {
          width: 3rem;
          height: 2px;
          background-color: currentColor;
          opacity: 0.2;
          margin-bottom: 2rem;
        }

        .post-signature__body {
          font-style: italic;
          opacity: 0.85;
        }

        .post-signature__body p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }

        .post-signature__link {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .post-signature__author {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          font-style: normal;
        }

        .post-signature__name {
          font-weight: 600;
        }

        .post-signature__title {
          opacity: 0.6;
          font-size: 0.9em;
        }
      `}</style>
    </footer>
  );
}
