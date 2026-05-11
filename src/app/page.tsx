import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PartnerBadges from "@/components/PartnerBadges";
import BrazilMap from "@/components/BrazilMap";

const DEMAND_CITIES = [
  { city: "São Paulo", state: "SP" },
  { city: "Rio de Janeiro", state: "RJ" },
  { city: "Belo Horizonte", state: "MG" },
  { city: "Curitiba", state: "PR" },
  { city: "Porto Alegre", state: "RS" },
  { city: "Recife", state: "PE" },
  { city: "Florianópolis", state: "SC" },
  { city: "Brasília", state: "DF" },
  { city: "Goiânia", state: "GO" },
  { city: "Fortaleza", state: "CE" },
  { city: "Salvador", state: "BA" },
  { city: "Manaus", state: "AM" },
];

const PILLARS = [
  {
    title: "Treinamento corporativo",
    desc: "Forma times de empresas em IA aplicada — playbook, slides e exercícios prontos. Você facilita, a CB sustenta a marca.",
  },
  {
    title: "Implementação de agentes",
    desc: "Projetos em produção: agente de atendimento, automação interna, copiloto comercial. Stack CB + AWS + NVIDIA.",
  },
  {
    title: "Retainer mensal",
    desc: "Manutenção, evolução e suporte recorrente nas empresas que você atendeu. Receita previsível por cliente.",
  },
];

