"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

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
