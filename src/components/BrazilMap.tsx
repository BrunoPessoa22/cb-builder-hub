type City = { name: string; state: string; x: number; y: number };

const CITIES: City[] = [
  { name: "Manaus",         state: "AM", x: 33.6, y: 21.4 },
  { name: "Fortaleza",      state: "CE", x: 85.2, y: 23.0 },
  { name: "Recife",         state: "PE", x: 94.0, y: 34.1 },
  { name: "Salvador",       state: "BA", x: 85.3, y: 46.7 },
  { name: "Brasília",       state: "DF", x: 62.6, y: 53.9 },
  { name: "Goiânia",        state: "GO", x: 59.5, y: 56.2 },
  { name: "Belo Horizonte", state: "MG", x: 72.2, y: 64.6 },
  { name: "Rio de Janeiro", state: "RJ", x: 74.0, y: 72.2 },
  { name: "São Paulo",      state: "SP", x: 65.8, y: 73.9 },
  { name: "Curitiba",       state: "PR", x: 59.4, y: 78.7 },
  { name: "Florianópolis",  state: "SC", x: 61.2, y: 84.2 },
  { name: "Porto Alegre",   state: "RS", x: 54.7, y: 90.5 },
];

export default function BrazilMap() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "1000 / 938" }}>
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <img
        src="/brazil.svg"
        alt="Mapa do Brasil"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      <div className="absolute inset-0">
        {CITIES.map((c) => (
          <div
            key={c.name}
            className="absolute group"
            style={{ left: c.x + "%", top: c.y + "%", transform: "translate(-50%, -50%)" }}
          >
            <div className="relative flex items-center justify-center">
              <span
                className="absolute w-4 h-4 rounded-full bg-[var(--accent)] opacity-30 animate-ping"
                style={{ animationDuration: "2.4s" }}
              />
              <span className="relative block w-2.5 h-2.5 bg-[var(--accent)]" />
            </div>
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-10">
              <div className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)] bg-[var(--bg)] border border-[var(--line)] px-2 py-1 transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                {c.name} <span className="text-[var(--fg-mute)]">/ {c.state}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 right-3 mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-mute)] pointer-events-none">
        12 cidades prioritárias
      </div>
    </div>
  );
}
