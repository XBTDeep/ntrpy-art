"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import VoidField from "./VoidField";

/* lens glints scattered on and around the logo — hot points on the
   letterforms plus a constellation in the surrounding void */
const GLINTS: { t: string; l: string; s: number }[] = [
  // on the letterforms
  { t: "9%", l: "31%", s: 30 },
  { t: "15%", l: "74%", s: 22 },
  { t: "47%", l: "5%", s: 20 },
  { t: "83%", l: "45%", s: 26 },
  { t: "30%", l: "56%", s: 18 },
  { t: "68%", l: "90%", s: 24 },
  { t: "22%", l: "14%", s: 16 },
  { t: "90%", l: "22%", s: 18 },
  { t: "55%", l: "68%", s: 20 },
  // ellipse rim
  { t: "36%", l: "96%", s: 28 },
  { t: "74%", l: "2%", s: 22 },
  { t: "6%", l: "52%", s: 20 },
  { t: "94%", l: "64%", s: 22 },
  { t: "62%", l: "34%", s: 16 },
  { t: "12%", l: "88%", s: 26 },
  { t: "40%", l: "22%", s: 14 },
  { t: "78%", l: "76%", s: 18 },
  { t: "26%", l: "40%", s: 14 },
  // constellation in the void around the logo
  { t: "-10%", l: "12%", s: 24 },
  { t: "-14%", l: "66%", s: 30 },
  { t: "-4%", l: "94%", s: 18 },
  { t: "24%", l: "-8%", s: 26 },
  { t: "58%", l: "-12%", s: 18 },
  { t: "96%", l: "-6%", s: 22 },
  { t: "108%", l: "34%", s: 28 },
  { t: "104%", l: "82%", s: 20 },
  { t: "44%", l: "108%", s: 24 },
];

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // subtle mouse parallax — the logo drifts against the cursor
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * -18;
    const y = (e.clientY / h - 0.5) * -12;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <header className="hero" onMouseMove={onMove} id="top">
      <div className="hero-halo" aria-hidden="true" />
      {/* slow iridescent bloom turning behind the logo */}
      <div className="hero-bloom" aria-hidden="true" />
      {/* imaginal dust drifting in the void */}
      <VoidField />

      <div className="hero-corner tl">
        N 43.6532° <br /> W 79.3832°
      </div>
      <div className="hero-corner tr">
        est. within <br /> mmxxvi
      </div>
      <div className="hero-corner bl">[ pronounced entropy ]</div>
      <div className="hero-corner br">
        order ⇄ chaos <br /> ΔS &gt; 0
      </div>

      <motion.div
        ref={wrapRef}
        className="hero-logo-wrap"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* black-background render melts into the void via screen blend */}
        <img
          className="hero-logo blend-screen"
          src="/assets/logo-chrome.png"
          alt="NTRPY"
          draggable={false}
        />
        {/* chrome catching light — y2k lens glints, all flashing as one */}
        {GLINTS.map((g, i) => (
          <span
            key={i}
            className="glint"
            aria-hidden="true"
            style={{ top: g.t, left: g.l, width: g.s, height: g.s }}
          />
        ))}
      </motion.div>

      <motion.div
        className="hero-tag"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="chrome-text">The Turning Within</h1>
        <div className="mono">
          chaos into order · order into chaos
        </div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <div className="mono">descend</div>
        <div className="hero-scroll-line" />
      </motion.div>
    </header>
  );
}
