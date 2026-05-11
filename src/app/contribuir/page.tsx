"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Link from "next/link";

const CATEGORIES = [
  {
    value: "aula",
    label: "Aula / Curso",
    headline: "Conteúdo educacional pra plataforma CB",
    desc: "Módulos estruturados que vão pro Builders Club. Formato professoral, dura mais, ensina algo construível.",
    payNote: "Aulas aprovadas e gravadas são remuneradas. Valor por aula definido na curadoria.",
  },
  {
    value: "social",
    label: "Conteúdo de Redes Sociais",
    headline: "Post / vídeo / carrossel pra canais CB",
    desc: "Material curto pros canais de Instagram, LinkedIn, X e TikTok da Cultura Builder.",
    payNote: "Conteúdo publicado é remunerado por peça. Valor por formato definido na aprovação.",
  },
] as const;

const TYPES_BY_CATEGORY: Record<string, { value: string; label: string; desc: string }[]> = {
  aula: [
    { value: "aula_curta", label: "Aula curta (até 30 min)", desc: "Tópico único, foco em uma skill ou ferramenta." },
    { value: "aula_longa", label: "Módulo longo (1–3h)", desc: "Trilha completa com exercícios e projeto final." },
    { value: "workshop_live", label: "Workshop ao vivo", desc: "Você facilita uma sessão ao vivo na agenda CB." },
  ],
  social: [
    { value: "tutorial", label: "Tutorial / how-to", desc: "Passo a passo de como construiu algo." },
    { value: "case", label: "Case real", desc: "Resultado mensurável de cliente ou projeto." },
    { value: "noticia", label: "Notícia / newsjack", desc: "Lançamento, paper, fato relevante de IA." },
    { value: "dica", label: "Dica / prompt", desc: "Truque rápido que economiza tempo." },
    { value: "video_curto", label: "Vídeo curto (Reels/Short)", desc: "Vertical, 15s–90s, voz na frente." },
    { value: "carrossel", label: "Carrossel", desc: "Sequência de slides educacional ou opinativo." },
    { value: "outro", label: "Outro formato", desc: "Conta o que é no campo de descrição." },
  ],
};

