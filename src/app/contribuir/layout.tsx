import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribua Conteúdo (Remunerado) na Cultura Builder",
  description:
    "Builders publicam aulas e conteúdo de redes sociais nos canais oficiais da Cultura Builder. Aulas estruturadas e posts aprovados são remunerados.",
  alternates: { canonical: "/contribuir" },
  openGraph: {
    title: "Contribua conteúdo remunerado | Cultura Builder",
    description:
      "Construa conteúdo — aulas para a plataforma CB ou material para as redes sociais. Tudo aprovado é pago.",
    url: "https://builder.culturabuilder.com/contribuir",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ContribuirLayout({ children }: { children: React.ReactNode }) {
  return children;
}
