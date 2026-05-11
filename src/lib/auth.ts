import { NextRequest, NextResponse } from "next/server";

export function requireBasicAuth(req: NextRequest): NextResponse | null {
  const expectedUser = process.env.ADMIN_USER || "bruno";
  const expectedPass = process.env.ADMIN_PASSWORD || "culturabuilder";
  const header = req.headers.get("authorization") || "";
  if (!header.startsWith("Basic ")) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="cb-admin"' },
    });
  }
  const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  const [u, p] = decoded.split(":");
  if (u !== expectedUser || p !== expectedPass) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="cb-admin"' },
    });
  }
  return null;
}