export default function ContributePage() {
  const [category, setCategory] = useState<"aula" | "social">("social");
  const [type, setType] = useState<string>("tutorial");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ ok: boolean; id?: string; error?: string } | null>(null);
  const [form, setForm] = useState({
    builderName: "", email: "", igHandle: "", city: "",
    title: "", body: "", links: "", mediaUrl: "",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function selectCategory(v: "aula" | "social") {
    setCategory(v);
    setType(TYPES_BY_CATEGORY[v][0].value);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category, type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erro");
      setDone({ ok: true, id: data.id });
    } catch (e: any) {
      setDone({ ok: false, error: e.message || "Erro" });
    } finally {
      setSubmitting(false);
    }
  }

  if (done?.ok) {
    return (
      <>
        <Nav />
        <div className="mx-auto max-w-2xl px-6 md:px-10 py-24 md:py-32 text-center">
          <div className="tag tag-accent tag-rule justify-center mb-8">Recebido</div>
          <h1 className="h-section">Conteúdo enviado pra curadoria.</h1>
          <p className="lead mt-8 mx-auto">
            Revisão em 48–72h. Se aprovado, a curadoria entra em contato pra alinhar publicação e remuneração.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/aplicar" className="btn-primary group">
              Aplicar como builder local <span className="cta-arrow">→</span>
            </Link>
            <button
              onClick={() => {
                setDone(null);
                setForm({ builderName: form.builderName, email: form.email, igHandle: form.igHandle, city: form.city, title: "", body: "", links: "", mediaUrl: "" });
              }}
              className="btn-outline"
            >
              Enviar outro
            </button>
          </div>
          <div className="mono mt-8 text-[12px] uppercase tracking-[0.18em] text-[var(--fg-mute)]">ID: {done.id}</div>
        </div>
      </>
    );
  }

  const currentTypes = TYPES_BY_CATEGORY[category];
  const currentCategoryMeta = CATEGORIES.find(c => c.value === category)!;

  return (
    <>
      <Nav />
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-12 md:py-16">
        <div className="mb-12">
          <div className="tag tag-accent mb-5">Contribua conteúdo · Builders pagos</div>
          <h1 className="h-section">Construa conteúdo. A gente publica e paga.</h1>
          <p className="lead mt-8">
            Cultura Builder remunera builders por aulas estruturadas pra plataforma e conteúdo publicado nas redes.
            Você ganha exposição, autoridade e dinheiro — e ainda escala como candidato a builder local certificado.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-12">
          <Section title="01 · Categoria">
            <div className="grid sm:grid-cols-2 gap-0 border border-[var(--line)]">
              {CATEGORIES.map((c, i) => {
                const on = category === c.value;
                return (
                  <button
                    type="button"
                    key={c.value}
                    onClick={() => selectCategory(c.value)}
                    className={
                      "text-left p-6 transition relative " +
                      (on ? "bg-[var(--accent)] text-[var(--paper)]" : "hover:bg-[var(--surface)]") +
                      (i === 0 ? " sm:border-r border-[var(--line)] border-b sm:border-b-0" : "")
                    }
                  >
                    <div className="mono text-[11px] uppercase tracking-[0.18em] mb-3 opacity-80">
                      {c.headline}
                    </div>
                    <div className="text-[20px] font-bold tracking-[-0.02em]">{c.label}</div>
                    <div className={"mt-3 text-[13px] leading-[1.5] " + (on ? "text-[var(--paper)]/85" : "text-[var(--fg-mute)]")}>
                      {c.desc}
                    </div>
                    <div className={"mt-5 inline-block mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 font-bold " + (on ? "bg-[var(--paper)] text-[var(--accent)]" : "bg-[var(--accent)] text-[var(--paper)]")}>
                      Remunerado
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mono mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--fg-mute)]">
              {currentCategoryMeta.payNote}
            </div>
          </Section>

          <Section title="02 · Formato">
            <div className="grid sm:grid-cols-2 gap-0 border border-[var(--line)]">
              {currentTypes.map((t, i) => {
                const on = type === t.value;
                const isLastOdd = i === currentTypes.length - 1 && currentTypes.length % 2 === 1;
                return (
                  <button
                    type="button"
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={
                      "text-left p-5 transition border-[var(--line)] " +
                      (on ? "bg-[var(--accent)] text-[var(--paper)]" : "hover:bg-[var(--surface)]") +
                      " " +
                      (i % 2 === 0 && !isLastOdd ? "sm:border-r " : "") +
                      (i < currentTypes.length - 2 ? "border-b " : i === currentTypes.length - 2 && currentTypes.length % 2 === 0 ? "border-b sm:border-b-0 " : "") +
                      (isLastOdd ? "sm:col-span-2" : "")
                    }
                  >
                    <div className="font-bold text-[15px] tracking-[-0.01em]">{t.label}</div>
                    <div className={"text-[13px] mt-1 " + (on ? "text-[var(--paper)]/80" : "text-[var(--fg-mute)]")}>{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="03 · Sobre você">
            <div className="grid sm:grid-cols-2 gap-0 border border-[var(--line)]">
              <Field label="Nome *" value={form.builderName} onChange={v => set("builderName", v)} required borderRight borderBottom />
              <Field label="Email *" type="email" value={form.email} onChange={v => set("email", v)} required borderBottom />
              <Field label="@ Instagram" value={form.igHandle} onChange={v => set("igHandle", v)} placeholder="@seuhandle" borderRight />
              <Field label="Cidade/UF" value={form.city} onChange={v => set("city", v)} placeholder="Recife/PE" />
            </div>
          </Section>

          <Section title="04 · Conteúdo">
            <div className="border border-[var(--line)]">
              <Field label="Título *" value={form.title} onChange={v => set("title", v)} required maxLength={120} borderBottom flat />
              <FieldArea
                label={category === "aula" ? "Estrutura da aula *" : "Corpo *"}
                value={form.body}
                onChange={v => set("body", v)}
                required
                minLength={50}
                placeholder={
                  category === "aula"
                    ? "Objetivo da aula:\nPré-requisitos:\nConteúdo (passo a passo):\nProjeto final:\nDuração estimada:"
                    : type === "case"
                      ? "Cliente: ...\nProblema: ...\nSolução com IA: ...\nResultado mensurável: ..."
                      : type === "tutorial"
                        ? "Passo 1: ...\nPasso 2: ...\nResultado: ..."
                        : "Escreve aqui o conteúdo. Pode ser um draft, a curadoria ajuda a polir."
                }
                borderBottom
              />
              <Field label="Links de referência" value={form.links} onChange={v => set("links", v)} placeholder="GitHub, demo, docs, paper… (separados por vírgula)" borderBottom flat />
              <Field
                label={category === "aula" ? "URL de mídia (vídeo demo, slides, exemplos)" : "URL de mídia (vídeo, screenshot, carrossel)"}
                value={form.mediaUrl}
                onChange={v => set("mediaUrl", v)}
                placeholder="Link de Drive, Loom, Imgur, etc."
                flat
              />
            </div>
          </Section>

          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50 group">
            {submitting ? "Enviando…" : "Enviar pra curadoria"} <span className="cta-arrow">→</span>
          </button>

          {done && !done.ok && (
            <div className="text-[13px] text-[#ff6b3a]">Erro: {done.error}</div>
          )}
        </form>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="tag tag-accent mb-5">{title}</div>
      <div>{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required, placeholder, maxLength,
  borderRight, borderBottom, flat,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string; maxLength?: number;
  borderRight?: boolean; borderBottom?: boolean; flat?: boolean;
}) {
  return (
    <label
      className={
        "block p-5 " +
        (flat ? "" : (borderRight ? "sm:border-r border-[var(--line)] " : "") + (borderBottom ? "border-b border-[var(--line)] " : "")) +
        (flat && borderBottom ? "border-b border-[var(--line)] " : "")
      }
    >
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-mute)] mb-2">{label}</div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-transparent outline-none text-[15px] text-[var(--fg)] placeholder:text-[var(--fg-faint)]"
      />
    </label>
  );
}

function FieldArea({
  label, value, onChange, required, placeholder, minLength, borderBottom,
}: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string; minLength?: number; borderBottom?: boolean;
}) {
  return (
    <label className={"block p-5 " + (borderBottom ? "border-b border-[var(--line)]" : "")}>
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-mute)] mb-2">{label}</div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        rows={8}
        className="w-full bg-transparent outline-none text-[15px] text-[var(--fg)] placeholder:text-[var(--fg-faint)] resize-y leading-[1.6]"
      />
    </label>
  );
}
