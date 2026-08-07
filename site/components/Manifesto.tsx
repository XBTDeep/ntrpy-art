import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section className="section" id="doctrine">
      <div className="manifesto">
        <Reveal>
          <p className="manifesto-line">
            <span className="chrome-text">
              Entropy is not decay. The word means{" "}
            </span>
            <em className="holo-text">the turning within.</em>
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="manifesto-line chrome-text">
            Order is not found. It is paid for.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="manifesto-line chrome-text">
            The only thing that survives dissolution is the image of what you
            are becoming.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="manifesto-note">
            NTRPY is an archive of transformation — animals rendered in chrome,
            each one a different mechanism of change. Chrome has no color of
            its own: everything you see in it is the room. The void is not a
            background. It is the inside of the cocoon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
