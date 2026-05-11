import { NextRequest, NextResponse } from "next/server";
import { Apps, Contribs } from "@/lib/storage";
import { requireBasicAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const fail = requireBasicAuth(req);
  if (fail) return fail;
  const [applications, contributions] = await Promise.all([Apps.list(), Contribs.list()]);
  return NextResponse.json({ applications, contributions });
}

export async function PATCH(req: NextRequest) {
  const fail = requireBasicAuth(req);
  if (fail) return fail;
  const body = await req.json();
  const { kind, id, patch } = body || {};
  if (!kind || !id || !patch) return NextResponse.json({ error: "kind/id/patch obrigatórios" }, { status: 400 });
  const updated = kind === "application"
    ? await Apps.update(id, patch)
    : kind === "contribution"
      ? await Contribs.update(id, patch)
      : null;
  if (!updated) return NextResponse.json({ error: "não encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
