const WORDS = [
  "solve",
  "✦",
  "coagula",
  "✦",
  "ψυχή — the soul is the butterfly",
  "✦",
  "ΔS > 0",
  "✦",
  "the turning within",
  "✦",
  "nigredo",
  "✦",
  "albedo",
  "✦",
  "citrinitas",
  "✦",
  "rubedo",
  "✦",
  "order is paid for",
  "✦",
];

export default function Ticker() {
  const row = (key: string) => (
    <div className="ticker-track" key={key} aria-hidden={key === "b"}>
      {WORDS.map((w, i) => (
        <span key={i} className={w === "✦" ? "dim" : undefined}>
          {w}
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker">
      {row("a")}
      {row("b")}
    </div>
  );
}
