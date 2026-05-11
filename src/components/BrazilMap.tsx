type City = { name: string; state: string; x: number; y: number };

const CITIES: City[] = [
  { name: "São Paulo",      state: "SP", x: 56, y: 75 },
  { name: "Rio de Janeiro", state: "RJ", x: 64, y: 71 },
  { name: "Belo Horizonte", state: "MG", x: 63, y: 64 },
  { name: "Curitiba",       state: "PR", x: 53, y: 80 },
  { name: "Porto Alegre",   state: "RS", x: 47, y: 90 },
  { name: "Recife",         state: "PE", x: 84, y: 41 },
  { name: "Florianópolis",  state: "SC", x: 51, y: 84 },
  { name: "Brasília",       state: "DF", x: 56, y: 58 },
  { name: "Goiânia",        state: "GO", x: 51, y: 60 },
  { name: "Fortaleza",      state: "CE", x: 78, y: 32 },
  { name: "Salvador",       state: "BA", x: 76, y: 51 },
  { name: "Manaus",         state: "AM", x: 32, y: 31 },
];

export default function BrazilMap() {
  return (
    <div className="relative w-full aspect-[0.92] border border-[var(--line)] bg-[var(--bg)] overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <svg
        viewBox="0 0 800 870"
        className="absolute inset-0 w-full h-full"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path
          d="M 248 142 L 312 110 L 360 96 L 410 90 L 460 110 L 502 138 L 540 130 L 588 152 L 612 200 L 642 234 L 672 270 L 690 318 L 700 372 L 686 422 L 672 470 L 660 520 L 632 568 L 596 612 L 562 642 L 520 666 L 478 686 L 432 698 L 388 706 L 348 696 L 308 678 L 270 648 L 248 612 L 232 564 L 222 514 L 218 462 L 232 410 L 250 366 L 248 318 L 230 274 L 224 224 L 234 182 Z"
          fill="rgba(255,255,255,0.025)"
        />
        <path
          d="M 248 142 L 312 110 L 360 96 L 410 90 L 460 110 L 502 138 L 540 130 L 588 152 L 612 200 L 642 234 L 672 270 L 690 318 L 700 372 L 686 422 L 672 470 L 660 520 L 632 568 L 596 612 L 562 642 L 520 666 L 478 686 L 432 698 L 388 706 L 348 696 L 308 678 L 270 648 L 248 612 L 232 564 L 222 514 L 218 462 L 232 410 L 250 366 L 248 318 L 230 274 L 224 224 L 234 182 Z"
        />
      </svg>

      <div className="absolute inset-0">
        {CITIES.map((c) => (
          <div
            key={c.name}
            className="absolute group"
            style={{
              left: c.x + "%",
              top: c.y + "%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <span className="absolute inset-0 m-auto w-3 h-3 bg-[var(--accent)] animate-ping opacity-30" style={{ animationDuration: "2.4s" }} />
              <span className="relative block w-2.5 h-2.5 bg-[var(--accent)]" />
            </div>
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)] font-bold bg-[var(--bg)] border border-[var(--line)] px-2 py-1 group-hover:border-[var(--accent)] transition">
                {c.name} <span className="text-[var(--fg-mute)]">/ {c.state}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-mute)]">
        12 cidades prioritárias
      </div>
    </div>
  );
}
