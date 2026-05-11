import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(10,10,10,0.78)] border-b border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.svg" alt="Cultura Builder" className="h-5 w-auto" />
        </Link>
        <nav className="flex items-center gap-2 text-[13px] mono uppercase tracking-[0.16em]">
          <Link href="/contribuir" className="px-3 py-2 text-[var(--fg-mute)] hover:text-[var(--fg)] transition">
            Contribuir
          </Link>
          <Link href="#modelo" className="hidden md:inline px-3 py-2 text-[var(--fg-mute)] hover:text-[var(--fg)] transition">
            Modelo
          </Link>
          <Link href="/aplicar" className="btn-primary !py-3 !px-4 !text-[12px] uppercase tracking-[0.16em]">
            Aplicar <span className="cta-arrow">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
