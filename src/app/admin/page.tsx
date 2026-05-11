"use client";

import { useEffect, useMemo, useState } from "react";
import Nav from "@/components/Nav";
import { brl } from "@/lib/utils";
import type { Application, Contribution } from "@/lib/storage";

type Tab = "applications" | "contributions";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("applications");
  const [apps, setApps] = useState<Application[]>([]);
  const [contribs, setContribs] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [investFilter, setInvestFilter] = useState<string>("");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin", { credentials: "include" });
      if (res.status === 401) {
        setError("Login necessário (basic auth). Recarrega e digita usuário/senha do .env.local.");
        return;
      }
      const data = await res.json();
      setApps(data.applications);
      setContribs(data.contributions);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  const filteredApps = useMemo(() => {
    return apps.filter(a => {
      const hay = `${a.name || ""} ${a.email || ""} ${a.city || ""} ${a.builtWhat || ""}`.toLowerCase();
      if (q && !hay.includes(q.toLowerCase())) return false;
      if (statusFilter && a.status !== statusFilter) return false;
      if (cityFilter && !(a.city || "").toLowerCase().includes(cityFilter.toLowerCase())) return false;
      if (investFilter === "sim" && !a.willingToInvest) return false;
      if (investFilter === "nao" && a.willingToInvest) return false;
      return true;
    });
  }, [apps, q, statusFilter, cityFilter, investFilter]);

  const filteredContribs = useMemo(() => {
    return contribs.filter(c => {
      if (q && !(`${c.builderName} ${c.email} ${c.title} ${c.body}`.toLowerCase().includes(q.toLowerCase()))) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      return true;
    });
  }, [contribs, q, statusFilter]);

  const cityCounts = useMemo(() => {
    const m = new Map<string, number>();
    apps.forEach(a => { if (a.city) m.set(a.city, (m.get(a.city) || 0) + 1); });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [apps]);

  const totalBudget = apps.reduce((sum, a) => sum + (a.investAmount || 0), 0);

  function exportCsv() {
    const rows = tab === "applications" ? filteredApps : filteredContribs;
    if (rows.length === 0) return;
    const keys = Object.keys(rows[0]).filter(k => typeof (rows[0] as any)[k] !== "object" || (rows[0] as any)[k] === null);
    const header = keys.join(",");
    const body = rows
      .map(r => keys.map(k => `"${String((r as any)[k] ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`).join(","))
      .join("\n");
    const blob = new Blob([header + "\n" + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  async function patchStatus(kind: "application" | "contribution", id: string, status: string) {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id, patch: { status } }),
    });
    load();
  }

  return (
    <>
      <Nav />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-10">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="tag tag-accent mb-3">Admin</div>
            <h1 className="h-section">Cultura Builder Hub.</h1>
            <p className="mono mt-3 text-[12px] uppercase tracking-[0.18em] text-[var(--fg-mute)]">
              {apps.length} aplicações · {contribs.length} contribuições · {brl(totalBudget)} declarado
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="btn-outline !py-3 !px-4 !text-[12px] uppercase tracking-[0.16em] mono">Atualizar</button>
            <button onClick={exportCsv} className="btn-primary !py-3 !px-4 !text-[12px] uppercase tracking-[0.16em] mono">CSV</button>
          </div>
        </div>

        {error && <div className="p-5 border border-[#ff6b3a] mb-8 text-[#ff6b3a] text-[14px]">{error}</div>}

        <div className="grid lg:grid-cols-[2fr_1fr] gap-0 border border-[var(--line)] mb-10">
          <div className="grid sm:grid-cols-3 lg:border-r border-[var(--line)]">
            <Stat label="Novas" value={apps.filter(a => a.status === "novo").length} />
            <Stat label="Aprovadas" value={apps.filter(a => a.status === "aprovado").length} accent />
            <Stat label="Conteúdo pendente" value={contribs.filter(c => c.status === "novo").length} />
          </div>
          <div className="p-6 lg:border-l-0 border-t lg:border-t-0 border-[var(--line)]">
            <div className="tag mb-4">Top cidades</div>
            <div className="space-y-2">
              {cityCounts.slice(0, 5).map(([c, n]) => (
                <div key={c} className="flex justify-between text-[14px] tnum">
                  <span className="text-[var(--fg-soft)]">{c}</span>
                  <span className="font-bold">{n}</span>
                </div>
              ))}
              {cityCounts.length === 0 && <div className="mono text-[11px] text-[var(--fg-mute)] uppercase tracking-[0.18em]">Sem aplicações</div>}
            </div>
          </div>
        </div>

        <div className="flex gap-0 border-b border-[var(--line)] mb-6">
          {(["applications", "contributions"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "mono px-6 py-4 text-[12px] uppercase tracking-[0.18em] font-bold border-b-2 -mb-px transition " +
                (tab === t ? "border-[var(--accent)] text-[var(--fg)]" : "border-transparent text-[var(--fg-mute)] hover:text-[var(--fg-soft)]")
              }
            >
              {t === "applications" ? `Aplicações · ${apps.length}` : `Contribuições · ${contribs.length}`}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border border-[var(--line)] p-2">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Buscar nome, email, cidade…"
            className="flex-1 min-w-[220px] px-3 py-2 bg-transparent outline-none text-[14px]"
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-[var(--surface)] border border-[var(--line)] text-[13px] mono uppercase tracking-[0.14em]">
            <option value="">Todos status</option>
            {tab === "applications" ? (
              <>
                <option value="draft">Draft (incompleto)</option>
                <option value="novo">Novo</option>
                <option value="em_revisao">Em revisão</option>
                <option value="aprovado">Aprovado</option>
                <option value="rejeitado">Rejeitado</option>
              </>
            ) : (
              <>
                <option value="novo">Novo</option>
                <option value="publicado">Publicado</option>
                <option value="rejeitado">Rejeitado</option>
              </>
            )}
          </select>
          {tab === "applications" && (
            <>
              <input
                value={cityFilter}
                onChange={e => setCityFilter(e.target.value)}
                placeholder="Cidade"
                className="px-3 py-2 bg-[var(--surface)] border border-[var(--line)] text-[13px] w-40"
              />
              <select value={investFilter} onChange={e => setInvestFilter(e.target.value)} className="px-3 py-2 bg-[var(--surface)] border border-[var(--line)] text-[13px] mono uppercase tracking-[0.14em]">
                <option value="">Investimento: todos</option>
                <option value="sim">Topa investir</option>
                <option value="nao">Não investe</option>
              </select>
            </>
          )}
        </div>

        {loading ? (
          <div className="mono text-center py-20 text-[var(--fg-mute)] uppercase tracking-[0.18em] text-[12px]">Carregando…</div>
        ) : tab === "applications" ? (
          <div className="border border-[var(--line)]">
            {filteredApps.length === 0 && (
              <div className="mono text-center py-20 text-[var(--fg-mute)] uppercase tracking-[0.18em] text-[12px]">Nenhuma aplicação encontrada</div>
            )}
            {filteredApps.map((a, i) => (
              <AppCard key={a.id} a={a} onStatus={s => patchStatus("application", a.id, s)} last={i === filteredApps.length - 1} />
            ))}
          </div>
        ) : (
          <div className="border border-[var(--line)]">
            {filteredContribs.length === 0 && (
              <div className="mono text-center py-20 text-[var(--fg-mute)] uppercase tracking-[0.18em] text-[12px]">Nenhuma contribuição encontrada</div>
            )}
            {filteredContribs.map((c, i) => (
              <ContribCard key={c.id} c={c} onStatus={s => patchStatus("contribution", c.id, s)} last={i === filteredContribs.length - 1} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="p-6 border-r last:border-r-0 border-[var(--line)]">
      <div className="tag mb-2">{label}</div>
      <div className={"text-[36px] font-bold tnum tracking-[-0.03em] leading-none " + (accent ? "text-[var(--accent)]" : "")}>{value}</div>
    </div>
  );
}

function AppCard({ a, onStatus, last }: { a: Application; onStatus: (s: string) => void; last: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"overflow-hidden " + (last ? "" : "border-b border-[var(--line)]")}>
      <button onClick={() => setOpen(o => !o)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--surface)] transition">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[16px] font-bold tracking-[-0.01em]">{a.name || <span className="text-[var(--fg-mute)] italic font-normal">(sem nome)</span>}</span>
            {a.city && <span className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-mute)]">{a.city}{a.state ? `/${a.state}` : ""}</span>}
            <StatusBadge status={a.status} />
            {a.status === "draft" && a.lastStep != null && (
              <span className="mono text-[10px] px-2 py-0.5 uppercase tracking-[0.18em] border border-[#FACC15]/40 text-[#FACC15]">
                Parou no passo {a.lastStep}
              </span>
            )}
            {a.willingToInvest && (
              <span className="mono text-[10px] px-2 py-0.5 uppercase tracking-[0.18em] bg-[var(--accent)] text-[var(--paper)] font-bold">
                Investe{a.investAmount ? ` · ${brl(a.investAmount)}` : ""}
              </span>
            )}
          </div>
          <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-mute)] mt-2 flex items-center gap-3 flex-wrap">
            {a.email && <span>{a.email}</span>}
            {(a.skills || []).slice(0, 4).map(s => (
              <span key={s} className="px-2 py-0.5 border border-[var(--line)]">{s}</span>
            ))}
            {(a.skills || []).length > 4 && <span>+{(a.skills || []).length - 4}</span>}
          </div>
        </div>
        <div className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-mute)] ml-4 tnum">
          {new Date(a.createdAt).toLocaleDateString("pt-BR")}
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-[var(--line)] pt-5 space-y-5 bg-[var(--surface)]">
          {a.builtWhat && <DetailBlock label="O que construiu">{a.builtWhat}</DetailBlock>}
          {a.whyCity && <DetailBlock label="Por que essa cidade">{a.whyCity}</DetailBlock>}
          {a.links && <DetailBlock label="Links">{a.links}</DetailBlock>}
          <div className="flex flex-wrap gap-4 text-[12px] mono uppercase tracking-[0.14em]">
            {a.phone && <span className="text-[var(--fg-soft)]">Wpp: {a.phone}</span>}
            {a.updatedAt && <span className="text-[var(--fg-soft)]">Atualizado {new Date(a.updatedAt).toLocaleString("pt-BR")}</span>}
          </div>
          <div className="flex gap-2 pt-2">
            {(["em_revisao", "aprovado", "rejeitado"] as const).map(s => (
              <button
                key={s}
                onClick={() => onStatus(s)}
                disabled={a.status === s}
                className={
                  "mono px-3 py-2 text-[11px] uppercase tracking-[0.18em] font-bold border transition disabled:opacity-50 " +
                  (s === "aprovado"
                    ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--paper)]"
                    : s === "rejeitado"
                      ? "border-[#ff6b3a]/40 text-[#ff6b3a] hover:bg-[#ff6b3a] hover:text-[var(--paper)]"
                      : "border-[var(--line-strong)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]")
                }
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ContribCard({ c, onStatus, last }: { c: Contribution; onStatus: (s: string) => void; last: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={last ? "" : "border-b border-[var(--line)]"}>
      <button onClick={() => setOpen(o => !o)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--surface)] transition">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={"mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 font-bold " + (c.category === "aula" ? "bg-[var(--accent)] text-[var(--paper)]" : "border border-[var(--line-strong)] text-[var(--fg)]")}>
              {c.category === "aula" ? "AULA" : "REDES"}
            </span>
            <span className="tag tag-accent">{c.type.replace(/_/g, " ")}</span>
            <span className="text-[16px] font-bold tracking-[-0.01em]">{c.title}</span>
            <StatusBadge status={c.status} />
          </div>
          <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-mute)] mt-2">
            {c.builderName} · {c.email} {c.igHandle && `· ${c.igHandle}`} {c.city && `· ${c.city}`}
          </div>
        </div>
        <div className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-mute)] ml-4 tnum">
          {new Date(c.createdAt).toLocaleDateString("pt-BR")}
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-[var(--line)] pt-5 bg-[var(--surface)]">
          <p className="text-[14px] text-[var(--fg-soft)] whitespace-pre-wrap leading-[1.65]">{c.body}</p>
          {c.links && <div className="mt-4 mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">Links: {c.links}</div>}
          {c.mediaUrl && (
            <a href={c.mediaUrl} target="_blank" rel="noreferrer" className="mt-2 mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">Mídia →</a>
          )}
          <div className="flex gap-2 pt-5">
            {(["publicado", "rejeitado"] as const).map(s => (
              <button
                key={s}
                onClick={() => onStatus(s)}
                disabled={c.status === s}
                className={
                  "mono px-3 py-2 text-[11px] uppercase tracking-[0.18em] font-bold border transition disabled:opacity-50 " +
                  (s === "publicado"
                    ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--paper)]"
                    : "border-[#ff6b3a]/40 text-[#ff6b3a] hover:bg-[#ff6b3a] hover:text-[var(--paper)]")
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="tag mb-2">{label}</div>
      <div className="text-[14px] text-[var(--fg)] whitespace-pre-wrap leading-[1.6]">{children}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "border border-[#FACC15]/30 text-[#FACC15] opacity-80",
    novo: "border border-[var(--line-strong)] text-[var(--fg)]",
    em_revisao: "border border-[#FACC15]/40 text-[#FACC15]",
    aprovado: "bg-[var(--accent)] text-[var(--paper)]",
    publicado: "bg-[var(--accent)] text-[var(--paper)]",
    rejeitado: "border border-[#ff6b3a]/40 text-[#ff6b3a]",
  };
  return (
    <span className={"mono text-[10px] px-2 py-0.5 uppercase tracking-[0.18em] font-bold " + (styles[status] || "border border-[var(--line)]")}>
      {status.replace("_", " ")}
    </span>
  );
}
