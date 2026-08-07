import Reveal from "./Reveal";

export default function Transmission() {
  return (
    <section className="transmission">
      <video
        src="/assets/butterfly-effect.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="transmission-inner">
        <Reveal>
          <p className="transmission-quote chrome-text">
            “<em>Thou shalt</em> is the great dragon.
            <br />
            But the spirit of the lion says: <em>I will.</em>”
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mono" style={{ marginTop: "1.8rem" }}>
            nietzsche · on the three metamorphoses
          </p>
        </Reveal>
      </div>
    </section>
  );
}
