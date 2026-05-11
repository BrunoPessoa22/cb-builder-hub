import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureFile(file: string) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const full = path.join(DATA_DIR, file);
  try {
    await fs.access(full);
  } catch {
    await fs.writeFile(full, "[]", "utf8");
  }
  return full;
}

async function readAll<T>(file: string): Promise<T[]> {
  const full = await ensureFile(file);
  const raw = await fs.readFile(full, "utf8");
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeAll<T>(file: string, rows: T[]) {
  const full = await ensureFile(file);
  await fs.writeFile(full, JSON.stringify(rows, null, 2), "utf8");
}

export type Application = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  status: "draft" | "novo" | "em_revisao" | "aprovado" | "rejeitado";
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  skills?: string[];
  builtWhat?: string;
  links?: string;
  whyCity?: string;
  willingToInvest?: boolean;
  investAmount?: number;
  notes?: string;
  lastStep?: number;
};

export type Contribution = {
  id: string;
  createdAt: string;
  status: "novo" | "publicado" | "rejeitado";
  builderName: string;
  email: string;
  igHandle?: string;
  city?: string;
  category: "aula" | "social";
  type: "aula_curta" | "aula_longa" | "workshop_live" | "tutorial" | "noticia" | "dica" | "case" | "video_curto" | "carrossel" | "outro";
  title: string;
  body: string;
  links?: string;
  mediaUrl?: string;
};

export const Apps = {
  list: () => readAll<Application>("applications.json"),
  add: async (a: Application) => {
    const rows = await readAll<Application>("applications.json");
    rows.unshift(a);
    await writeAll("applications.json", rows);
    return a;
  },
  update: async (id: string, patch: Partial<Application>) => {
    const rows = await readAll<Application>("applications.json");
    const i = rows.findIndex(r => r.id === id);
    if (i === -1) return null;
    rows[i] = { ...rows[i], ...patch };
    await writeAll("applications.json", rows);
    return rows[i];
  },
};

export const Contribs = {
  list: () => readAll<Contribution>("contributions.json"),
  add: async (c: Contribution) => {
    const rows = await readAll<Contribution>("contributions.json");
    rows.unshift(c);
    await writeAll("contributions.json", rows);
    return c;
  },
  update: async (id: string, patch: Partial<Contribution>) => {
    const rows = await readAll<Contribution>("contributions.json");
    const i = rows.findIndex(r => r.id === id);
    if (i === -1) return null;
    rows[i] = { ...rows[i], ...patch };
    await writeAll("contributions.json", rows);
    return rows[i];
  },
};

export function newId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
