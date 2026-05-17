"use client";

import { useState, useEffect, useRef } from "react";

const CYAN = "#5BC8C8";
const CYAN_LIGHT = "rgba(91,200,200,0.10)";
const CYAN_BORDER = "rgba(91,200,200,0.25)";
const FONT = "var(--font-poppins), sans-serif";
const MONO = "var(--font-dm-mono), monospace";

function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(26px)",
        transition: `opacity 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function GlassCard({ children, style = {}, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.88)"
          : "rgba(255,255,255,0.62)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: `1px solid ${
          hovered ? "rgba(91,200,200,0.28)" : "rgba(255,255,255,0.9)"
        }`,
        borderRadius: 20,
        boxShadow: hovered
          ? "0 24px 64px rgba(91,200,200,0.11), 0 2px 0 rgba(255,255,255,1) inset"
          : "0 8px 32px rgba(0,0,0,0.05), 0 2px 0 rgba(255,255,255,1) inset",
        transform: hover ? (hovered ? "translateY(-3px)" : "translateY(0)") : "none",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CedarLogo({ size = 20 }) {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.5px",
        color: "#0a1414",
      }}
    >
      Cedar
    </span>
  );
}

function Label({ children, center = false }) {
  return (
    <div
      style={{
        fontFamily: FONT,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "2.8px",
        color: CYAN,
        textTransform: "uppercase",
        marginBottom: 18,
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Philosophy", "Roadmap", "Updates"];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, fontFamily: FONT }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px,4vw,52px)",
          height: 62,
          background: scrolled ? "rgba(255,255,255,0.84)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(91,200,200,0.1)" : "none",
          transition: "all 0.45s ease",
        }}
      >
        <CedarLogo size={19} />

        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#777",
                textDecoration: "none",
                transition: "color 0.2s",
                fontFamily: FONT,
              }}
              onMouseEnter={(e) => (e.target.style.color = CYAN)}
              onMouseLeave={(e) => (e.target.style.color = "#777")}
            >
              {item}
            </a>
          ))}
          <div
            style={{
              background: CYAN_LIGHT,
              border: `1px solid ${CYAN_BORDER}`,
              color: CYAN,
              padding: "7px 18px",
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: FONT,
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: CYAN,
                animation: "pulse 2.2s infinite",
              }}
            />
            In Development
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: "#333",
            fontSize: 20,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(91,200,200,0.1)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontFamily: FONT,
          }}
        >
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, fontWeight: 600, color: "#333", textDecoration: "none" }}
            >
              {item}
            </a>
          ))}
          <div
            style={{
              background: CYAN_LIGHT,
              border: `1px solid ${CYAN_BORDER}`,
              color: CYAN,
              padding: "10px 20px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: CYAN,
                animation: "pulse 2.2s infinite",
              }}
            />
            In Development
          </div>
        </div>
      )}
    </nav>
  );
}

function OsPreview() {
  const files = [
    { name: "Assets", type: "folder" },
    { name: "Drafts", type: "folder" },
    { name: "Archive", type: "folder" },
    { name: "Spec.pdf", type: "doc" },
    { name: "Screenshots", type: "folder" },
  ];
  const dock = [
    { icon: "📁", active: true },
    { icon: "🌐", active: false },
    { icon: "⚙️", active: false },
    { icon: "⌨️", active: false },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 860,
        margin: "0 auto",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 48px 100px rgba(0,0,0,0.11), 0 0 0 1px rgba(91,200,200,0.13)",
        background: "linear-gradient(145deg, #edfbfb 0%, #f6fefe 55%, #ffffff 100%)",
        fontFamily: FONT,
      }}
    >
      {/* Menu Bar */}
      <div
        style={{
          height: 32,
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#0a1414",
              fontFamily: FONT,
              letterSpacing: "-0.3px",
            }}
          >
            Cedar
          </span>
          {["File", "Edit", "View", "Go"].map((item, i) => (
            <span
              key={item}
              style={{
                fontSize: 11,
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? CYAN : "#888",
                cursor: "default",
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: CYAN }}>⌕</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: CYAN }}>▮▮▮</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#444", letterSpacing: "-0.2px" }}>
            10:42 AM
          </span>
        </div>
      </div>

      {/* Desktop */}
      <div
        style={{
          position: "relative",
          height: "clamp(320px,46vw,460px)",
          padding: "clamp(10px,1.8vw,16px) clamp(10px,1.8vw,16px) 70px",
        }}
      >
        {/* File Manager Window */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(40px) saturate(200%)",
            WebkitBackdropFilter: "blur(40px) saturate(200%)",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.92)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.055), 0 1px 0 rgba(255,255,255,1) inset",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.54)",
              borderBottom: "1px solid rgba(0,0,0,0.038)",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {[
                "rgba(255,95,87,0.9)",
                "rgba(254,188,46,0.9)",
                "rgba(40,200,64,0.9)",
              ].map((c, i) => (
                <div
                  key={i}
                  style={{ width: 11, height: 11, borderRadius: "50%", background: c }}
                />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 11 }}>📁</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#555" }}>Resources</span>
            </div>
            <div style={{ width: 44 }} />
          </div>

          {/* Toolbar */}
          <div
            style={{
              height: 34,
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: 10,
              borderBottom: "1px solid rgba(0,0,0,0.032)",
            }}
          >
            {["‹", "›"].map((a, i) => (
              <span key={i} style={{ fontSize: 14, color: "#ccc", fontWeight: 700 }}>
                {a}
              </span>
            ))}
            <div
              style={{
                flex: 1,
                background: "rgba(235,235,240,0.7)",
                border: "1px solid rgba(210,210,215,0.5)",
                borderRadius: 7,
                padding: "2px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span style={{ fontSize: 9, color: "#ccc" }}>📁</span>
              <span style={{ fontSize: 10, color: "#aaa", fontFamily: MONO }}>
                Desktop / Projects / Resources
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["⊞", "☰", "⌕"].map((ic, i) => (
                <span
                  key={i}
                  style={{ fontSize: 12, color: i === 0 ? CYAN : "#ccc", fontWeight: 600 }}
                >
                  {ic}
                </span>
              ))}
            </div>
          </div>

          {/* Files grid */}
          <div
            style={{
              flex: 1,
              padding: "clamp(12px,2vw,18px) clamp(14px,2.5vw,22px)",
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(10px,2vw,20px)",
              alignContent: "flex-start",
            }}
          >
            {files.map((f) => (
              <div
                key={f.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                  cursor: "default",
                  width: "clamp(48px,7.5vw,62px)",
                }}
              >
                <div
                  style={{
                    width: "clamp(40px,6.5vw,52px)",
                    height: "clamp(40px,6.5vw,52px)",
                    borderRadius: 13,
                    background:
                      f.type === "folder" ? CYAN_LIGHT : "rgba(232,232,238,0.6)",
                    border: `1px solid ${
                      f.type === "folder" ? CYAN_BORDER : "rgba(200,200,205,0.4)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(17px,3vw,23px)",
                  }}
                >
                  {f.type === "folder" ? "📁" : "📄"}
                </div>
                <span
                  style={{
                    fontSize: "clamp(8px,1.1vw,10px)",
                    color: "#666",
                    fontWeight: 500,
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {f.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dock */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.95)",
            borderRadius: 16,
            padding: "6px 14px",
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
            boxShadow: "0 8px 32px rgba(0,0,0,0.065), 0 1px 0 rgba(255,255,255,1) inset",
          }}
        >
          {dock.map((d, i) => (
            <div
              key={i}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: d.active ? CYAN_LIGHT : "rgba(246,246,248,0.9)",
                  border: d.active
                    ? `1px solid ${CYAN_BORDER}`
                    : "1px solid rgba(218,218,222,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  boxShadow: d.active
                    ? "0 2px 10px rgba(91,200,200,0.18)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {d.icon}
              </div>
              {d.active && (
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: CYAN,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RamBar({ label, value, max, delay }) {
  const [ref, visible] = useScrollReveal();
  const pct = (value / max) * 100;
  const isCedar = label === "Cedar";
  return (
    <div ref={ref} style={{ marginBottom: 26 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 9,
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: isCedar ? 700 : 500,
            color: isCedar ? CYAN : "#666",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 12,
            color: isCedar ? CYAN : "#aaa",
            fontWeight: isCedar ? 700 : 400,
          }}
        >
          ~{value}mb
        </span>
      </div>
      <div
        style={{
          height: 5,
          background: "rgba(0,0,0,0.05)",
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: visible ? `${pct}%` : "0%",
            background: isCedar
              ? `linear-gradient(90deg, ${CYAN}, rgba(91,200,200,0.4))`
              : "rgba(0,0,0,0.1)",
            borderRadius: 100,
            transition: `width 1.3s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
            boxShadow: isCedar ? "0 0 12px rgba(91,200,200,0.3)" : "none",
          }}
        />
      </div>
    </div>
  );
}

export default function CedarSite() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div style={{ fontFamily: FONT, minHeight: "100vh", overflowX: "hidden" }}>
      {/* Ambient glow */}
      <div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,200,200,0.065) 0%, transparent 70%)",
          left: mousePos.x - 280,
          top: mousePos.y - 280,
          transition: "left 1s ease, top 1s ease",
        }}
      />

      <Nav />

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding:
            "clamp(100px,14vw,140px) clamp(20px,5vw,48px) clamp(64px,8vw,100px)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute", top: "10%", left: "4%",
            width: 360, height: 360, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(91,200,200,0.08), transparent 70%)",
            filter: "blur(50px)", pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "14%", right: "5%",
            width: 260, height: 260, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(91,200,200,0.065), transparent 70%)",
            filter: "blur(38px)", pointerEvents: "none",
          }}
        />

        {/* Status badge */}
        <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.1s forwards" }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: CYAN_LIGHT, border: `1px solid ${CYAN_BORDER}`,
              borderRadius: 100, padding: "6px 18px", marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: CYAN, animation: "pulse 2.2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: FONT, fontSize: 11, fontWeight: 600,
                color: CYAN, letterSpacing: "0.7px", textTransform: "uppercase",
              }}
            >
              Phase 1 — Research and Design
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.28s forwards" }}>
          <h1
            style={{
              fontFamily: FONT,
              fontSize: "clamp(36px,7vw,88px)",
              fontWeight: 800,
              letterSpacing: "clamp(-1.5px,-0.035em,-3.5px)",
              lineHeight: 1.08,
              color: "#0a1414",
              margin: "0 0 30px",
              maxWidth: 920,
            }}
          >
            The best operating
            <br />
            system hasn't been
            <br />
            <span style={{ color: CYAN }}>made yet.</span>
          </h1>
        </div>

        {/* Subline */}
        <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.44s forwards" }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(15px,1.8vw,18px)",
              lineHeight: 1.82,
              color: "#6a7a7a",
              maxWidth: 500,
              margin: "0 auto 52px",
              fontWeight: 400,
            }}
          >
            A Linux-based OS built around one idea: a computer should disappear.
            Light enough to run on hardware others gave up on. Considered enough
            to feel like nothing else.
          </p>
        </div>

        {/* Under construction note */}
        <div
          style={{ opacity: 0, animation: "fadeUp 1s ease 0.58s forwards", marginBottom: 80 }}
        >
          <GlassCard
            style={{ padding: "14px 28px", display: "inline-flex", alignItems: "center", gap: 10 }}
            hover={false}
          >
            <div
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: CYAN, animation: "pulse 2.2s infinite", flexShrink: 0,
              }}
            />
            <span
              style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: "#5a6a6a" }}
            >
              Currently under active development. Nothing to see here yet.
            </span>
          </GlassCard>
        </div>

        {/* OS Preview */}
        <div
          style={{
            opacity: 0, animation: "fadeUp 1.1s ease 0.76s forwards",
            width: "100%", maxWidth: 880,
          }}
        >
          <OsPreview />
        </div>
      </section>

      {/* The Problem */}
      <section
        style={{
          padding: "clamp(80px,12vw,140px) clamp(20px,5vw,48px)",
          maxWidth: 820, margin: "0 auto",
        }}
      >
        <Reveal><Label>The Problem</Label></Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: FONT,
              fontSize: "clamp(26px,4vw,52px)", fontWeight: 800,
              letterSpacing: "clamp(-1px,-0.028em,-2px)",
              color: "#0a1414", lineHeight: 1.14, marginBottom: 32,
            }}
          >
            Linux is free. Linux is powerful.
            <br />
            <span style={{ color: "#c0caca", fontWeight: 500 }}>
              Your parents still cannot use it.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: FONT, fontSize: "clamp(14px,1.6vw,17px)",
              lineHeight: 1.9, color: "#6a7a7a", marginBottom: 22, fontWeight: 400,
            }}
          >
            Every year someone releases another Ubuntu reskin and calls it "Linux for
            everyone." It boots into a desktop that looks vaguely familiar, uses 600mb
            of RAM doing nothing, and the moment something breaks you are staring at a
            terminal wondering what went wrong.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p
            style={{
              fontFamily: FONT, fontSize: "clamp(14px,1.6vw,17px)",
              lineHeight: 1.9, color: "#6a7a7a", marginBottom: 44, fontWeight: 400,
            }}
          >
            This is not a Linux problem. This is a philosophy problem. The people
            building Linux distros are building for themselves, not for the person who
            just wants to open a browser, write a document, and have their computer
            stay out of the way.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <GlassCard
            style={{ padding: "clamp(20px,3vw,28px) clamp(24px,4vw,36px)", display: "inline-block" }}
          >
            <p
              style={{
                fontFamily: FONT, fontSize: "clamp(16px,1.8vw,21px)",
                fontWeight: 700, color: "#0a1414", margin: 0, lineHeight: 1.5,
              }}
            >
              "This project exists to fix that."
            </p>
          </GlassCard>
        </Reveal>
      </section>

      {/* Philosophy */}
      <section
        id="philosophy"
        style={{
          padding: "clamp(80px,12vw,140px) clamp(20px,5vw,48px)",
          background: "rgba(91,200,200,0.022)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><Label center>The Philosophy</Label></Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(26px,4vw,52px)", fontWeight: 800,
                letterSpacing: "clamp(-1px,-0.028em,-2px)",
                color: "#0a1414", textAlign: "center",
                marginBottom: "clamp(44px,6vw,76px)",
              }}
            >
              Four rules that govern
              <br />
              every decision.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,230px), 1fr))",
              gap: "clamp(14px,2vw,20px)",
            }}
          >
            {[
              {
                n: "01",
                title: "If it needs a manual, it's broken.",
                body: "A feature that requires explanation is a feature that requires redesign. Complexity is a failure, not a feature.",
              },
              {
                n: "02",
                title: "RAM is not yours to waste.",
                body: "Every megabyte used is a choice. Every background process is a decision. This OS treats system resources like they belong to the user, because they do.",
              },
              {
                n: "03",
                title: "Beauty and speed are not opposites.",
                body: "The assumption that a fast OS has to look bad is lazy thinking. Optimization and aesthetics solve the same problem from different directions: remove everything that should not be there.",
              },
              {
                n: "04",
                title: "Linux should be for everyone.",
                body: "Not just people who think it should be for everyone. The Linux community loves talking about accessibility. Cedar is trying to actually do it.",
              },
            ].map((rule, i) => (
              <Reveal key={rule.n} delay={i * 0.09}>
                <GlassCard
                  style={{ padding: "clamp(22px,3vw,32px)", height: "100%", boxSizing: "border-box" }}
                >
                  <div
                    style={{
                      fontFamily: FONT, fontSize: 10, fontWeight: 700,
                      color: CYAN, letterSpacing: "2.5px", marginBottom: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    {rule.n}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT, fontSize: "clamp(13px,1.3vw,15px)",
                      fontWeight: 700, color: "#0a1414", lineHeight: 1.45, marginBottom: 12,
                    }}
                  >
                    {rule.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT, fontSize: "clamp(12px,1.2vw,13px)",
                      lineHeight: 1.82, color: "#7a8a8a", fontWeight: 400,
                    }}
                  >
                    {rule.body}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Benchmark */}
      <section
        style={{
          padding: "clamp(80px,12vw,140px) clamp(20px,5vw,48px)",
          maxWidth: 700, margin: "0 auto",
        }}
      >
        <Reveal><Label>The Benchmark</Label></Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: FONT,
              fontSize: "clamp(26px,4vw,50px)", fontWeight: 800,
              letterSpacing: "clamp(-1px,-0.028em,-2px)",
              color: "#0a1414", marginBottom: 16,
            }}
          >
            Under 100mb at idle.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: FONT, fontSize: "clamp(14px,1.5vw,16px)",
              color: "#7a8a8a", lineHeight: 1.82, marginBottom: 52, fontWeight: 400,
            }}
          >
            That is not a benchmark. That is a design constraint. Every decision gets
            made through that lens.
          </p>
        </Reveal>
        <GlassCard
          style={{ padding: "clamp(28px,4vw,44px) clamp(24px,5vw,48px)" }}
          hover={false}
        >
          {[
            { label: "GNOME", value: 800 },
            { label: "KDE Plasma", value: 400 },
            { label: "XFCE", value: 250 },
            { label: "Cedar", value: 100 },
          ].map((item, i) => (
            <RamBar
              key={item.label}
              label={item.label}
              value={item.value}
              max={800}
              delay={i * 0.14}
            />
          ))}
        </GlassCard>
      </section>

      {/* Why Now */}
      <section
        style={{
          padding: "clamp(80px,12vw,140px) clamp(20px,5vw,48px)",
          background: "rgba(91,200,200,0.022)",
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Reveal><Label center>Why Now</Label></Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(26px,4vw,52px)", fontWeight: 800,
                letterSpacing: "clamp(-1px,-0.028em,-2px)",
                color: "#0a1414", textAlign: "center",
                marginBottom: "clamp(40px,6vw,68px)",
              }}
            >
              Three things finally
              <br />
              make this possible.
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px,1.5vw,16px)" }}>
            {[
              {
                title: "Wayland has matured.",
                body: "For years Wayland was the future that never arrived. It has arrived. The compositor architecture it enables is what makes a truly lightweight, modern desktop possible without the baggage of X11.",
                icon: "◈",
              },
              {
                title: "Lightweight compositors proved it works.",
                body: "Projects like Hyprland and Sway demonstrated that you can have a beautiful, modern desktop experience at a fraction of the resource cost of GNOME or KDE. The foundation exists.",
                icon: "◇",
              },
              {
                title: "Hardware is everywhere.",
                body: "Millions of old laptops sit unused because Windows got too heavy and Linux got too complicated. Cedar wants to run on that hardware and make it feel new again.",
                icon: "◉",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <GlassCard
                  style={{
                    padding: "clamp(22px,3vw,32px) clamp(20px,3.5vw,36px)",
                    display: "flex",
                    gap: "clamp(16px,2.5vw,24px)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: CYAN_LIGHT, border: `1px solid ${CYAN_BORDER}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, color: CYAN,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: FONT, fontSize: "clamp(14px,1.5vw,16px)",
                        fontWeight: 700, color: "#0a1414", marginBottom: 8, lineHeight: 1.4,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT, fontSize: "clamp(13px,1.2vw,14px)",
                        lineHeight: 1.82, color: "#7a8a8a", fontWeight: 400,
                      }}
                    >
                      {item.body}
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section
        id="roadmap"
        style={{
          padding: "clamp(80px,12vw,140px) clamp(20px,5vw,48px)",
          maxWidth: 800, margin: "0 auto",
        }}
      >
        <Reveal><Label>Roadmap</Label></Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: FONT,
              fontSize: "clamp(26px,4vw,52px)", fontWeight: 800,
              letterSpacing: "clamp(-1px,-0.028em,-2px)",
              color: "#0a1414", marginBottom: 14,
            }}
          >
            Honest. Not a marketing roadmap.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: FONT, fontSize: "clamp(14px,1.5vw,16px)",
              color: "#7a8a8a", lineHeight: 1.82,
              marginBottom: "clamp(40px,6vw,64px)", fontWeight: 400,
            }}
          >
            An actual plan.
          </p>
        </Reveal>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute", left: 21, top: 0, bottom: 0, width: 1,
              background: `linear-gradient(to bottom, ${CYAN}, rgba(91,200,200,0.05))`,
            }}
          />
          {[
            {
              phase: "Phase 1", title: "Research and Design", status: "current",
              items: [
                "Define compositor stack",
                "Design language and UI principles",
                "Benchmark existing lightweight solutions",
                "Document every architectural decision",
              ],
            },
            {
              phase: "Phase 2", title: "Core Shell", status: "next",
              items: [
                "Wayland compositor selection and configuration",
                "Custom panel and launcher",
                "Hit the 100mb target with basic desktop running",
              ],
            },
            {
              phase: "Phase 3", title: "User Experience Layer", status: "later",
              items: [
                "Settings that normal people can understand",
                "App ecosystem curation",
                "Installation process that does not require a tutorial",
              ],
            },
            {
              phase: "Phase 4", title: "Public Alpha", status: "later",
              items: [
                "Open for testing",
                "Feedback from real non-technical users",
                "Not just developers telling each other it is good",
              ],
            },
          ].map((phase, i) => (
            <Reveal key={phase.phase} delay={i * 0.1}>
              <div
                style={{
                  display: "flex",
                  gap: "clamp(16px,3vw,30px)",
                  marginBottom: "clamp(26px,4vw,46px)",
                }}
              >
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <div
                    style={{
                      width: 42, height: 42, borderRadius: "50%",
                      background: phase.status === "current" ? CYAN : "rgba(255,255,255,0.9)",
                      border: `2px solid ${phase.status === "current" ? CYAN : "rgba(91,200,200,0.2)"}`,
                      backdropFilter: "blur(10px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: phase.status === "current" ? "0 0 20px rgba(91,200,200,0.32)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT, fontSize: 13, fontWeight: 800,
                        color: phase.status === "current" ? "white" : "#ccc",
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                </div>
                <GlassCard
                  style={{ flex: 1, padding: "clamp(18px,2.5vw,26px) clamp(18px,3vw,28px)" }}
                >
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      marginBottom: 10, flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT, fontSize: 10, fontWeight: 700,
                        color: CYAN, textTransform: "uppercase", letterSpacing: "1.8px",
                      }}
                    >
                      {phase.phase}
                    </span>
                    {phase.status === "current" && (
                      <span
                        style={{
                          fontFamily: FONT, fontSize: 9, fontWeight: 700,
                          color: "white", background: CYAN,
                          padding: "2px 10px", borderRadius: 100, letterSpacing: "0.5px",
                        }}
                      >
                        Active
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT, fontSize: "clamp(14px,1.5vw,17px)",
                      fontWeight: 700, color: "#0a1414", marginBottom: 12,
                    }}
                  >
                    {phase.title}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {phase.items.map((item) => (
                      <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: CYAN, fontSize: 11, marginTop: 4, flexShrink: 0 }}>
                          →
                        </span>
                        <span
                          style={{
                            fontFamily: FONT, fontSize: "clamp(12px,1.2vw,13px)",
                            color: "#7a8a8a", lineHeight: 1.65, fontWeight: 400,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Updates */}
      <section
        id="updates"
        style={{
          padding: "clamp(80px,12vw,140px) clamp(20px,5vw,48px)",
          background: "rgba(91,200,200,0.022)",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <Reveal><Label center>Built in the Open</Label></Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(26px,4vw,52px)", fontWeight: 800,
                letterSpacing: "clamp(-1px,-0.028em,-2px)",
                color: "#0a1414", marginBottom: 22,
              }}
            >
              Every decision, documented.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              style={{
                fontFamily: FONT, fontSize: "clamp(14px,1.6vw,17px)",
                lineHeight: 1.9, color: "#6a7a7a", marginBottom: 52, fontWeight: 400,
              }}
            >
              Not just what was chosen, but why. What was tried and failed. What the
              tradeoffs were. If this works, others should be able to understand how.
              If it fails, others should be able to learn from it.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <GlassCard
              style={{ padding: "clamp(32px,5vw,52px) clamp(24px,4vw,44px)", marginBottom: 20 }}
              hover={false}
            >
              <div style={{ fontSize: 26, marginBottom: 18, opacity: 0.4 }}>⟐</div>
              <div
                style={{
                  fontFamily: FONT, fontSize: "clamp(15px,1.6vw,19px)",
                  fontWeight: 700, color: "#0a1414", lineHeight: 1.6, marginBottom: 12,
                }}
              >
                "No company. No funding. No team."
              </div>
              <div
                style={{
                  fontFamily: FONT, fontSize: "clamp(13px,1.3vw,15px)",
                  color: "#aaa", lineHeight: 1.72, fontWeight: 400,
                }}
              >
                Just someone who cannot use a computer without thinking about how it
                could be better.
              </div>
              <div
                style={{
                  marginTop: 26, paddingTop: 26,
                  borderTop: "1px solid rgba(91,200,200,0.12)",
                }}
              >
                <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#0a1414" }}>
                  Areed Hassan
                </div>
                <div
                  style={{
                    fontFamily: FONT, fontSize: 12, color: "#bbb",
                    marginTop: 5, letterSpacing: "0.2px", fontWeight: 400,
                  }}
                >
                  Builder, Cedar OS
                </div>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.4}>
            <GlassCard
              style={{ padding: "clamp(20px,3vw,28px) clamp(20px,4vw,32px)" }}
              hover={false}
            >
              <div
                style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 10, marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: CYAN, animation: "pulse 2.2s infinite",
                  }}
                />
                <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: "#0a1414" }}>
                  Currently Under Development
                </span>
              </div>
              <p
                style={{
                  fontFamily: FONT, fontSize: "clamp(12px,1.3vw,14px)",
                  color: "#8a9a9a", lineHeight: 1.72, margin: 0, fontWeight: 400,
                }}
              >
                Nothing to share publicly just yet. Cedar is free, open source, and
                will stay that way. Check back as things progress.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "clamp(24px,3vw,36px) clamp(20px,5vw,52px)",
          borderTop: "1px solid rgba(91,200,200,0.08)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 16,
        }}
      >
        <CedarLogo size={15} />
        <div
          style={{
            fontFamily: FONT, fontSize: 11, color: "#c0c8c8",
            letterSpacing: "0.1px", fontWeight: 400,
          }}
        >
          Built in the open by Areed Hassan. Free and open source. Always.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: CYAN, animation: "pulse 2.2s infinite",
            }}
          />
          <span style={{ fontFamily: FONT, fontSize: 11, color: "#c0c8c8", fontWeight: 400 }}>
            Phase 1 Active
          </span>
        </div>
      </footer>
    </div>
  );
}