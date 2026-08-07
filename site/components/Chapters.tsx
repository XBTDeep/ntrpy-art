import Reveal from "./Reveal";

const CHAPTERS = [
  {
    n: "I",
    name: "Larva",
    sub: "the inherited order — you are the product of your environment",
    state: "order · given",
  },
  {
    n: "II",
    name: "Solve",
    sub: "histolysis — the structure dissolves, and it dissolves alone",
    state: "chaos",
  },
  {
    n: "III",
    name: "Imaginal",
    sub: "the dormant cells wake in the soup — they were always inside you",
    state: "chaos · organizing",
  },
  {
    n: "IV",
    name: "Coagula",
    sub: "the body rebuilds around the image of what it is becoming",
    state: "order · chosen",
  },
  {
    n: "V",
    name: "Imago",
    sub: "emergence — you keep what you learned, you lose what you were",
    state: "order · new",
  },
  {
    n: "VI",
    name: "The Flap",
    sub: "the wingbeat propagates — a new initial condition for the next storm",
    state: "chaos · again",
  },
];

export default function Chapters() {
  return (
    <section className="section" id="chapters">
      <Reveal>
        <div className="section-head">
          <h2 className="chrome-text">The Cycle</h2>
          <div className="mono">six chapters · the loop never closes</div>
        </div>
      </Reveal>
      <div className="chapters-list">
        {CHAPTERS.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.06} y={18}>
            <div className="chapter">
              <div className="chapter-num display">{c.n}</div>
              <div>
                <div className="chapter-name chrome-text">
                  {c.name}
                  <span className="chapter-sub">{c.sub}</span>
                </div>
              </div>
              <div className="chapter-state mono">{c.state}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
