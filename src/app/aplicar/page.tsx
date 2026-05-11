"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Link from "next/link";

type Step = {
  key: string;
  prompt: string;
  hint?: string;
  validate?: (v: string) => string | null;
  options?: { label: string; value: string }[];
  multi?: boolean;
  optional?: boolean;
  multiline?: boolean;
};

const STEPS: Step[] = [
  {
    key: "name",
    prompt: "Bem-vindo. Qual seu nome completo?",
    validate: v => (v.trim().split(" ").length < 2 ? "Coloca nome e sobrenome." : null),
  },
  {
    key: "email",
    prompt: "Qual seu email, {name}?",
    validate: v => (/.+@.+\..+/.test(v) ? null : "Email inválido."),
  },
  {
    key: "city",
    prompt: "Em que cidade você quer operar? (formato: Cidade/UF)",
    hint: "Ex: Recife/PE, Curitiba/PR",
  },
  {
    key: "skills",
    prompt: "O que você sabe construir com IA? (selecione tudo que se aplica)",
    multi: true,
    options: [
      { label: "Agentes / LLM apps", value: "agentes" },
      { label: "Automações (n8n, Zapier, Make)", value: "automacoes" },
      { label: "Web (Next, React)", value: "web" },
      { label: "Backend / APIs", value: "backend" },
      { label: "Data / pipelines", value: "data" },
      { label: "Vendas B2B", value: "vendas" },
      { label: "Treinamento / facilitação", value: "treinamento" },
    ],
  },
  {
    key: "builtWhat",
    prompt: "Conta um projeto seu com IA do qual você se orgulha. O que era, pra quem, qual o resultado.",
    hint: "3–5 frases. Se tiver link de demo/código, cola.",
    multiline: true,
    validate: v => (v.length < 30 ? "Capricha — mínimo 30 caracteres." : null),
  },
  {
    key: "links",
    prompt: "Cola seus links: GitHub, LinkedIn, portfólio, Instagram, projetos no ar. Um por linha.",
    hint: "Tudo num campo só. Pode pular com '—' se não tiver nada público.",
    multiline: true,
    optional: true,
  },
  {
    key: "whyCity",
    prompt: "Por que faz sentido um builder CB na sua cidade? Que tipo de empresa por aí pediria isso amanhã?",
    multiline: true,
    validate: v => (v.length < 40 ? "Detalha mais um pouco." : null),
  },
  {
    key: "willingToInvest",
    prompt: "Você toparia investir pra abrir um escritório CB com exclusividade regional?",
    options: [
      { label: "Sim, tenho capital", value: "sim" },
      { label: "Talvez, depende do modelo", value: "talvez" },
      { label: "Não — quero operar como freelancer certificado", value: "nao" },
    ],
  },
  {
    key: "investAmount",
    prompt: "Faixa de investimento que você consegue mobilizar nos próximos 90 dias?",
    options: [
      { label: "Até R$ 15.000", value: "15000" },
      { label: "R$ 15k – R$ 50k", value: "30000" },
      { label: "R$ 50k – R$ 150k", value: "100000" },
      { label: "Mais de R$ 150k", value: "200000" },
    ],
    optional: true,
  },
];

type Msg = { from: "bot" | "me"; text: string };

function parseCity(raw: string): { city: string; state?: string } {
  const [a, b] = raw.split("/").map(s => s.trim());
  return { city: a || raw, state: b };
}

function buildPayload(answers: Record<string, string | string[]>, lastStep: number) {
  const cityRaw = String(answers.city || "");
  const { city, state } = parseCity(cityRaw);
  return {
    name: String(answers.name || ""),
    email: String(answers.email || ""),
    city,
    state,
    skills: Array.isArray(answers.skills) ? answers.skills : undefined,
    builtWhat: String(answers.builtWhat || ""),
    links: String(answers.links || ""),
    whyCity: String(answers.whyCity || ""),
    willingToInvest: answers.willingToInvest === "sim",
    investAmount: answers.investAmount ? Number(answers.investAmount) : undefined,
    lastStep,
  };
}