const FAQS = [
  {
    q: "Preciso saber programar?",
    a: "Não. A CB nasceu da ideia de que IA dissolve a barreira técnica. Se você sabe construir com IA — agentes, automações, fluxos — você é builder. Engenheiros são bem-vindos, mas não são pré-requisito.",
  },
  {
    q: "Quanto eu preciso investir?",
    a: "Zero pra começar. Builders locais certificados podem operar como freelancer com a marca CB. Se quiser exclusividade regional + escritório físico, oferecemos modelo de franquia leve a partir de R$ 15k.",
  },
  {
    q: "O que a Cultura Builder entrega pra mim?",
    a: "Marca, leads de empresas pedindo CB na sua região, playbook comercial e técnico, treinamento contínuo, parcerias com AWS, NVIDIA Inception e Anthropic, e visibilidade nos canais da Cultura Builder.",
  },
  {
    q: "Quanto tempo leva pra ser aprovado?",
    a: "Aplicações são revisadas semanalmente. Portfólio sólido (GitHub, deploys, projetos de IA reais) entra na primeira call em 7–14 dias.",
  },
  {
    q: "Tem exclusividade por cidade?",
    a: "Sim, no modelo de escritório local com investimento. Pra perfil freelancer certificado a operação é compartilhada por região.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <section className="relative overflow-hidden edge-b">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-24 md:pt-32 pb-24">
          <div className="tag tag-accent tag-rule mb-8">Programa de Builders Locais · Beta</div>

          <h1 className="h-hero max-w-[16ch]">
            Seja o <span className="hi">builder</span> de IA<br />
            da sua cidade.
          </h1>

          <p className="lead mt-10 max-w-[60ch]">
            Empresas de todo o Brasil estão procurando alguém perto pra treinar times em IA e implementar agentes no negócio.
            A Cultura Builder dá a marca, os leads, o playbook e a comunidade — você opera localmente.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/aplicar" className="btn-primary group">
              Aplicar como builder local <span className="cta-arrow">→</span>
            </Link>
            <Link href="/contribuir" className="btn-outline group">
              Publicar conteúdo na CB <span className="cta-arrow">→</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 flex-wrap text-[14px] text-[var(--fg-mute)]">
            <span>Ainda não é builder certificado pela Cultura Builder?</span>
            <a
              href="https://hub.culturabuilder.com"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] font-bold flex items-center gap-1.5 group hover:underline"
            >
              Inscreva-se em hub.culturabuilder.com <span className="cta-arrow">→</span>
            </a>
          </div>

          <div className="mt-16">
            <PartnerBadges />
          </div>
        </div>
      </section>

      <section className="edge-b">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20 items-end mb-16">
            <div>
              <div className="tag tag-accent mb-5">Cobertura nacional</div>
              <h2 className="h-section">Cidades onde queremos um builder.</h2>
            </div>
            <p className="lead">
              Programa aberto pra qualquer cidade do Brasil. As marcadas no mapa são prioridade —
              quem aplica primeiro vira referência local.
            </p>
          </div>

          <BrazilMap />

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-3 border-t border-[var(--line)] pt-8">
            {DEMAND_CITIES.map((c) => (
              <div key={c.city} className="flex items-baseline gap-2 text-[14px]">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-mute)] w-6">{c.state}</span>
                <span className="font-semibold tracking-[-0.01em]">{c.city}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Link href="/aplicar" className="text-[var(--accent)] font-bold flex items-center gap-2 group">
              Reservar minha cidade <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="modelo" className="bg-[var(--surface)] edge-b">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
          <div className="mb-16 max-w-3xl">
            <div className="tag tag-accent mb-5">Como você opera</div>
            <h2 className="h-section">Três frentes de receita. Você escolhe onde quer começar.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-[var(--line)]">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className={
                  "p-8 md:p-10 " +
                  (i < 2 ? "border-b md:border-b-0 md:border-r border-[var(--line)]" : "")
                }
              >
                <div className="mono text-[12px] uppercase tracking-[0.18em] text-[var(--accent)] font-bold mb-6">
                  0{i + 1}
                </div>
                <h3 className="h-sub">{p.title}</h3>
                <p className="mt-6 text-[15px] text-[var(--fg-soft)] leading-[1.65]">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="mono mt-10 text-[12px] uppercase tracking-[0.18em] text-[var(--fg-mute)] max-w-3xl">
            Modelo comercial e rev-share definidos caso a caso na call de aprovação. Sem letras miúdas.
          </p>
        </div>
      </section>

      <section className="bg-[var(--surface)] edge-b">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <div className="tag tag-accent mb-5">Os dois caminhos</div>
              <h2 className="h-section">
                Comece publicando.<br />Termine sendo certificado.
              </h2>
            </div>
            <p className="lead">
              Você não precisa decidir hoje. A maioria dos builders certificados começou contribuindo conteúdo no Instagram da CB e foi escalando reputação até virar referência local.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-[var(--line)]">
            <PathCard
              step="01"
              title="Contribua conteúdo (remunerado)"
              href="/contribuir"
              cta="Enviar conteúdo"
              points={[
                "Aulas pra plataforma CB ou conteúdo pras redes sociais",
                "Conteúdo aprovado é pago",
                "Visibilidade nos canais da Cultura Builder",
              ]}
            />
            <PathCard
              step="02"
              title="Aplique como builder local"
              href="/aplicar"
              cta="Quero aplicar"
              accent
              points={[
                "Aplicação conversacional (~10 min)",
                "Avaliação em 7–14 dias",
                "Acesso a leads, marca e playbook depois de aprovado",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] edge-b">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16">
            <div>
              <div className="tag tag-accent mb-5">FAQ</div>
              <h2 className="h-section">Dúvidas honestas.<br />Respostas honestas.</h2>
              <p className="lead mt-6">
                Pergunta que falta na lista, manda no chat da aplicação. A gente lê tudo.
              </p>
            </div>
            <div className="border border-[var(--line)]">
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  className={"group " + (i < FAQS.length - 1 ? "border-b border-[var(--line)]" : "")}
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-6 hover:bg-[var(--bg)] transition">
                    <span className="text-[17px] font-bold tracking-[-0.01em]">{f.q}</span>
                    <span className="text-[var(--accent)] text-[24px] leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-6 pb-7 text-[15px] text-[var(--fg-soft)] leading-[1.65] max-w-[60ch]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-32 md:py-40 text-center">
          <div className="tag tag-accent tag-rule justify-center mb-8">Cohort 01 · Beta aberto</div>
          <h2 className="h-hero">
            O emprego do <span className="hi">futuro</span><br />
            é ajudar empresas a<br />
            implementarem IA.
          </h2>
          <p className="lead mt-10 mx-auto text-center">
            Cada cidade do Brasil precisa de alguém que saiba traduzir IA em resultado de negócio.
            Esse alguém pode ser você.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/aplicar" className="btn-primary group">
              Quero ser builder local <span className="cta-arrow">→</span>
            </Link>
            <Link href="/contribuir" className="btn-outline group">
              Publicar conteúdo na CB <span className="cta-arrow">→</span>
            </Link>
          </div>
          <div className="mt-16 flex justify-center">
            <PartnerBadges />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function PathCard({
  step,
  title,
  points,
  href,
  cta,
  accent,
}: {
  step: string;
  title: string;
  points: string[];
  href: string;
  cta: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "block p-8 md:p-10 group transition " +
        (accent
          ? "bg-[var(--accent)] text-[var(--paper)] hover:bg-[var(--rust-bright,#FF7A3F)]"
          : "hover:bg-[var(--bg)]")
      }
    >
      <div className={"tag mb-6 " + (accent ? "!text-[var(--paper)] opacity-80" : "")}>Caminho {step}</div>
      <h3 className="h-sub">{title}</h3>
      <ul className="mt-8 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-[15px] leading-[1.5]">
            <span className={"mt-2 w-2 h-2 shrink-0 " + (accent ? "bg-[var(--paper)]" : "bg-[var(--accent)]")} />
            <span className={accent ? "text-[var(--paper)]" : "text-[var(--fg-soft)]"}>{p}</span>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex items-center gap-2 text-[13px] mono uppercase tracking-[0.18em] font-bold">
        {cta} <span className="cta-arrow">→</span>
      </div>
    </Link>
  );
}
