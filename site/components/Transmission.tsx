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
            “One must still have chaos in oneself
            <br />
            to give birth to a dancing star.”
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mono" style={{ marginTop: "1.8rem" }}>
            nietzsche · thus spoke zarathustra
          </p>
        </Reveal>
      </div>
    </section>
  );
}