export default function ApplyPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [multi, setMulti] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ ok: boolean; id?: string; error?: string } | null>(null);
  const [savingHint, setSavingHint] = useState<string | null>(null);
  const draftIdRef = useRef<string | null>(null);
  const initRef = useRef(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    setMsgs([{ from: "bot", text: STEPS[0].prompt }]);
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, stepIdx]);

  function pushBot(text: string) { setMsgs(m => [...m, { from: "bot", text }]); }
  function pushMe(text: string) { setMsgs(m => [...m, { from: "me", text }]); }

  function fmtWith(prompt: string, ans: Record<string, string | string[]>) {
    return prompt.replace(/\{(\w+)\}/g, (_, k) => {
      const v = ans[k];
      if (Array.isArray(v)) return v.join(", ");
      if (typeof v === "string") return v.split(" ")[0] || v;
      return "";
    });
  }

  function nextIdxFor(currentIdx: number, ans: Record<string, string | string[]>): number {
    const next = currentIdx + 1;
    if (next >= STEPS.length) return next;
    const nextStep = STEPS[next];
    if (nextStep.key === "investAmount" && ans.willingToInvest !== "sim") {
      return STEPS.length;
    }
    return next;
  }

  async function saveIncremental(nextAnswers: Record<string, string | string[]>, lastStep: number, finalize = false) {
    if (!nextAnswers.name || !nextAnswers.email) return;
    setSavingHint(finalize ? "finalizando…" : "salvando…");
    try {
      const payload: any = {
        ...buildPayload(nextAnswers, lastStep),
        ...(draftIdRef.current ? { id: draftIdRef.current } : {}),
        ...(finalize ? { finalize: true } : {}),
      };
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erro");
      if (!draftIdRef.current && data.id) draftIdRef.current = data.id;
      setSavingHint("salvo");
      setTimeout(() => setSavingHint(null), 1200);
      return data;
    } catch (e: any) {
      setSavingHint("falhou");
      setTimeout(() => setSavingHint(null), 2000);
    }
  }

  function commit(value: string | string[]) {
    const step = STEPS[stepIdx];
    const display = Array.isArray(value)
      ? value.map(v => step.options?.find(o => o.value === v)?.label || v).join(", ")
      : value;
    pushMe(display || "—");

    const newAnswers = { ...answers, [step.key]: value };
    setAnswers(newAnswers);
    setInput("");
    setMulti([]);

    const next = nextIdxFor(stepIdx, newAnswers);
    saveIncremental(newAnswers, stepIdx + 1, next >= STEPS.length);

    if (next >= STEPS.length) {
      setSubmitting(true);
      setTimeout(() => {
        pushBot("✓ Aplicação enviada. A gente revisa em até 7 dias e te chama no email.");
        setDone({ ok: true, id: draftIdRef.current || undefined });
        setSubmitting(false);
      }, 600);
      return;
    }
    setStepIdx(next);
    setTimeout(() => pushBot(fmtWith(STEPS[next].prompt, newAnswers)), 350);
  }

  function handleSend() {
    const step = STEPS[stepIdx];
    if (step.options) {
      if (step.multi) {
        if (multi.length === 0 && !step.optional) return;
        commit(multi);
      }
      return;
    }
    const v = input.trim();
    if (!v && !step.optional) return;
    if (!v && step.optional) { commit(""); return; }
    if (step.validate) {
      const err = step.validate(v);
      if (err) { pushBot("→ " + err); return; }
    }
    commit(v);
  }

  const step = STEPS[stepIdx] || STEPS[STEPS.length - 1];
  const totalSteps = STEPS.length;
  const visibleStep = Math.min(stepIdx + 1, totalSteps);
  const progress = Math.round((stepIdx / totalSteps) * 100);

  return (
    <>
      <Nav />
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-12 md:py-16">
        <div className="mb-10">
          <div className="tag tag-accent mb-5">Aplicação · Builder Local</div>
          <h1 className="h-section">Aplicação rápida.<br />~5 minutos.</h1>

          <div className="mt-8 border border-[var(--line)] p-5 flex items-start gap-4 flex-wrap">
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] font-bold pt-0.5">
              Pré-requisito
            </div>
            <div className="flex-1 min-w-[260px] text-[14px] text-[var(--fg-soft)] leading-[1.55]">
              Esta aplicação é só pra builders <strong className="text-[var(--fg)]">já certificados</strong> pela Cultura Builder.
              Ainda não é?{" "}
              <a
                href="https://hub.culturabuilder.com"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent)] font-bold hover:underline"
              >
                Inscreva-se em hub.culturabuilder.com →
              </a>
            </div>
          </div>
        </div>

        <div className="border border-[var(--line)] mb-6">
          <div className="px-6 py-4 border-b border-[var(--line)] flex items-center justify-between mono text-[12px] uppercase tracking-[0.18em]">
            <span className="text-[var(--fg-mute)]">
              Passo {visibleStep} / {totalSteps}
              {savingHint && <span className="ml-3 text-[var(--accent)]">· {savingHint}</span>}
            </span>
            <span className="text-[var(--accent)] font-bold tnum">{done ? "100" : progress}%</span>
          </div>
          <div className="h-[2px] bg-[var(--line)]">
            <div className="h-full bg-[var(--accent)] transition-all duration-500" style={{ width: (done ? 100 : progress) + "%" }} />
          </div>
        </div>

        <div ref={scrollerRef} className="h-[480px] overflow-y-auto space-y-4 p-6 border border-[var(--line)] bg-[var(--surface)]">
          {msgs.map((m, i) => (
            <div key={i} className={"flex " + (m.from === "me" ? "justify-end" : "justify-start")}>
              <div
                className={
                  "max-w-[85%] px-5 py-3 text-[14px] leading-[1.55] whitespace-pre-wrap " +
                  (m.from === "me"
                    ? "bg-[var(--accent)] text-[var(--paper)] font-medium"
                    : "bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--line)]")
                }
              >
                {m.text}
              </div>
            </div>
          ))}
          {submitting && (
            <div className="mono text-[12px] uppercase tracking-[0.18em] text-[var(--fg-mute)]">processando…</div>
          )}
        </div>

        {!done && (
          <div className="mt-6">
            {step.hint && <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-mute)] mb-3">{step.hint}</div>}

            {step.options && !step.multi && (
              <div className="grid sm:grid-cols-2 gap-0 border border-[var(--line)]">
                {step.options.map((o, i) => (
                  <button
                    key={o.value}
                    onClick={() => commit(o.value)}
                    className={
                      "text-left px-5 py-4 hover:bg-[var(--accent)] hover:text-[var(--paper)] transition text-[14px] font-medium border-[var(--line)] " +
                      (i % 2 === 0 ? "sm:border-r " : "") +
                      (i < step.options!.length - 2 ? "border-b " : "") +
                      (i === step.options!.length - 2 && step.options!.length % 2 === 0 ? "border-b sm:border-b-0 " : "")
                    }
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}

            {step.options && step.multi && (
              <>
                <div className="grid sm:grid-cols-2 gap-0 border border-[var(--line)]">
                  {step.options.map((o, i) => {
                    const on = multi.includes(o.value);
                    return (
                      <button
                        key={o.value}
                        onClick={() => setMulti(m => (on ? m.filter(x => x !== o.value) : [...m, o.value]))}
                        className={
                          "text-left px-5 py-4 text-[14px] transition flex items-center gap-3 border-[var(--line)] " +
                          (on ? "bg-[var(--accent)] text-[var(--paper)] font-bold" : "hover:bg-[var(--surface)]") + " " +
                          (i % 2 === 0 ? "sm:border-r " : "") +
                          (i < step.options!.length - 2 ? "border-b " : "") +
                          (i === step.options!.length - 2 && step.options!.length % 2 === 0 ? "border-b sm:border-b-0 " : "")
                        }
                      >
                        <span className={"w-3 h-3 border " + (on ? "bg-[var(--paper)] border-[var(--paper)]" : "border-[var(--line-strong)]")} />
                        {o.label}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={handleSend}
                  disabled={multi.length === 0 && !step.optional}
                  className="mt-4 btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continuar <span className="cta-arrow">→</span>
                </button>
              </>
            )}

            {!step.options && !step.multiline && (
              <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-0 border border-[var(--line)]">
                <input
                  autoFocus
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={step.optional ? "Resposta (ou enter pra pular)" : "Sua resposta…"}
                  className="flex-1 px-5 py-4 bg-transparent outline-none text-[14px] placeholder:text-[var(--fg-faint)]"
                />
                <button type="submit" className="px-6 bg-[var(--accent)] text-[var(--paper)] font-bold hover:opacity-90 transition">→</button>
              </form>
            )}

            {!step.options && step.multiline && (
              <div className="border border-[var(--line)]">
                <textarea
                  autoFocus
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={step.optional ? "Resposta (ou pula deixando vazio)" : "Sua resposta…"}
                  rows={5}
                  className="w-full px-5 py-4 bg-transparent outline-none text-[14px] resize-y leading-[1.6] placeholder:text-[var(--fg-faint)]"
                />
                <div className="flex justify-end border-t border-[var(--line)]">
                  <button onClick={handleSend} className="px-6 py-3 bg-[var(--accent)] text-[var(--paper)] font-bold hover:opacity-90 transition mono text-[12px] uppercase tracking-[0.18em]">
                    Enviar →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {done?.ok && (
          <div className="mt-8 border border-[var(--accent)] bg-[var(--accent)]/5 p-8">
            <div className="tag tag-accent mb-4">Recebido</div>
            <div className="h-sub mb-3">Aplicação registrada.</div>
            {done.id && <div className="mono text-[12px] text-[var(--fg-mute)] mb-5">ID: {done.id}</div>}
            <p className="text-[15px] text-[var(--fg-soft)] leading-[1.6] mb-6">
              Enquanto a gente avalia, ajuda sua aplicação subir no ranking: contribui conteúdo (e ainda recebe).
            </p>
            <Link href="/contribuir" className="btn-primary group">
              Contribuir conteúdo (remunerado) <span className="cta-arrow">→</span>
            </Link>
          </div>
        )}

        {done && !done.ok && (
          <div className="mt-8 border border-[#ff6b3a] p-8">
            <div className="h-sub mb-4 text-[#ff6b3a]">Algo falhou.</div>
            <div className="text-[14px] text-[var(--fg-soft)] mb-5">{done.error}</div>
            <button onClick={() => location.reload()} className="btn-outline">Tentar de novo</button>
          </div>
        )}
      </div>
    </>
  );
}
