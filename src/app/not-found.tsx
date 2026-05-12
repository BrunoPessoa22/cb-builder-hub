import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "Esta página não existe. Volta pra raiz e segue o caminho de builder.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 md:px-10 py-32 md:py-40 text-center">
        <div className="tag tag-accent tag-rule justify-center mb-8">404 · Não encontrada</div>
        <h1 className="h-section">Essa página não existe.</h1>
        <p className="lead mt-8 mx-auto">
          Mas o programa de builder local tá ativo. Volta pra raiz ou aplica direto:
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-outline group">
            Voltar pra home <span className="cta-arrow">→</span>
          </Link>
          <Link href="/aplicar" className="btn-primary group">
            Aplicar como builder local <span className="cta-arrow">→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
