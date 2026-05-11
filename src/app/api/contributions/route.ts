import { NextRequest, NextResponse } from "next/server";
import { Contribs, newId, type Contribution } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.builderName || !body?.email || !body?.title || !body?.body || !body?.type || !body?.category) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }
    const allowedCategories = ["aula", "social"];
    const allowedTypes = ["aula_curta", "aula_longa", "workshop_live", "tutorial", "noticia", "dica", "case", "video_curto", "carrossel", "outro"];
    if (!allowedCategories.includes(body.category) || !allowedTypes.includes(body.type)) {
      return NextResponse.json({ error: "Categoria ou tipo inválido" }, { status: 400 });
    }
    const c: Contribution = {
      id: newId(),
      createdAt: new Date().toISOString(),
      status: "novo",
      builderName: String(body.builderName).slice(0, 200),
      email: String(body.email).slice(0, 200),
      igHandle: body.igHandle ? String(body.igHandle).slice(0, 60) : undefined,
      city: body.city ? String(body.city).slice(0, 120) : undefined,
      category: body.category,
      type: body.type,
      title: String(body.title).slice(0, 200),
      body: String(body.body).slice(0, 8000),
      links: body.links ? String(body.links).slice(0, 1000) : undefined,
      mediaUrl: body.mediaUrl ? String(body.mediaUrl).slice(0, 500) : undefined,
    };
    await Contribs.add(c);
    return NextResponse.json({ ok: true, id: c.id });
  } catch (e) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
