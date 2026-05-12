import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplicar como Builder Local",
  description:
    "Aplicação conversacional de ~5 minutos para builders certificados pela Cultura Builder que querem operar localmente em sua cidade. Atendimento a empresas brasileiras com treinamento e implementação de IA.",
  alternates: { canonical: "/aplicar" },
  openGraph: {
    title: "Aplicar como Builder Local | Cultura Builder Hub",
    description:
      "Aplicação rápida para builders certificados pela CB. Atenda empresas da sua cidade com IA.",
    url: "https://builder.culturabuilder.com/aplicar",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
