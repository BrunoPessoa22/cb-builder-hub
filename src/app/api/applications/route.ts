import { NextRequest, NextResponse } from "next/server";
import { Apps, newId, type Application } from "@/lib/storage";

const ALLOWED_ORIGINS = new Set([
  "https://builder.culturabuilder.com",
  "https://builder.brunopessoa.com",
  "https://b2b.culturabuilder.com",
  "https://b2b.brunopessoa.com",
  "https://culturabuilder.com",
  "https://www.culturabuilder.com",
  "https://hub.culturabuilder.com",
  "http://localhost:3000",
  "http://localhost:3001",
]);

function corsHeaders(req: NextRequest): HeadersInit {
  const origin = req.headers.get("origin") || "";
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://builder.culturabuilder.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

function sanitize(body: any): Partial<Application> {
  const out: Partial<Application> = {};
  if (body.name != null) out.name = String(body.name).slice(0, 200);
  if (body.email != null) out.email = String(body.email).slice(0, 200);
  if (body.phone != null) out.phone = String(body.phone).slice(0, 60);
  if (body.city != null) out.city = String(body.city).slice(0, 120);
  if (body.state != null) out.state = String(body.state).slice(0, 60);
  if (Array.isArray(body.skills)) out.skills = body.skills.slice(0, 20).map(String);
  if (body.builtWhat != null) out.builtWhat = String(body.builtWhat).slice(0, 4000);
  if (body.links != null) out.links = String(body.links).slice(0, 2000);
  if (body.whyCity != null) out.whyCity = String(body.whyCity).slice(0, 4000);
  if (body.willingToInvest != null) out.willingToInvest = Boolean(body.willingToInvest);
  if (body.investAmount != null && typeof body.investAmount === "number") out.investAmount = body.investAmount;
  if (body.notes != null) out.notes = String(body.notes).slice(0, 4000);
  if (body.lastStep != null && typeof body.lastStep === "number") out.lastStep = body.lastStep;
  if (body.source != null) out.source = String(body.source).slice(0, 60);
  return out;
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req);
  try {
    const body = await req.json();
    const patch = sanitize(body);

    if (body.id) {
      const updated = await Apps.update(String(body.id), {
        ...patch,
        updatedAt: new Date().toISOString(),
        ...(body.finalize ? { status: "novo" as const } : {}),
      });
      if (!updated) return NextResponse.json({ error: "Aplicação não encontrada" }, { status: 404, headers });
      if (body.finalize && (!updated.name || !updated.email || !updated.city)) {
        return NextResponse.json({ error: "Faltam campos obrigatórios pra finalizar" }, { status: 400, headers });
      }
      return NextResponse.json({ ok: true, id: updated.id }, { headers });
    }

    const app: Application = {
      id: newId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "draft",
      ...patch,
    };
    await Apps.add(app);
    return NextResponse.json({ ok: true, id: app.id }, { headers });
  } catch (e) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500, headers });
  }
}
