import Link from "next/link";

export default function Footer() {
  return (
    <footer className="edge-t mt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/logo.svg" alt="Cultura Builder" className="h-6 w-auto" />
          <p className="lead mt-5 text-[15px]">
            A rede de builders locais de IA do Brasil. Powered by AWS · NVIDIA Inception.
          </p>
        </div>
        <div>
          <div className="tag mb-4">Builders</div>
          <ul className="space-y-2 text-[14px]">
            <li><Link href="/aplicar" className="text-[var(--fg-soft)] hover:text-[var(--fg)]">Aplicar como builder local</Link></li>
            <li><Link href="/contribuir" className="text-[var(--fg-soft)] hover:text-[var(--fg)]">Publicar conteúdo</Link></li>
          </ul>
        </div>
        <div>
          <div className="tag mb-4">Cultura Builder</div>
          <ul className="space-y-2 text-[14px]">
            <li><a href="https://culturabuilder.com" target="_blank" rel="noreferrer" className="text-[var(--fg-soft)] hover:text-[var(--fg)]">culturabuilder.com</a></li>
            <li><a href="https://hub.culturabuilder.com" target="_blank" rel="noreferrer" className="text-[var(--fg-soft)] hover:text-[var(--fg)]">hub.culturabuilder.com</a></li>
            <li><a href="https://instagram.com/culturabuilder" target="_blank" rel="noreferrer" className="text-[var(--fg-soft)] hover:text-[var(--fg)]">@culturabuilder</a></li>
          </ul>
        </div>
      </div>
      <div className="rule-t py-5 px-6 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 max-w-7xl mx-auto">
        <span className="tag">© 2026 Cultura Builder · Todos os direitos reservados</span>
        <span className="tag">
          AWS Partner Network · NVIDIA Inception Program · Anthropic Partner
        </span>
      </div>
    </footer>
  );
}
