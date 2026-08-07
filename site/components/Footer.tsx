"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="footer" id="join">
      <div className="footer-inner">
        <div className="footer-top">
          <Reveal>
            <img
              className="footer-script blend-screen"
              src="/assets/script-logo.png"
              alt="ntrpy"
              draggable={false}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="footer-join">
              <p className="mono">receive transmissions from the void</p>
              {sent ? (
                <p className="mono holo-text">
                  received. the flap propagates.
                </p>
              ) : (
                <form
                  className="footer-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.includes("@")) setSent(true);
                  }}
                >
                  <input
                    type="email"
                    placeholder="you@within.self"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="email"
                  />
                  <button type="submit">enter</button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
        <div className="footer-bottom">
          <span className="mono">ntrpy · the turning within</span>
          <span className="mono">solve et coagula</span>
          <span className="mono">ntrpy.ai · mmxxvi</span>
        </div>
      </div>
    </footer>
  );
}
