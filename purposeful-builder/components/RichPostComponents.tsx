"use client";

// ─── Stat Row ────────────────────────────────────────────────────────────────
export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "16px",
      margin: "2.5rem 0",
    }}>
      {children}
    </div>
  );
}

export function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--peach)",
      borderRadius: "12px",
      padding: "24px 20px",
      textAlign: "center",
    }}>
      <div style={{
        fontFamily: "serif",
        fontSize: "2.4rem",
        fontWeight: 700,
        color: "var(--rust)",
        lineHeight: 1,
        marginBottom: "8px",
      }}>
        {number}
      </div>
      <div style={{
        fontSize: "11px",
        fontWeight: 600,
        color: "var(--ink)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        opacity: 0.55,
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── Pull Quote ───────────────────────────────────────────────────────────────
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      margin: "3rem 0",
      padding: "0",
      textAlign: "center",
    }}>
      <div style={{
        width: "48px",
        height: "2px",
        background: "var(--rust)",
        margin: "0 auto 24px",
      }} />
      <blockquote style={{
        fontFamily: "serif",
        fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)",
        fontStyle: "italic",
        color: "var(--ink)",
        lineHeight: 1.45,
        margin: 0,
        padding: 0,
        border: "none",
      }}>
        {children}
      </blockquote>
      <div style={{
        width: "48px",
        height: "2px",
        background: "var(--rust)",
        margin: "24px auto 0",
      }} />
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      display: "inline-block",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--rust)",
      marginBottom: "20px",
      paddingBottom: "6px",
      borderBottom: "2px solid var(--rust)",
    }}>
      {children}
    </p>
  );
}

// ─── Story Card ───────────────────────────────────────────────────────────────
export function StoryCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--peach)",
      borderLeft: "4px solid var(--rust)",
      borderRadius: "0 12px 12px 0",
      padding: "28px 32px",
      margin: "2rem 0",
    }}>
      {children}
    </div>
  );
}

// ─── Plot Options ─────────────────────────────────────────────────────────────
export function PlotOptions() {
  const options = [
    { size: "150", desc: "A viable starter plot with room for a compact, well-designed home.", tag: "Entry Point" },
    { size: "180", desc: "Enough space for a 2-bedroom bungalow with a small garden.", tag: "Popular Size" },
    { size: "250", desc: "Comfortable for a 3-bedroom bungalow and two parking spaces.", tag: "Recommended" },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
      gap: "14px",
      margin: "2rem 0",
    }}>
      {options.map((o) => (
        <div key={o.size} style={{
          background: "var(--card)",
          border: "1.5px solid var(--peach)",
          borderRadius: "14px",
          padding: "20px 18px",
        }}>
          <div style={{
            fontFamily: "serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--ink)",
            lineHeight: 1,
          }}>
            {o.size}
          </div>
          <div style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--ink)",
            opacity: 0.5,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginTop: "2px",
          }}>
            sqm
          </div>
          <p style={{
            fontSize: "12px",
            color: "var(--ink)",
            opacity: 0.65,
            marginTop: "10px",
            lineHeight: 1.55,
            marginBottom: "10px",
          }}>
            {o.desc}
          </p>
          <span style={{
            display: "inline-block",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            background: "var(--soft-green)",
            color: "var(--rust-dark)",
            border: "1px solid var(--peach)",
            padding: "3px 8px",
            borderRadius: "100px",
            textTransform: "uppercase",
          }}>
            {o.tag}
          </span>
        </div>
      ))}
    </div>
  );
}
