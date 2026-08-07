"use client";

import { useRef } from "react";
import Reveal from "./Reveal";

type Spec = {
  id: string;
  name: string;
  mech: string;
  meaning: string;
  media: { type: "img" | "video"; src: string };
  blend?: boolean;
};

const SPECIMENS: Spec[] = [
  {
    id: "SPEC—01",
    name: "Psyche",
    mech: "metamorphosis",
    meaning:
      "Change by total dissolution. The body liquefies; only the image of what it is becoming survives.",
    media: { type: "img", src: "/assets/butterfly.png" },
  },
  {
    id: "SPEC—02",
    name: "Ouroboros",
    mech: "ecdysis",
    meaning:
      "Change by shedding. The snake goes blind right before it sees clearly. Knowledge at the cost of innocence.",
    media: { type: "img", src: "/assets/snake-heart.png" },
  },
  {
    id: "SPEC—03",
    name: "Sovereign",
    mech: "refusal",
    meaning:
      "The lion says I WILL and destroys every value imposed on it. It clears the ground. Only the child creates.",
    media: { type: "img", src: "/assets/lion.png" },
    blend: true,
  },
  {
    id: "SPEC—04",
    name: "False Light",
    mech: "misdirection",
    meaning:
      "The moth is the butterfly's shadow twin — the same transformation, aimed at the wrong sun.",
    media: { type: "video", src: "/assets/moth.mp4" },
    blend: true,
  },
];

function SpecimenCard({ s }: { s: Spec }) {
  const ref = useRef<HTMLDivElement>(null);

  // light 3D tilt toward the cursor
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${
      py * -6
    }deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      className="specimen"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.5s" }}
    >
      <div className="specimen-tagline mono">{s.mech}</div>
      <div className="specimen-id mono">{s.id}</div>
      <div className="specimen-media">
        {s.media.type === "img" ? (
          <img
            src={s.media.src}
            alt={s.name}
            className={s.blend ? "blend-screen" : undefined}
            draggable={false}
          />
        ) : (
          <video
            src={s.media.src}
            className={s.blend ? "blend-screen" : undefined}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>
      <div className="specimen-meta">
        <div className="specimen-name chrome-text">{s.name}</div>
      </div>
      <p className="specimen-mech">{s.meaning}</p>
    </div>
  );
}

export default function Archive() {
  return (
    <section className="section" id="archive">
      <Reveal>
        <div className="section-head">
          <h2 className="chrome-text">Specimen Archive</h2>
          <div className="mono">a taxonomy of transformation</div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="archive-grid">
          {SPECIMENS.map((s) => (
            <SpecimenCard key={s.id} s={s} />
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <p
          className="mono"
          style={{ marginTop: "1.6rem", textAlign: "right" }}
        >
          further specimens undergoing dissolution —{" "}
          <span className="holo-text">to be catalogued</span>
        </p>
      </Reveal>
    </section>
  );
}
