export const SITE = {
  url: "https://builder.culturabuilder.com",
  name: "Cultura Builder Hub",
  tagline: "Seja o builder de IA da sua cidade",
  description:
    "Programa de Builders Locais da Cultura Builder. Builders certificados que treinam times e implementam IA agêntica em empresas brasileiras nas suas cidades. Powered by AWS e NVIDIA Inception.",
  shortDescription:
    "Builders locais certificados que implementam IA agêntica em empresas brasileiras.",
  locale: "pt_BR",
  twitter: "@culturabuilder",
  org: {
    name: "Cultura Builder",
    legalName: "Cultura Builder",
    url: "https://culturabuilder.com",
    logo: "https://culturabuilder.com/logo.svg",
    sameAs: [
      "https://www.linkedin.com/company/culturabuilder",
      "https://www.instagram.com/culturabuilder/",
      "https://x.com/culturabuilder",
      "https://hub.culturabuilder.com",
    ],
  },
};

export function absUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : "/" + path}`;
}
